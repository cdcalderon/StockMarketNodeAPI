const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { StockEarning } = require('./../models/stockEarning');

const earnings = [{
   symbol:'COST'
  }, {
   symbol:'AAPL'
  }];

beforeEach((done) => {
  StockEarning.remove({}).then(() => {
    StockEarning.insertMany(earnings);
  }).then(() => done());
});

describe('POST /earnings', ()=> {
  it('should create a new earning', (done) => {
    var symbol = 'MSFT';

    request(app)
      .post('/earnings')
      .send({symbol})
      .expect(200)
      .expect((res) => {
        expect(res.body.symbol).toBe(symbol);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        StockEarning.find({symbol}).then((earnings) => {
          expect(earnings.length).toBe(1);
          expect(earnings[0].symbol).toBe(symbol);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create earning with invalid body', (done) => {
    request(app)
      .post('/earnings')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          done(err);
        }

        StockEarning.find().then((earnings) => {
          expect(earnings.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /earnings', ()=> {
  it('should get all earnings', (done) => {
    request(app)
      .get('/earnings')
      .expect(200)
      .expect((res) => {
        expect(res.body.earnings.length).toBe(2);
      })
      .end(done);
  });
});