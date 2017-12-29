const { EVENT_ID, MEETUP, WINNERS } = require('./testData');

module.exports = {
  run: (meetupName, eventId, winnersAmount) => {
    if (meetupName === MEETUP && eventId === EVENT_ID && winnersAmount === 1) {
      return Promise.resolve([WINNERS]);
    }
    return Promise.resolve([]);
  },
  setCustomApiUrl: jest.fn(),
};
