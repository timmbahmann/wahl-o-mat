/* eslint-env mocha */

let chai = require('chai')
let expect = chai.expect
let chaiHttp = require('chai-http')
let server = require('../index')

chai.use(chaiHttp)
chai.should()

describe('test /json', async () => {
  it('should return error code 415 with text "JSON-Anfrage erwartet"', (done) => {
    chai.request(server.app).get('/json')
    .end((err, res) => {
      expect(err).to.equal(null)
      expect(res.text).to.have.string('JSON-Anfrage erwartet')
      expect(res.status).to.equal(415)
      server.stop()
      done()
    })
  })
  it('should return the static JSON', (done) => {
    chai.request(server.app)
    .get('/json')
    .set('content-type', 'application/json')
    .end((err, res) => {
      expect(err).to.equal(null)
      expect(res.status).to.equal(200)
      let resJSON = require('../static/test.json')
      expect(res.text).to.equal(JSON.stringify(resJSON))
      server.stop()
      done()
    })
  })
})
