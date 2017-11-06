const {
  RES_404,
  RES_MULTI,
  RES_MULTI_EMPTY,
  RES_SINGLE,
} = require('../__mocks__/testData');
const parseEventsResponse = require('../helpers/parseEventsResponse');

describe('parseEventsResponse', () => {
  it('should throw on 404 status', () => {
    expect(() => {
      parseEventsResponse(RES_404);
    }).toThrowError(Error);
  });

  it('should return the first of multiple events', () => {
    expect(parseEventsResponse(RES_MULTI)).toEqual(RES_MULTI.data[0]);
  });

  it('should return the event data when parsing a single event', () => {
    expect(parseEventsResponse(RES_SINGLE)).toEqual(RES_SINGLE.data);
  });

  it('should throw on an empty array of events', () => {
    expect(() => {
      parseEventsResponse(RES_MULTI_EMPTY);
    }).toThrowError(Error);
  });
});
