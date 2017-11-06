const { BASE_URL, EVENT_ID, API_KEY } = require('../__mocks__/testData');
const getRsvpsUrl = require('../helpers/getRsvpsUrl');

describe('getRsvpsUrl', () => {
  it('should return a string given an API key', () => {
    expect(typeof getRsvpsUrl(BASE_URL, EVENT_ID, API_KEY)).toBe('string');
  });

  it('should return null if no API key is provided', () => {
    expect(getRsvpsUrl(BASE_URL, EVENT_ID)).toBeNull();
  });
});
