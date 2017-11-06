const {
  STATUS_204,
  STATUS_302,
  STATUS_404,
  STATUS_500,
} = require('../__mocks__/testData');
const validateStatus = require('../helpers/validateStatus');

describe('validateStatus', () => {
  it('should consider status 204 valid', () => {
    expect(validateStatus(STATUS_204)).toBe(true);
  });

  it('should consider status 404 valid', () => {
    expect(validateStatus(STATUS_404)).toBe(true);
  });

  it('should consider status 302 invalid', () => {
    expect(validateStatus(STATUS_302)).toBe(false);
  });

  it('should consider status 500 invalid', () => {
    expect(validateStatus(STATUS_500)).toBe(false);
  });
});
