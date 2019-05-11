module.exports = {
  'JSON-Anfrage X erwartet, aber Y bekommen': function (x, y) {
    return `Expected JSON-request ${x} but got ${y}`
  },
  'Erwarte JSON-Header X': function (x) {
    return `Expected JSON-Header ${x}`
  },
  'Dieser Wahlname existiert bereits!': 'This name already exists!'
}
