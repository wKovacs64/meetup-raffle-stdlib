const { expect } = require('chai');
const sinon = require('sinon');
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
  EVENT_ID_NOT_FOUND,
  EVENT_ID_NOT_PUBLIC,
  EVENT_ID_UNEXPECTED,
  API_KEY,
  MEETUP,
  MEETUP_NO_EVENTS,
  MEETUP_NOT_FOUND,
  WINNER_NAME,
} = require('../testData');
const meetupRandomizerMock = require('./meetupRandomizer.mock.js');
require('./mockAxios');

const winner = rewire('../../functions/winner/__main__');

describe('winner', () => {
  const successHandler = sinon.spy();
  const errorHandler = sinon.spy();

  before(() => {
    winner.__set__('meetupRandomizer', meetupRandomizerMock);
  });

  afterEach(() => {
    successHandler.reset();
    errorHandler.reset();
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

  describe('default export', () => {
    it('should reject if Meetup not found', async () => (
      winner(MEETUP_NOT_FOUND)
        .then(successHandler)
        .catch(errorHandler)
        .then(() => {
          expect(successHandler.called).to.be.false;
          expect(errorHandler.calledOnce).to.be.true;
          expect(errorHandler.getCall(0).args[0].message).to.match(/^Sorry/);
        })
    ));

    it('should reject if no upcoming Events found', async () => (
      winner(MEETUP_NO_EVENTS)
        .then(successHandler)
        .catch(errorHandler)
        .then(() => {
          expect(successHandler.called).to.be.false;
          expect(errorHandler.calledOnce).to.be.true;
          expect(errorHandler.getCall(0).args[0].message).to.match(/^Sorry/);
        })
    ));

    it('should reject if Event not found', async () => (
      winner(MEETUP, EVENT_ID_NOT_FOUND)
        .then(successHandler)
        .catch(errorHandler)
        .then(() => {
          expect(successHandler.called).to.be.false;
          expect(errorHandler.calledOnce).to.be.true;
          expect(errorHandler.getCall(0).args[0].message).to.match(/^Sorry/);
        })
    ));

    it('should reject if Event not public', async () => (
      winner(MEETUP, EVENT_ID_NOT_PUBLIC)
        .then(successHandler)
        .catch(errorHandler)
        .then(() => {
          expect(successHandler.called).to.be.false;
          expect(errorHandler.calledOnce).to.be.true;
          expect(errorHandler.getCall(0).args[0].message).to.match(/^Sorry/);
        })
    ));

    it('should reject on unexpected data', async () => (
      winner(MEETUP, EVENT_ID_UNEXPECTED)
        .then(successHandler)
        .catch(errorHandler)
        .then(() => {
          expect(successHandler.called).to.be.false;
          expect(errorHandler.calledOnce).to.be.true;
          expect(errorHandler.getCall(0).args[0].message).to.match(/^Sorry/);
        })
    ));

    it('should resolve with a winner for a valid Meetup Event', async () => (
      winner(MEETUP)
        .then(successHandler)
        .catch(errorHandler)
        .then(() => {
          expect(errorHandler.called).to.be.false;
          expect(successHandler.calledOnce).to.be.true;
          const data = successHandler.getCall(0).args[0];
          expect(data).to.be.an('object');
          expect(data).to.have.property('winner').and.equal(WINNER_NAME);
        })
    ));
  });
});
