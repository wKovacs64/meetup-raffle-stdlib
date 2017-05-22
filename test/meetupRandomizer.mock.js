const {
  EVENT_ID,
  MEETUP,
  WINNER_NAME,
} = require('./testData');

module.exports = (rsvpsUrl, profileUrl, meetup, event) => {
  if (!rsvpsUrl && meetup === MEETUP && event === EVENT_ID) {
    return {
      name: WINNER_NAME,
    };
  }
  return {};
};
