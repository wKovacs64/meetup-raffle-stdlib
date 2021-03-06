const {
  EVENT_ID_NOT_FOUND,
  EVENT_ID_NOT_PUBLIC,
  EVENT_ID_UNEXPECTED,
  MEETUP,
  MEETUP_NO_EVENTS,
  MEETUP_NOT_FOUND,
} = require('../__mocks__/testData');
const winner = require('../functions/__main__');

jest.mock('meetup-randomizer', () =>
  // eslint-disable-next-line global-require
  require('../__mocks__/meetupRandomizer.mock')
);

describe('winner', () => {
  it('should reject if Meetup not found', () =>
    expect(winner(MEETUP_NOT_FOUND)).rejects.toThrowErrorMatchingSnapshot());

  it('should reject if no upcoming Events found', () =>
    expect(winner(MEETUP_NO_EVENTS)).rejects.toThrowErrorMatchingSnapshot());

  it('should reject if Event not found', () =>
    expect(
      winner(MEETUP, EVENT_ID_NOT_FOUND)
    ).rejects.toThrowErrorMatchingSnapshot());

  it('should reject if Event not public', () =>
    expect(
      winner(MEETUP, EVENT_ID_NOT_PUBLIC)
    ).rejects.toThrowErrorMatchingSnapshot());

  it('should reject on unexpected data', () =>
    expect(
      winner(MEETUP, EVENT_ID_UNEXPECTED)
    ).rejects.toThrowErrorMatchingSnapshot());

  it('should resolve with a winner for a valid Meetup Event', () =>
    expect(winner(MEETUP)).resolves.toMatchSnapshot());
});
