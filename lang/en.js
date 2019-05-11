module.exports = {
  'JSON-Anfrage X erwartet, aber Y bekommen': function (x, y) {
    return `Expected JSON-request ${x} but got ${y}`
  },
  'Dieser Wahlname existiert bereits!': 'This name already exists!'
}
