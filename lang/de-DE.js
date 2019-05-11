module.exports = {
  'JSON-Anfrage X erwartet, aber Y bekommen': function (x, y) {
    return `JSON-Anfrage ${x} erwartet, aber ${y} bekommen.`
  },
  'Erwarte JSON-Header X': function (x) {
    return `Erwarte JSON-Header ${x}`
  },
  'Dieser Wahlname existiert bereits!': 'Dieser Wahlname existiert bereits!'
}
