/* eslint-env mocha */

let chai = require('chai')
let expect = chai.expect
let chaiHttp = require('chai-http')
let server = require('../index')

chai.use(chaiHttp)
chai.should()

describe('test /json', async () => {
  let req = chai.request(server.app).keepOpen()
  it('should return error code 415 with text "JSON-Anfrage erwartet"', (done) => {
    req.get('/json')
    .set('Accept-Language', 'en')
    .end((err, res) => {
      expect(err).to.equal(null)
      expect(res.text).to.have.string('Expected JSON-request')
      expect(res.status).to.equal(415)
      done()
    })
  })
  it('should return the static JSON', (done) => {
    req
    .get('/json')
    .set('content-type', 'application/json')
    .end((err, res) => {
      expect(err).to.equal(null)
      expect(res.status).to.equal(200)
      let resJSON = require('../static/test.json')
      expect(res.text).to.equal(JSON.stringify(resJSON))
      done()
    })
  })

  it('should use english', (done) => {
    req
    .get('/json')
    .set('content-type', 'text/plain')
    .set('Accept-Language', 'en')
    .end((err, res) => {
      expect(err).to.equal(null)
      expect(res.status).to.equal(415)
      expect(res.text).to.have.string('Expected JSON-request')
      done()
    })
  })

  it('should use german', (done) => {
    req
    .get('/json')
    .set('content-type', 'text/plain')
    .set('Application-Language', 'de-DE')
    .end((err, res) => {
      expect(err).to.equal(null)
      expect(res.status).to.equal(415)
      expect(res.text).to.have.string('JSON-Anfrage')
      done()
    })
  })
  after(function () {
    server.stop()
  })
})
