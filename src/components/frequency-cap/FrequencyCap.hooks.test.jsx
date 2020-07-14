import { renderHook } from '@testing-library/react-hooks';
import { useValidateTime } from './FrequencyCap.hooks';

const form = {
  getFieldValue: jest.fn(),
  setFields: jest.fn(),
  validateFields: jest.fn(),
};

beforeEach(() => {
  form.getFieldValue.mockReset();
  form.setFields.mockReset();
  form.validateFields.mockReset();
});

describe(`useValidateTime`, () => {
  test(`when times is empty`, () => {
    form.setFields.mockImplementationOnce((_, cb) => cb());
    form.getFieldValue.mockReturnValueOnce('');
    const { result: { current: validateTime } } = renderHook(() =>
      useValidateTime({ form }),
    );
    validateTime();

    expect(form.setFields).toBeCalled();
    expect(form.getFieldValue).toBeCalled();
    expect(form.validateFields).not.toBeCalled();
  });

  test(`when times is number`, () => {
    form.setFields.mockImplementationOnce((_, cb) => cb());
    form.getFieldValue.mockReturnValueOnce(200);
    const { result: { current: validateTime } } = renderHook(() =>
      useValidateTime({ form }),
    );
    validateTime();

    expect(form.setFields).toBeCalled();
    expect(form.getFieldValue).toBeCalled();
    expect(form.validateFields).toBeCalled();
  });
});
