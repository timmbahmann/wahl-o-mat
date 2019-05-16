/* eslint-env mocha */

let factory = require('./factories')
let Wahl = require('../models/wahl.model')
let sinon = require('sinon')
require('sinon-mongoose')

let expect = require('chai').expect
let controller = require('../controller/wahl.controller')

describe("Check wahlcontroller's functions", () => {
  beforeEach(function () {
    sinon.stub(Wahl, 'updateOne')
    sinon.stub(Wahl, 'deleteOne')
    sinon.stub(Wahl.prototype, 'save')
  })

  afterEach(function () {
    Wahl.updateOne.restore()
    Wahl.deleteOne.restore()
    Wahl.prototype.save.restore()
  })

  describe('check createWahl', () => {
    it('should successful create a wahl', done => {
      let wahlObj = factory.validWahl()
      let then = function (success, error) {
        return success(wahlObj)
      }
      Wahl.prototype.save.returns({ ...wahlObj, then: then })
      controller
        .createWahl(wahlObj)
        .then(val => {
          expect(val).to.deep.equal(wahlObj)
          done()
        })
        .catch(done)
    })

    it('should give error on double index', done => {
      let wahlObj = factory.validWahl()
      let wahlQuery = factory.duplicateKeyErrorQuery()
      Wahl.prototype.save.returns(wahlQuery)
      controller
        .createWahl(wahlObj)
        .then(done)
        .catch(error => {
          try {
            expect(error.message).to.equal('Dieser Wahlname existiert bereits!')
            done()
          } catch (e) {
            done(e)
          }
        })
    })
  })

  it('should successful delete a wahl', done => {
    let name = 'testwahlname'
    let query = {
      ok: 1,
      n: 1
    }
    query.then = function (success, error) {
      success(query)
    }
    Wahl.deleteOne.returns(query)
    controller
      .deleteWahl(name)
      .then(val => {
        expect(val).to.equal(true)
        done()
      })
      .catch(done)
  })

  it('should successful update a wahl', done => {
    let wahlObj = factory.validWahl()
    let query = factory.dbQueryFromWahlObj(wahlObj)
    let wahlQuery = factory.validWahlQuery(false)
    Wahl.updateOne.returns(wahlQuery)
    controller
      .updateWahl(wahlObj.name, wahlObj)
      .then(val => {
        expect(val).to.deep.equal(query)
        done()
      })
      .catch(error => {
        done(error)
      })
  })
})
