import moment from 'moment';
import qs from 'qs';
import I18n from 'i18n-js';
import { message as Message } from 'antd';

import { FLIGHT_SORT_BY_QUERY, MAX_LIFETIME_LIMIT } from 'src/config/constants';

import {
  getQueryParams,
  parseSortQueryParams,
  buildSortQuery,
  getSortTypeFromTableSort,
  getTableSortFromSortType,
  noop,
  filterOptionByInput,
  convertToTimestamp,
  mergeRealtimeCounts,
  renderNumberText,
  renderPercentageText,
  mapSortQueryToParams,
  renderErrorMessage,
  isAvailableAllTime,
  getErrorTab,
  routeBackWithQueryParams,
  handleCallApiInSequence,
  isAndOrOperand,
  getFormFlightKeys,
  encryptSHA256,
  renderDeliveryStatus,
  getCurrencyExample,
  maxLimit,
  getVastThumbnailURL,
  maxPriceLimit,
  videoURLValidator,
  customGet,
  formatStringToMultiLines,
  formatMultiLinesToString,
  parseMultilineStrToArray,
  convertArrayToMultilineStr,
} from '.';

jest.mock('antd', () => {
  const original = require.requireActual('antd');
  original.Modal.confirm = jest.fn();
  return original;
});

window.TextEncoder = function() {
  this.encode = () => new Uint8Array(6);
};
window.crypto = {
  subtle: {
    digest: () => Promise.resolve(new ArrayBuffer(32)),
  },
};

const messageErrorSpy = jest.spyOn(Message, 'error');
const qsParseSpy = jest.spyOn(qs, 'parse');

beforeEach(() => {
  qsParseSpy.mockReset();
});

describe('utils', () => {
  describe('getQueryParams', () => {
    qsParseSpy.mockReturnValueOnce({ s: 'name-asc' });
    expect(getQueryParams()).toEqual({ s: 'name-asc' });
  });

  describe('parseSortQueryParams', () => {
    qsParseSpy.mockReturnValueOnce({ s: 'name-asc' });
    expect(parseSortQueryParams()).toEqual({ sortBy: 'name', sortType: 'asc' });
  });

  describe('buildSortQuery', () => {
    expect(buildSortQuery({ sortBy: 'name', sortType: 'asc' })).toEqual({
      s: 'name-asc',
    });
    expect(buildSortQuery({ sortBy: '', sortType: '' })).toEqual({});
  });

  describe('getSortTypeFromTableSort', () => {
    expect(getSortTypeFromTableSort('ascend')).toBe('asc');
    expect(getSortTypeFromTableSort('descend')).toBe('desc');
    expect(getSortTypeFromTableSort('')).toBe('');
  });

  describe('getTableSortFromSortType', () => {
    expect(getTableSortFromSortType('asc')).toBe('ascend');
    expect(getTableSortFromSortType('desc')).toBe('descend');
    expect(getTableSortFromSortType('')).toBe('');
  });

  describe(`filterOptionByInput`, () => {
    test(`returns true if option.props.children contains inputValue`, () => {
      expect(
        filterOptionByInput('', { props: { children: 'aa' } }),
      ).toBeTruthy();

      expect(
        filterOptionByInput('a', { props: { children: 'aa' } }),
      ).toBeTruthy();
    });

    test(`returns false if option.props.children does not contain inputValue`, () => {
      expect(filterOptionByInput('b', { props: { children: '' } })).toBeFalsy();

      expect(
        filterOptionByInput('b', { props: { children: 'aa' } }),
      ).toBeFalsy();
    });
  });

  describe('noop', () => {
    test('invokes noop will not crash app', () => {
      noop();
    });
  });

  describe(`convertToTimestamp`, () => {
    test(`works correctly`, () => {
      expect(convertToTimestamp(undefined)).toBe(undefined);
      expect(convertToTimestamp(moment('2000-01-01'))).toEqual(
        expect.any(Number),
      );
    });
  });

  describe(`mergeRealtimeCounts`, () => {
    test(`works correctly`, () => {
      const records = [
        { id: '1', name: 'record1' },
        { id: '2', name: 'record1' },
      ];
      const realtimeCounts = [
        {
          id: '1',
          metricsValue: { impressions: 1000, clicks: 100, conversions: 10 },
        },
        {
          id: '3',
          metricsValue: { impressions: 2000, clicks: 200, conversions: 20 },
        },
      ];

      expect(
        mergeRealtimeCounts({ records, idName: 'id', realtimeCounts }),
      ).toMatchObject([
        {
          id: '1',
          name: 'record1',
          impressions: 1000,
          clicks: 100,
          conversions: 10,
        },
        { id: '2', name: 'record1' },
      ]);
    });
  });

  describe(`renderNumberText`, () => {
    test(`works correctly`, () => {
      expect([
        renderNumberText(''),
        renderNumberText('a'),
        renderNumberText(0),
        renderNumberText('1'),
        renderNumberText(0.111, 2),
        renderNumberText('0.05633', 4),
      ]).toEqual([false, false, '0', '1', '0.11', '0.0563']);
    });
  });

  describe(`renderPercentageText`, () => {
    test(`works correctly`, () => {
      expect([
        renderPercentageText(''),
        renderPercentageText('a'),
        renderPercentageText(0),
        renderPercentageText('1'),
        renderPercentageText(0.111, 0),
        renderPercentageText('0.05633', 4),
      ]).toEqual([false, false, '0.00%', '100.00%', '11%', '5.6330%']);
    });
  });

  describe('mapSortQueryToParams', () => {
    test('map correctly', () => {
      expect(mapSortQueryToParams({}, FLIGHT_SORT_BY_QUERY)).toMatchSnapshot();
      expect(
        mapSortQueryToParams(
          { sortBy: 'name', orderBy: 'asc' },
          FLIGHT_SORT_BY_QUERY,
        ),
      ).toMatchSnapshot();
    });
  });
});

describe('renderErrorMessage', () => {
  beforeEach(() => {
    messageErrorSpy.mockReset();
  });
  const errorWithErrorCode = {
    errorCode: 'E0002',
  };

  const error = 'error';

  test('return specific error', () => {
    renderErrorMessage(errorWithErrorCode, '');
    expect(messageErrorSpy).toBeCalledWith(I18n.t('messageErrorCode.E0002'));
  });

  test('return common error', () => {
    renderErrorMessage(error, 'messages.wrongStringFormat');
    expect(messageErrorSpy).toBeCalledWith(
      I18n.t('messages.wrongStringFormat'),
    );
  });

  test('return false', () => {
    renderErrorMessage();
    expect(renderErrorMessage(error)).toBe(false);
  });
});

describe('isAvailableAllTime', () => {
  test('works correctly', () => {
    const dayPartingData = {
      endTime: '',
      isFriday: false,
      isMonday: false,
      isSaturday: false,
      isSunday: false,
      isThursday: false,
      isTuesday: false,
      isWednesday: false,
      startTime: '',
    };

    expect(isAvailableAllTime(dayPartingData)).toBe(true);
    expect(isAvailableAllTime({ ...dayPartingData, isSaturday: true })).toBe(
      false,
    );
  });

  describe('getErrorTab', () => {
    test('should return error tab', () => {
      const errors = {
        creativeName: 'creativeName',
        imageAd: 'imageAd',
      };
      const result = { errorTab: 'creative' };

      expect(getErrorTab(errors)).toEqual(result);
    });

    test('should return empty', () => {
      expect(getErrorTab()).toEqual(false);
    });
  });
});

describe('routeBackWithQueryParams', () => {
  test('works correctly with last location is current location', () => {
    const historyReplace = jest.fn();
    routeBackWithQueryParams(historyReplace, {
      lastLocation: { pathname: window.location.pathname },
      initialPathname: '',
      searchParams: null,
    });
    expect(historyReplace.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  Object {
    "pathname": "/",
    "search": "",
  },
]
`);
  });

  test('works correctly with no history', () => {
    const historyReplace = jest.fn();
    routeBackWithQueryParams(historyReplace, {
      lastLocation: null,
      initialPathname: '',
      searchParams: null,
    });

    expect(historyReplace.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  Object {
    "pathname": "/",
    "search": "",
  },
]
`);
  });

  test('works correctly with history', () => {
    const historyReplace = jest.fn();
    qsParseSpy.mockReturnValueOnce({ page: 2, pageSize: 20, keyword: 'test' });
    routeBackWithQueryParams(historyReplace, {
      lastLocation: {
        hash: '#campaigns',
        search: '?page=2&pageSize=20&keyword=test',
      },
      initialPathname: '/',
      searchParams: { page: 1 },
    });

    expect(historyReplace.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  Object {
    "hash": "#campaigns",
    "pathname": "/",
    "search": "page=1&pageSize=20&keyword=test",
  },
]
`);
  });
});

describe('handleCallApiInSequence', () => {
  const asyncThingsToDo = [
    {
      test: '1',
    },
  ];
  const asyncApi = jest.fn().mockReturnValue(new Promise(res => res()));

  const handleResponse = noop;

  test('works correctly', async () => {
    await handleCallApiInSequence(asyncThingsToDo, asyncApi, handleResponse);
    expect(asyncApi).toBeCalled();
  });
});

describe('isAndOrOperand', () => {
  test('should return true', () => {
    expect(isAndOrOperand('OR').toBeTruthy);
    expect(isAndOrOperand('AND').toBeTruthy);
  });

  test('should return false', () => {
    expect(isAndOrOperand('CONTAINS').toBeFalsy);
    expect(isAndOrOperand('NOT').toBeFalsy);
    expect(isAndOrOperand('and').toBeFalsy);
    expect(isAndOrOperand('Or').toBeFalsy);
  });
});

describe('getFormFlightKeys', () => {
  const formData = {
    newName: 'Copy of Campaign Test',
    duplicateCreativeOption: 'Duplicate',
    '01-false': 'Flight 01',
    '02-true': 'Flight 02',
    '03-true': 'Flight 03',
    '04-false': 'Flight 04',
  };

  test('should return correct keys', () => {
    expect(getFormFlightKeys(formData)).toEqual(['02-true', '03-true']);
  });
  test('should return [] for empty formData', () => {
    expect(getFormFlightKeys()).toEqual([]);
  });
});

describe('encryptSHA256', () => {
  test('hash should match snapshot', async done => {
    const hash = await encryptSHA256('123');
    expect(hash).toMatchInlineSnapshot(
      `"0000000000000000000000000000000000000000000000000000000000000000"`,
    );
    done();
  });
});

describe('renderDeliveryStatus', () => {
  test('render Delivery Status 0', () => {
    expect(renderDeliveryStatus(0)).toMatchSnapshot();
  });
  test('render Delivery Status 1', () => {
    expect(renderDeliveryStatus(1)).toMatchSnapshot();
  });
  test('render Delivery Status 2', () => {
    expect(renderDeliveryStatus(2)).toMatchSnapshot();
  });
  test('render Delivery Status 3', () => {
    expect(renderDeliveryStatus(3)).toMatchSnapshot();
  });
  test('render Delivery Status 4', () => {
    expect(renderDeliveryStatus(4)).toMatchSnapshot();
  });
  test('render Delivery Status 5', () => {
    expect(renderDeliveryStatus(5)).toMatchSnapshot();
  });
  test('render Delivery Status 6', () => {
    expect(renderDeliveryStatus(6)).toMatchSnapshot();
  });
});

describe('getPriceExample', () => {
  test('works without crashing', () => {
    expect([
      getCurrencyExample('PHP'),
      getCurrencyExample('USD'),
      getCurrencyExample('MYR'),
      getCurrencyExample('PHP'),
      getCurrencyExample('SGD'),
      getCurrencyExample('THB'),
      getCurrencyExample('MMK'),
      getCurrencyExample('VND'),
      getCurrencyExample('IDR'),
    ]).toEqual([
      '(e.g. 1.05).',
      '(e.g. 1.05).',
      '(e.g. 1.05).',
      '(e.g. 1.05).',
      '(e.g. 1.05).',
      '(e.g. 1.05).',
      '(e.g. 1,000).',
      '(e.g. 1.000).',
      '(e.g. 1.000).',
    ]);
  });
});

describe('maxLimit', () => {
  test('should return to max limit', () => {
    expect(maxLimit('USD', 20000)).toBe(MAX_LIFETIME_LIMIT);
  });

  test('should return to max limit when currency is not USD', () => {
    expect(maxLimit('SGD')).toBe(MAX_LIFETIME_LIMIT);
  });

  test('should return to correct result', () => {
    expect(maxLimit('SGD', 2000)).toBe(MAX_LIFETIME_LIMIT * 2000);
  });
});

describe('getVastThumbnailURL', () => {
  test('should return defaultVastThumbnailURL', () => {
    const vastObj = {};
    const defaultVastThumbnailURL = 'https://www.example.com/test.png';

    expect(getVastThumbnailURL(vastObj, defaultVastThumbnailURL)).toBe(
      defaultVastThumbnailURL,
    );
  });
});

describe('maxPriceLimit', () => {
  test('should return to max price limit', () => {
    expect(maxPriceLimit('USD')).toBe(100);
  });

  test('should return to max limit when currency is not USD', () => {
    expect(maxPriceLimit('THB')).toBe(2500);
  });
});

describe('videoURLValidator', () => {
  const rule = null;
  const message = 'error';
  const validator1 = videoURLValidator({ isInvalidVideoURL: true, message });
  const validator2 = videoURLValidator({ isInvalidVideoURL: true, message });
  const validator3 = videoURLValidator({ isInvalidVideoURL: false, message });

  test(`return when value = undefined`, () => {
    const handleError = jest.fn();
    validator1(rule, undefined, handleError);

    expect(handleError).toBeCalledWith();
  });

  test(`return error message`, () => {
    const handleError = jest.fn();
    validator2(rule, 'something', handleError);

    expect(handleError).toBeCalledWith(message);
  });

  test(`just return errors`, () => {
    const handleError = jest.fn();
    validator3(rule, 'something', handleError);

    expect(handleError).toBeCalledWith();
  });
});

describe('customGet', () => {
  test('should return default value when path value is empty', () => {
    const obj = { test: [] };
    const path = 'test';
    const defaultVal = 'testDefault';
    expect(customGet(obj, path, defaultVal)).toEqual(defaultVal);
  });

  test('should return normal value when path is not empty', () => {
    const obj = { test: ['test'] };
    const path = 'test';
    const defaultVal = 'testDefault';
    expect(customGet(obj, path, defaultVal)).toEqual(obj[path]);
  });
});

describe('formatStringToMultiLines and formatMultiLinesToString', () => {
  test('works correctly', () => {
    expect(formatStringToMultiLines('1,2,3')).toBe('1\n2\n3');

    expect(formatMultiLinesToString('1\n2\n3')).toBe('1,2,3');
  });
});

describe('parseMultilineStrToArray', () => {
  test('"" returns []', () => {
    expect(parseMultilineStrToArray('')).toEqual([]);
  });
  test('returns ["a", "b"]', () => {
    expect(parseMultilineStrToArray(' a   \n b ')).toEqual(['a', 'b']);
  });
});

describe('convertArrayToMultilineStr', () => {
  test('["a", "b"] returns "a\nb"', () => {
    expect(convertArrayToMultilineStr(['a', 'b'])).toEqual('a\nb');
  });
});
