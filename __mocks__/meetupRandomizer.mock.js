const { EVENT_ID, MEETUP, WINNER_NAME } = require('./testData');

module.exports = {
  run: (meetupName, eventId, winnersAmount) => {
    if (meetupName === MEETUP && eventId === EVENT_ID && winnersAmount === 1) {
      return Promise.resolve([
        {
          name: WINNER_NAME,
        },
      ]);
    }
    return Promise.resolve([]);
  },
  setCustomApiUrl: jest.fn(),
};
