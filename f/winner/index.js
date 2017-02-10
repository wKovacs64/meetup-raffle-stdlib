const axios = require('axios');
const meetupRandomizer = require('meetup-randomizer');
const oneLineTrim = require('common-tags/lib/oneLineTrim');

module.exports = (params, callback) => {
  const meetup = params.args.length
    ? params.args[0]
    : params.kwargs.meetup;
  const specificEventId = params.args.length > 1
    ? params.args[1]
    : params.kwargs.event;

  if (!meetup) {
    return callback(new Error('Meetup name is required.'));
  }

  const baseUrl = `https://api.meetup.com/${encodeURIComponent(meetup)}/events`;
  const eventEndpointParams = specificEventId
    ? `/${encodeURIComponent(specificEventId)}?only=id,visibility`
    : '?status=upcoming&only=id,visibility';
  const eventEndpoint = `${baseUrl}${eventEndpointParams}`;

  return axios.get(eventEndpoint, {
    validateStatus: status => (status >= 200 && status < 300) || status === 404,
  })
    .then((response) => {
      if (response.status !== 404) {
        return response;
      }
      throw new Error('Sorry, I couldn\'t find any information on that.');
    })
    .then((response) => {
      if (!specificEventId && response.data.length) {
        return response.data[0];
      } else if (specificEventId && response.data) {
        return response.data;
      }
      throw new Error('Sorry, I couldn\'t find any upcoming events.');
    })
    .then((event) => {
      if (event.visibility && event.visibility === 'public') {
        return event.id;
      }
      throw new Error('Sorry, their members list is private.');
    })
    .then((eventId) => {
      if (params.kwargs['meetup-api-key']) {
        const rsvps = oneLineTrim`
          ${baseUrl}/${eventId}/rsvps?only=group.urlname,member,response
          &key=${encodeURIComponent(params.kwargs['meetup-api-key'])}&sign=true
        `;
        return meetupRandomizer(rsvps, null, meetup, eventId);
      }
      return meetupRandomizer(null, null, meetup, eventId);
    })
    .then((winner) => {
      callback(null, { winner: winner.name });
    })
    .catch(callback);
};
