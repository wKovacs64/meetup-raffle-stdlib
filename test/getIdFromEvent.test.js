const { EVENT_LTD, EVENT_PUB } = require('../__mocks__/testData');
const getIdFromEvent = require('../helpers/getIdFromEvent');

describe('getIdFromEvent', () => {
  it('should return the ID from a publicly visible event', () => {
    expect(getIdFromEvent(EVENT_PUB)).toBe(EVENT_PUB.id);
  });

  it('should throw on non-public events', () => {
    expect(() => {
      getIdFromEvent(EVENT_LTD);
    }).toThrowError(Error);
  });
});
