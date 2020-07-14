import React from 'react';
import I18n from 'i18n-js';
import { get, omit, find, isEmpty } from 'lodash';
import qs from 'qs';
import { message as Message, Tooltip, Progress } from 'antd';

import { ORDER_BY_QUERY, MAX_LIFETIME_LIMIT } from 'src/config/constants';

export const getErrorTab = err => {
  const tabMap = {
    endTime: 'metadata',
    lifetimeLimit: 'metadata',
    limitType: 'metadata',
    name: 'metadata',
    price: 'metadata',
    priceType: 'metadata',
    startTime: 'metadata',
    channelPriorityId: 'metadata',
    deliveryPaceType: 'metadata',
    frequencyCapDisplay: 'frequencyCap',
    frequencyCapTimes: 'frequencyCap',
    frequencyCapTimesType: 'frequencyCap',
    creativeName: 'creative',
    imageHeadline: 'creative',
    imageAdvertiser: 'creative',
    imageAd: 'creative',
    POIName: 'creative',
    POIType: 'creative',
    POIMessage: 'creative',
    POIImage: 'creative',
    POILatitude: 'creative',
    POILongitude: 'creative',
    rewardId: 'creative',
    videoHeadline: 'creative',
    videoAdvertiser: 'creative',
    videoURL: 'creative',
    videoMIMEType: 'creative',
    videoDescription: 'creative',
    foodBannerImage: 'creative',
    adName: 'creative',
    foodNativeMerchantChainId: 'creative',
    driverTitle: 'creative',
    driverCoverImage: 'creative',
    driverPayout: 'creative',
    driverDescription: 'creative',
    driverAdsType: 'creative',
    driverStartDate: 'creative',
    driverEndDate: 'creative',
    driverMileage: 'creative',
    driverContactEmail: 'creative',
    driverContactPhone: 'creative',
    driverAdvertiser: 'creative',
    datePartingStartTimeMoment: 'dayParting',
    datePartingEndTimeMoment: 'dayParting',
    checkboxGroup: 'dayParting',
    geo: 'geo',
    distance: 'geo',
    imageClickThroughURL: 'creative',
    videoClickThroughURL: 'creative',
    foodNativeClickThroughURL: 'creative',
    foodBannerClickThroughURL: 'creative',
    rewardedImageHeadline: 'creative',
    rewardedImageAdvertiser: 'creative',
    rewardedImageAd: 'creative',
    rewardedVideoHeadline: 'creative',
    rewardedVideoAdvertiser: 'creative',
    rewardedVideoURL: 'creative',
    rewardedVideoMIMEType: 'creative',
    rewardedVideoDescription: 'creative',
    mastheadBannerId: 'creative',
    mastheadClickThroughURLType: 'creative',
    mastheadClickThroughURL: 'creative',
    rewardedImageUserLimitDaily: 'creative',
    rewardedImageUserLimitTotal: 'creative',
    rewardedImageCampaignLimitDaily: 'creative',
    rewardedImageCampaignLimitTotal: 'creative',
    rewardedVideoUserLimitDaily: 'creative',
    rewardedVideoUserLimitTotal: 'creative',
    rewardedVideoCampaignLimitDaily: 'creative',
    rewardedVideoCampaignLimitTotal: 'creative',
    rewardedVideoPointRewardId: 'creative',
    rewardedImagePointRewardId: 'creative',
    rewardedImageLimit: 'creative',
    rewardedVideoLimit: 'creative',
    measurementJSURLs: 'viewabilityMeasurement',
    measurementVendorKeys: 'viewabilityMeasurement',
    measurementParams: 'viewabilityMeasurement',
    equalMeasurementLengths: 'viewabilityMeasurement',
  };

  if (err) {
    return {
      errorTab: tabMap[Object.keys(err)[0]],
    };
  }

  return false;
};

export const getQueryParams = () =>
  qs.parse(window.location.search, { ignoreQueryPrefix: true });

export const parseSortQueryParams = () => {
  const { s: sort } = getQueryParams();
  const [sortBy, sortType] = sort && sort.split('-');
  return { sortBy, sortType };
};

export const buildSortQuery = ({ sortBy, sortType }) => {
  if (sortBy && sortType)
    return {
      s: `${sortBy}-${sortType}`,
    };

  return {};
};

export const getSortTypeFromTableSort = tableSort => {
  if (tableSort === 'ascend') return 'asc';
  if (tableSort === 'descend') return 'desc';
  return '';
};

export const getTableSortFromSortType = sortType => {
  if (sortType === 'asc') return 'ascend';
  if (sortType === 'desc') return 'descend';
  return '';
};

export const filterOptionByInput = (inputValue, option) =>
  option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;

export const noop = () => {};

export const convertToTimestamp = momentValue =>
  momentValue && momentValue.valueOf();

export const mergeRealtimeCounts = ({ records, idName, realtimeCounts }) =>
  records &&
  records.map(record => {
    const realtimeCount = realtimeCounts.find(
      count => count.id === String(record[idName]),
    );

    return realtimeCount
      ? { ...record, ...realtimeCount.metricsValue }
      : record;
  });

export const renderNumberText = (number, precision = 0) =>
  number !== '' && !isNaN(number) && I18n.toNumber(number, { precision });

export const renderPercentageText = (number, precision = 2) =>
  number !== '' &&
  !isNaN(number) &&
  I18n.toPercentage(number * 100, { precision });

export const getCurrencyExample = currency => {
  switch (currency) {
    case 'MMK':
      return '(e.g. 1,000).';
    case 'VND':
    case 'IDR':
      return '(e.g. 1.000).';
    default:
      // for THB, USD, SGD, PHP, MYR
      return '(e.g. 1.05).';
  }
};

export const mapSortQueryToParams = (query, sortByQuery) => ({
  SortBy: sortByQuery[query && query.sortBy] || sortByQuery.none,
  OrderBy: ORDER_BY_QUERY[query && query.sortType] || ORDER_BY_QUERY.none,
});

export const renderErrorMessage = (error = {}, commonMsg = '') => {
  if (error.errorCode) {
    return Message.error(I18n.t(`messageErrorCode.${error.errorCode}`));
  }

  if (commonMsg) {
    return Message.error(I18n.t(commonMsg));
  }

  return false;
};

export const isAvailableAllTime = dayPartingData =>
  !Object.keys(omit(dayPartingData, ['startTime', 'endTime'])).some(
    key => dayPartingData[key],
  );

export const routeBackWithQueryParams = (
  routeMethod,
  { lastLocation, initialPathname, searchParams },
) => {
  if (lastLocation && lastLocation.pathname === window.location.pathname)
    routeMethod({
      pathname: initialPathname || '/',
      search: qs.stringify(searchParams),
    });

  const lastSearchQueryParams = qs.parse(lastLocation && lastLocation.search, {
    ignoreQueryPrefix: true,
  });
  routeMethod({
    ...lastLocation,
    pathname: (lastLocation && lastLocation.pathname) || initialPathname || '/',
    search: qs.stringify({
      ...lastSearchQueryParams,
      ...(searchParams || {}),
    }),
  });
};

export const handleCallApiInSequence = (
  apiParamsList,
  asyncApi,
  handleResponse,
) =>
  apiParamsList.reduce(
    (promise, apiParams) =>
      promise.then(() =>
        asyncApi(apiParams).then(res => handleResponse(res, apiParams)),
      ),
    Promise.resolve(),
  );

export const isAndOrOperand = op => ['AND', 'OR'].includes(op);

export const getFormFlightKeys = (formData = {}) =>
  Object.keys(formData).filter(
    key =>
      !['newName', 'duplicateCreativeOption'].includes(key) &&
      key.split('-')[1] === 'true',
  );

// Ref: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
export const encryptSHA256 = async string => {
  const msgUint8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

export const renderDeliveryStatus = status => {
  let value = '';
  let color = '';

  switch (status) {
    case 1:
      value = 'healthy';
      color = '#00b14f';
      break;
    case 2:
      value = 'borderline';
      color = '#f7c942';
      break;
    case 3:
      value = 'inDanger';
      color = '#ee6352';
      break;
    case 4:
      value = 'finished';
      color = '#00b14f';
      break;
    case 5:
      value = 'underdelivered';
      color = '#ee6352';
      break;
    case 0:
    default:
      value = 'pending';
      color = '#898d97';
  }

  return (
    <Tooltip title={I18n.t(`deliveryStatus.${value}`)}>
      <Progress strokeColor={color} percent={100} showInfo={false} />
    </Tooltip>
  );
};

export const maxLimit = (currency, fxRate) =>
  currency === 'USD'
    ? MAX_LIFETIME_LIMIT
    : Math.floor(fxRate ? fxRate * MAX_LIFETIME_LIMIT : MAX_LIFETIME_LIMIT);

export const maxPriceLimit = currency => {
  const maxPriceMap = {
    USD: 100,
    VND: 1000000,
    THB: 2500,
    SGD: 100,
    PHP: 4000,
    MYR: 300,
    MMK: 100000,
    IDR: 1000000,
  };

  return maxPriceMap[currency];
};

export const getVastThumbnailURL = (vastObj, defaultVastThumbnailURL) => {
  const creatives = get(vastObj, 'ads._contents[0].creatives._contents', []);
  const companionCreative = find(creatives, 'companionAds') || {};
  const companions = get(companionCreative, 'companionAds.companions', []);
  const staticCompanion = find(companions, {
    resource: { $type: 'StaticResource' },
  }) || { resource: { uri: defaultVastThumbnailURL } };

  return staticCompanion.resource.uri;
};

export const videoURLValidator = ({ isInvalidVideoURL, message }) => (
  _,
  value,
  handleError,
) => {
  if (!value) {
    return handleError();
  }

  if (isInvalidVideoURL) {
    return handleError(message);
  }

  return handleError();
};

// customize the get func of lodash to return default value if the obj path value is empty
export const customGet = (obj, path, defaultVal) => {
  if (isEmpty(obj[path])) {
    return defaultVal;
  }

  return get(obj, path, defaultVal);
};

export const formatStringToMultiLines = merchantIDs =>
  merchantIDs && merchantIDs.split(',').join('\n');

export const formatMultiLinesToString = merchantIDs =>
  merchantIDs &&
  merchantIDs
    .trim()
    .split('\n')
    .join(',');

export const parseMultilineStrToArray = multilineStr =>
  (multilineStr &&
    multilineStr
      .trim()
      .split('\n')
      .map(str => str.trim())) ||
  [];

export const convertArrayToMultilineStr = arr => arr && arr.join('\n');
