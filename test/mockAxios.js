const oneLineTrim = require('common-tags/lib/oneLineTrim');
const moxios = require('moxios');
const {
  STATUS_200,
  STATUS_204,
  STATUS_404,
  STATUS_500,
  EVENT_ID,
  EVENT_ID_NOT_FOUND,
  EVENT_ID_NOT_PUBLIC,
  EVENT_ID_UNEXPECTED,
  MEETUP,
  MEETUP_NOT_FOUND,
  MEETUP_NO_EVENTS,
} = require('./testData');

before(() => {
  moxios.install();
  // Meetup with a valid, public event
  moxios.stubRequest(
    new RegExp(`/${encodeURIComponent(MEETUP)}/events/\\?`),
    {
      status: STATUS_204,
      response: {
        id: EVENT_ID,
        visibility: 'public',
      },
    }
  );
  // Meetup not found
  moxios.stubRequest(
    new RegExp(`/${encodeURIComponent(MEETUP_NOT_FOUND)}/events/\\?`),
    {
      status: STATUS_404,
    }
  );
  // No upcoming events
  moxios.stubRequest(
    new RegExp(`/${encodeURIComponent(MEETUP_NO_EVENTS)}/events/\\?`),
    {
      status: STATUS_200,
      response: [],
    }
  );
  // Unexpected data
  moxios.stubRequest(
    new RegExp(oneLineTrim`
      /${encodeURIComponent(MEETUP)}/events
      /${encodeURIComponent(EVENT_ID_UNEXPECTED)}\\?
    `),
    {
      status: STATUS_204,
      response: {
        id: EVENT_ID_UNEXPECTED,
        visibility: 'public',
      },
    }
  );
  // Event not found
  moxios.stubRequest(
    new RegExp(oneLineTrim`
      /${encodeURIComponent(MEETUP)}/events
      /${encodeURIComponent(EVENT_ID_NOT_FOUND)}\\?
    `),
    {
      status: STATUS_404,
    }
  );
  // Event not public
  moxios.stubRequest(
    new RegExp(oneLineTrim`
      /${encodeURIComponent(MEETUP)}/events
      /${encodeURIComponent(EVENT_ID_NOT_PUBLIC)}\\?
    `),
    {
      status: STATUS_200,
      response: {
        id: EVENT_ID_NOT_PUBLIC,
        visibility: 'public_limited',
      },
    }
  );
  // All other requests
  moxios.stubRequest(
    /.*/,
    {
      status: STATUS_500,
      responseText: 'API request URL not mocked!',
    }
  );
});

after(() => {
  moxios.uninstall();
});
