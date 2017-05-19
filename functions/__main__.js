const winner = require('./winner/__main__');

/**
 * N.B. This duplicate method signature is required solely to satisfy FaaSlang's
 * static analysis at the time of this writing. Otherwise, this would simply be
 * a re-export of the desired default function.
 */
/**
 * Selects a raffle winner.
 *
 * @param {string} meetup the name of the Meetup group
 * @param {string} specificEventId an ID of a particular event
 * @param {string} meetupApiKey your private Meetup API key
 * @returns {object} an object with a winner property representing a raffle
 * winner
 */
module.exports = async (meetup, specificEventId = '', meetupApiKey = '') => (
  winner(meetup, specificEventId, meetupApiKey)
);
