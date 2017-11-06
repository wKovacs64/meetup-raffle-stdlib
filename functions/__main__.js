const axios = require('axios');
const oneLineTrim = require('common-tags/lib/oneLineTrim');
const meetupRandomizer = require('meetup-randomizer');
const {
  getIdFromEvent,
  getRsvpsUrl,
  parseEventsResponse,
  validateStatus,
} = require('../helpers');

/**
 * Selects some raffle winners.
 *
 * @param {string} meetup the name of the Meetup group
 * @param {string} specificEventId an ID of a particular event
 * @param {string} meetupApiKey your private Meetup API key
 * @param {number} count the number of winners to draw (default: 1)
 * @returns {object} an object containing a winners array of strings (the names
 * of the winners)
 */
module.exports = async (
  meetup,
  specificEventId = '',
  meetupApiKey = '',
  count = 1
) => {
  const baseUrl = `https://api.meetup.com/${encodeURIComponent(meetup)}/events`;
  const eventUrlSuffix = '?status=upcoming&only=id,visibility';
  const eventUrl = oneLineTrim`
    ${baseUrl}/${encodeURIComponent(specificEventId)}${eventUrlSuffix}
  `;

  return axios
    .get(eventUrl, { validateStatus })
    .then(parseEventsResponse)
    .then(getIdFromEvent)
    .then(eventId => {
      meetupRandomizer.setCustomApiUrl(
        getRsvpsUrl(baseUrl, eventId, meetupApiKey)
      );
      return meetupRandomizer.run(meetup, eventId, count);
    })
    .then(winners => {
      if (Array.isArray(winners) && winners.length) {
        return { winners: winners.map(winner => winner.name) };
      }
      throw new Error('Sorry, we received unexpected data for that request.');
    });
};
