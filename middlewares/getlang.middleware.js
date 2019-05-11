const fs = require('fs')

let langmiddleware = (req, res, next) => {
  if (req.get('Accept-Language')) {
    let langs = req.get('Accept-Language').split(',').map(lang => lang.split(';')[0])
    let i = 0
    for (; i < langs.length && !fs.existsSync('./lang/' + langs[i] + '.js'); i++) {
    }
    console.log(i, langs, langs[i])
    if (i === langs.length && !fs.existsSync('./lang/' + langs[i - 1] + '.js')) {
      req.lang = require('../lang/de-DE.js')
    } else {
      req.lang = require('../lang/' + langs[i] + '.js')
    }
  } else {
    req.lang = require('../lang/de-DE.js')
  }
  next()
}

module.exports = langmiddleware
