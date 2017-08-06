const axios = require('axios');
const oneLineTrim = require('common-tags/lib/oneLineTrim');
// Using 'let' here to accommodate rewire in tests
// eslint-disable-next-line prefer-const
let meetupRandomizer = require('meetup-randomizer');

/**
 * Determines if a given HTTP status code should be considered a success (i.e.,
 * not an error).
 *
 * @param {number} status an HTTP status code
 * @returns {boolean} boolean value of whether or not the given HTTP status code
 * should be considered a success (non-error)
 */
const validateStatus = status => (
  (status >= 200 && status < 300) || status === 404
);

/**
 * Extracts an event object from a Meetup API "events" query response.
 *
 * @param {Object} response an Axios response object
 * @returns {Object} an event object
 * @throws {Error} proper event data is expected in the given response
 * @see https://github.com/mzabriskie/axios#response-schema
 * @see https://www.meetup.com/meetup_api/docs/:urlname/events/:id/#get
 */
const parseEventsResponse = (response) => {
  // This case covers invalid Meetup group names as well as invalid event IDs.
  if (response.status === 404) {
    throw new Error('Sorry, I couldn\'t find any information on that.');
  }

  if (response.data.length) {
    return response.data[0];
  } else if (response.data && !Array.isArray(response.data)) {
    return response.data;
  }

  throw new Error('Sorry, I couldn\'t find any upcoming events.');
};

/**
 * Extracts the event ID from the given Meetup API "event" object.
 *
 * @param {Object} event an object representing a Meetup API "event"
 * @returns {string} the event ID
 * @throws {Error} event visibility must be "public"
 * @see https://www.meetup.com/meetup_api/docs/:urlname/events/:id/#get
 */
const getIdFromEvent = (event) => {
  if (event.visibility && event.visibility === 'public') {
    return event.id;
  }
  throw new Error('Sorry, their members list is private.');
};

/**
 * Crafts a custom URL for the Meetup API "rsvps" endpoint if an API key is
 * provided.
 *
 * @param {string} baseUrl the base API URL for a particular Meetup group
 * @param {string} eventId the event ID
 * @param {string} apiKey a Meetup API key
 * @returns {string|null} a custom "rsvps" API endpoint URL, or null if no
 * custom URL is necessary
 */
const getRsvpsUrl = (baseUrl, eventId, apiKey) => (
  apiKey
    ? oneLineTrim`
        ${baseUrl}/${eventId}/rsvps?only=group.urlname,member,response
        &key=${encodeURIComponent(apiKey)}&sign=true
      `
    : null
);

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
    .then((eventId) => {
      meetupRandomizer.setCustomApiUrl(
        getRsvpsUrl(baseUrl, eventId, meetupApiKey)
      );
      return meetupRandomizer.run(meetup, eventId, count);
    })
    .then((winners) => {
      if (Array.isArray(winners) && winners.length) {
        return { winners: winners.map(winner => winner.name) };
      }
      throw new Error('Sorry, we received unexpected data for that request.');
    });
};
