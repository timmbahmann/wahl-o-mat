/* eslint-env mocha */

let chai = require('chai')
let expect = chai.expect
let controller = require('../controller/wahl.controller')

let newWahl = (save, del, update) => function (wahl) {
  this.name = wahl.name
  this.gremium = wahl.gremium
  this.thesen = wahl.thesen
  this.save = save
  this.deleteOne = del
  this.findOneAndUpdate = update
}

describe('Check wahlcontroller\'s functions', () => {
  describe('check createWahl', () => {
    it('should successful create a wahl', (done) => {
      let wahl = {
        name: 'testname' + Math.random(),
        gremium: 'testgremium',
        thesen: [{
          these: 'Alles ist doof',
          antworten: [{
            name: 'Testliste',
            antwort: 'ja'
          }]
        }]
      }
      let resolvedWahl = {
        _id: 123456,
        name: wahl.name,
        gremium: wahl.gremium,
        thesen: wahl.thesen
      }
      let saveSuccess = () =>
        new Promise((resolve, reject) =>
          resolve(resolvedWahl))
      controller.createWahl(newWahl(saveSuccess))(wahl)
      .then(val => {
        expect(val).to.deep.equal(resolvedWahl)
        done()
      })
      .catch(done)
    })

    it('should give error on double index', (done) => {
      let wahl = {
        name: 'testname' + Math.random(),
        gremium: 'testgremium',
        thesen: [{
          these: 'Alles ist doof',
          antworten: [{
            name: 'Testliste',
            antwort: 'ja'
          }]
        }]
      }
      let message = {
        message: ['duplicate key error']
      }
      let saveFailure = () =>
        new Promise((resolve, reject) =>
        reject(message))
      let neueWahl = newWahl(saveFailure)
      controller.createWahl(neueWahl)(wahl)
      .then(done)
      .catch(error => {
        expect(error).to.equal('Dieser Wahlname existiert bereits!')
        done()
      })
    })
  })

  it('should successful delete a wahl', (done) => {
    let name = 'testwahlname'
    let deleteSuccess = (queryObj) =>
    new Promise((resolve, reject) => {
      if (queryObj.name === name) {
        resolve({ ok: 1, deletedCount: 1, n: 1 })
      } else {
        reject({ok: 0, deletedCount: 0, n: 0})
      }
    })
    let NeueWahl = newWahl(null, deleteSuccess)
    let nW = new NeueWahl({name: null, gremium: null, thesen: null})
    controller.deleteWahl(nW)(name)
    .then(val => {
      expect(val).to.equal(true)
      done()
    })
    .catch(done)
  })

  it('should successful update a wahl', (done) => {
    let wahl = {
      name: 'testname' + Math.random(),
      gremium: 'testgremium'
    }
    let resolvedWahl = {
      _id: 123456,
      thesen: wahl.thesen,
      gremium: 'bla',
      name: 'blub'
    }
    let updateSuccess = (queryObj, updateObj) =>
      new Promise((resolve, reject) => {
        if (queryObj.name !== wahl.name) {
          reject({errors: { name: 'Validator "Invalid name" failed for path name' }})
        } else {
          resolvedWahl.name = updateObj.name
          resolvedWahl.gremium = updateObj.gremium
          resolve(resolvedWahl)
        }
      })
    controller.updateWahl(newWahl(null, null, updateSuccess))(wahl)
    .then(val => {
      expect(val).to.deep.equal(resolvedWahl)
      expect(val.name).to.equal(wahl.name)
      expect(val.gremium).to.equal(wahl.gremium)
      done()
    }).catch(done)
  })
})
