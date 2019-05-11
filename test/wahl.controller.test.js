/* eslint-env mocha */

let chai = require('chai')
let expect = chai.expect
let chaiHttp = require('chai-http')
let controller = require('../controller/wahl.controller')
let Wahl = require('../models/wahl.model')
let chaiAsPromised = require('chai-as-promised')
let mongoose = require('mongoose')
const chalk = require('chalk')

chai.use(chaiHttp)
chai.should()
chai.use(chaiAsPromised)

describe('Check wahlcontroller\'s functions', () => {
  mongoose.connect('mongodb+srv://website:hack-paging8-related-bema9-6talisman-cymbal-madrid8-warn@wahl-o-mat-u1xgc.mongodb.net/testWahlcontroller?retryWrites=true', {useNewUrlParser: true})
  .then(() => console.log(chalk.green('database connected')))
  .catch(error => {
    console.log(chalk.red('database error'), error)
    process.exit(1)
  })
  it('should create a wahl', (done) => {
    let wahl = new Wahl({
      name: 'testname' + Math.random(),
      gremium: 'testgremium',
      thesen: [{
        these: 'Alles ist doof',
        antworten: [{
          name: 'Testliste',
          antwort: 'ja'
        }]
      }]
    })
    controller.createWahl(wahl).then(val => {
      console.log(val)
      expect(val.name).to.equal(wahl.name)
      expect(val.gremium).to.equal(wahl.gremium)
      expect(val.thesen[0].these).to.equal(wahl.thesen[0].these)
      done()
    })
    .catch(done)
  })

  it('should delete a wahl', (done) => {
    let wahl = new Wahl({
      name: 'testname' + Math.random(),
      gremium: 'testgremium',
      thesen: [{
        these: 'Alles ist doof',
        antworten: [{
          name: 'Testliste',
          antwort: 'ja'
        }]
      }]
    })
    controller.createWahl(wahl).then(val => {
      expect(val.name).to.equal(wahl.name)
      expect(val.gremium).to.equal(wahl.gremium)
      expect(val.thesen[0].these).to.equal(wahl.thesen[0].these)
      controller.deleteWahl(wahl.name).then(val => {
        expect(val).to.equal(true)
      }).catch(done)
    })
    .catch(done)
  })

  it('should update a wahl', (done) => {
    done()
  })

  afterEach(() => {
    Wahl.remove({})
    .then(() => console.log(chalk.green('db is empty')))
    .catch(error => console.error(chalk.red('error on emptying db'), error))
  })

  after(function () {
    mongoose.connection.close()
    console.log(chalk.green('connection closed'))
  })
})
