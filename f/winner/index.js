const axios = require('axios');
const meetupRandomizer = require('meetup-randomizer');
const oneLineTrim = require('common-tags/lib/oneLineTrim');

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
 * Constructs an options object containing the results of processing the
 * provided parameters.
 *
 * @param {Object} params a StdLib params object
 * @returns {Object} an object containing a processed version of the provided
 * StdLib params
 */
const optsFromParams = params => (
  {
    meetup: params.args.length
      ? params.args[0]
      : params.kwargs.meetup,
    specificEventId: params.args.length > 1
      ? params.args[1]
      : params.kwargs.event || '',
  }
);

module.exports = (params, callback) => {
  const { meetup, specificEventId } = optsFromParams(params);

  if (!meetup) {
    return callback(new Error('Meetup name is required.'));
  }

  const baseUrl = `https://api.meetup.com/${encodeURIComponent(meetup)}/events`;
  const eventUrlSuffix = '?status=upcoming&only=id,visibility';
  const eventUrl = oneLineTrim`
    ${baseUrl}/${encodeURIComponent(specificEventId)}${eventUrlSuffix}
  `;

  return axios
    .get(eventUrl, { validateStatus })
    .then(parseEventsResponse)
    .then(getIdFromEvent)
    .then(eventId => meetupRandomizer(
      getRsvpsUrl(baseUrl, eventId, params.kwargs['meetup-api-key']),
      null,
      meetup,
      eventId // eslint-disable-line comma-dangle
    ))
    .then(winner => callback(null, { winner: winner.name }))
    .catch(callback);
};
