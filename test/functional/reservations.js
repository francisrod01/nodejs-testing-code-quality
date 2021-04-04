const chai = require('chai');
const chaiHttp = require('chai-http');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const logger = require('morgan');
chai.use(chaiHttp);
const should = chai.should();

describe('/reservations', function() {
  let dbStub;
  let loggerStub;
  let debugStub;
  let app;

  before(function() {
    dbStub = {
      run: function() {
        return Promise.resolve({
          stmt: {
            lastID: 1349
          }
        });
      }
    }
    dbStub['@global'] = true;

    loggerStub = sinon
      .stub(logger, 'compile')
      // @ts-ignore
      .returns(function(req, res, next) {
        // @ts-ignore
        next();
      });

    debugStub = function() {
      return sinon.stub();
    }
    debugStub['@global'] = true;

    app = proxyquire('../../app', {
      sqlite: dbStub,
      morgan: loggerStub,
      debug: debugStub
    });
  });

  after(function() {
    loggerStub.restore();
  });

  context('GET', function() {
    it('should return the reservations from', function(done) {
      chai.request(app)
        .get('/reservations')
        .end(function(err, res) {
          res.should.have.status(200);
          res.text.should.contain('To make reservations please fill out the following form');
          done(err);
        });
    });
  });
});
