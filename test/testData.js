const STATUS_200 = 200;
const STATUS_204 = 204;
const STATUS_302 = 302;
const STATUS_404 = 404;
const STATUS_500 = 500;
const EVENT_LTD = {
  id: 'bar456',
  visibility: 'public_limited',
};
const EVENT_PUB = {
  id: 'foo123',
  visibility: 'public',
};
const RES_404 = {
  status: STATUS_404,
};
const RES_MULTI = {
  data: [
    {
      foo: 42,
    },
    {
      bar: 24,
    },
  ],
};
const RES_MULTI_EMPTY = { data: [] };
const RES_SINGLE = {
  data: EVENT_PUB,
};
const BASE_URL = 'https://...';
const EVENT_ID = 'foo123';
const EVENT_ID_NOT_FOUND = 'baz789';
const EVENT_ID_NOT_PUBLIC = 'qux012';
const API_KEY = 'bar456';
const MEETUP = 'foo';
const MEETUP_NOT_FOUND = 'bar';
const MEETUP_NO_EVENTS = 'baz';
const PARAMS_POS = {
  args: [
    MEETUP,
    EVENT_ID,
  ],
  kwargs: {},
};
const PARAMS_POS_NO_EVENT = {
  args: [
    MEETUP,
  ],
  kwargs: {},
};
const PARAMS_KWARGS = {
  args: [],
  kwargs: {
    meetup: MEETUP,
    event: EVENT_ID,
  },
};
const PARAMS_KWARGS_NO_EVENT = {
  args: [],
  kwargs: {
    meetup: MEETUP,
  },
};
const PARAMS_NONE = {
  args: [],
  kwargs: {},
};
const PARAMS_MEETUP_NOT_FOUND = {
  args: [],
  kwargs: {
    meetup: MEETUP_NOT_FOUND,
  },
};
const PARAMS_MEETUP_NO_EVENTS = {
  args: [],
  kwargs: {
    meetup: MEETUP_NO_EVENTS,
  },
};
const PARAMS_EVENT_NOT_FOUND = {
  args: [],
  kwargs: {
    meetup: MEETUP,
    event: EVENT_ID_NOT_FOUND,
  },
};
const PARAMS_EVENT_NOT_PUBLIC = {
  args: [],
  kwargs: {
    meetup: MEETUP,
    event: EVENT_ID_NOT_PUBLIC,
  },
};
const WINNER_NAME = 'Tiny Rick';

module.exports = {
  STATUS_200,
  STATUS_204,
  STATUS_302,
  STATUS_404,
  STATUS_500,
  EVENT_LTD,
  EVENT_PUB,
  RES_404,
  RES_MULTI,
  RES_MULTI_EMPTY,
  RES_SINGLE,
  BASE_URL,
  EVENT_ID,
  EVENT_ID_NOT_FOUND,
  EVENT_ID_NOT_PUBLIC,
  API_KEY,
  MEETUP,
  MEETUP_NOT_FOUND,
  MEETUP_NO_EVENTS,
  PARAMS_POS,
  PARAMS_POS_NO_EVENT,
  PARAMS_KWARGS,
  PARAMS_KWARGS_NO_EVENT,
  PARAMS_NONE,
  PARAMS_MEETUP_NOT_FOUND,
  PARAMS_MEETUP_NO_EVENTS,
  PARAMS_EVENT_NOT_FOUND,
  PARAMS_EVENT_NOT_PUBLIC,
  WINNER_NAME,
};
