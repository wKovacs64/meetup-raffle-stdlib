const { expect } = require('chai');
const rewire = require('rewire');
const {
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
  API_KEY,
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
} = require('../testData');
const meetupRandomizerMock = require('./meetupRandomizer.mock.js');
require('./mockAxios');

const winner = rewire('../../f/winner');

describe('index.js', () => {
  before(() => {
    winner.__set__('meetupRandomizer', meetupRandomizerMock);
  });

  describe('validateStatus', () => {
    const validateStatus = winner.__get__('validateStatus');
    it('should consider status 204 valid', () => {
      expect(validateStatus(STATUS_204)).to.be.true;
    });

    it('should consider status 404 valid', () => {
      expect(validateStatus(STATUS_404)).to.be.true;
    });

    it('should consider status 302 invalid', () => {
      expect(validateStatus(STATUS_302)).to.be.false;
    });

    it('should consider status 500 invalid', () => {
      expect(validateStatus(STATUS_500)).to.be.false;
    });
  });

  describe('parseEventsResponse', () => {
    const parseEventsResponse = winner.__get__('parseEventsResponse');

    it('should throw on 404 status', () => {
      expect(() => {
        parseEventsResponse(RES_404);
      }).to.throw(Error);
    });

    it('should return the first of multiple events', () => {
      expect(parseEventsResponse(RES_MULTI)).to.eql(RES_MULTI.data[0]);
    });

    it('should return the event data when parsing a single event', () => {
      expect(parseEventsResponse(RES_SINGLE)).to.eql(RES_SINGLE.data);
    });

    it('should throw on an empty array of events', () => {
      expect(() => {
        parseEventsResponse(RES_MULTI_EMPTY);
      }).to.throw(Error);
    });
  });

  describe('getIdFromEvent', () => {
    const getIdFromEvent = winner.__get__('getIdFromEvent');

    it('should return the ID from a publicly visible event', () => {
      expect(getIdFromEvent(EVENT_PUB)).to.equal(EVENT_PUB.id);
    });

    it('should throw on non-public events', () => {
      expect(() => {
        getIdFromEvent(EVENT_LTD);
      }).to.throw(Error);
    });
  });

  describe('getRsvpsUrl', () => {
    const getRsvpsUrl = winner.__get__('getRsvpsUrl');

    it('should return a string given an API key', () => {
      expect(getRsvpsUrl(BASE_URL, EVENT_ID, API_KEY)).to.be.a('string');
    });

    it('should return null if no API key is provided', () => {
      expect(getRsvpsUrl(BASE_URL, EVENT_ID)).to.be.null;
    });
  });

  describe('optsFromParams', () => {
    const optsFromParams = winner.__get__('optsFromParams');

    describe('with positional parameters', () => {
      it('should return an object with the appropriate properties', () => {
        const opts = optsFromParams(PARAMS_POS);
        expect(opts)
          .to.have.property('meetup')
          .that.equals(PARAMS_POS.args[0]);
        expect(opts)
          .to.have.property('specificEventId')
          .that.equals(PARAMS_POS.args[1]);
      });
    });

    describe('with keyword arguments (named parameters)', () => {
      it('should return an object with the appropriate properties', () => {
        const opts = optsFromParams(PARAMS_KWARGS);
        expect(opts)
          .to.have.property('meetup')
          .that.equals(PARAMS_KWARGS.kwargs.meetup);
        expect(opts)
          .to.have.property('specificEventId')
          .that.equals(PARAMS_KWARGS.kwargs.event);
      });

      it('should default specificEventId to the empty string', () => {
        const opts = optsFromParams(PARAMS_KWARGS_NO_EVENT);
        expect(opts)
          .to.have.property('specificEventId')
          .that.equals('');
      });
    });
  });

  describe('winner', () => {
    it('should call back with an Error if no Meetup is provided', (done) => {
      winner(PARAMS_NONE, (err, data) => {
        try {
          expect(err).to.be.an('Error');
          expect(data).to.be.undefined;
          return done();
        } catch (testErr) {
          return done(testErr);
        }
      });
    });

    it('should call back with an Error if Meetup not found', (done) => {
      winner(PARAMS_MEETUP_NOT_FOUND, (err, data) => {
        try {
          expect(err).to.be.an('Error');
          expect(data).to.be.undefined;
          return done();
        } catch (testErr) {
          return done(testErr);
        }
      });
    });

    it('should call back with an Error if no upcoming Events found', (done) => {
      winner(PARAMS_MEETUP_NO_EVENTS, (err, data) => {
        try {
          expect(err).to.be.an('Error');
          expect(data).to.be.undefined;
          return done();
        } catch (testErr) {
          return done(testErr);
        }
      });
    });

    it('should call back with an Error if Event not found', (done) => {
      winner(PARAMS_EVENT_NOT_FOUND, (err, data) => {
        try {
          expect(err).to.be.an('Error');
          expect(data).to.be.undefined;
          return done();
        } catch (testErr) {
          return done(testErr);
        }
      });
    });

    it('should call back with an Error if Event not public', (done) => {
      winner(PARAMS_EVENT_NOT_PUBLIC, (err, data) => {
        try {
          expect(err).to.be.an('Error');
          expect(data).to.be.undefined;
          return done();
        } catch (testErr) {
          return done(testErr);
        }
      });
    });

    it('should call back with a winner for a valid Meetup Event', (done) => {
      winner(PARAMS_POS_NO_EVENT, (err, data) => {
        try {
          expect(err).to.be.null;
          expect(data).to.have.property('winner').that.equals(WINNER_NAME);
          return done();
        } catch (testErr) {
          return done(testErr);
        }
      });
    });
  });
});
