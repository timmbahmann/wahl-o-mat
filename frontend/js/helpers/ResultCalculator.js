/* eslint-disable operator-linebreak */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */

// TODO: This function still has to be implemented and,as of now, exists only for testing purposes
export function getResults(answeredTheses) {
  let gremien = answeredTheses.flatMap(x => x.antworten).map(x => x.name).filter((value, index, self) =>
    self.indexOf(value) === index)

  return gremien.map(x => ({
    name: x,
    percentage: Math.floor(Math.random() * 80 + 20),
    info: 'Morbi eleifend tellus ac leo sodales, dictum sagittis nisi tincidunt. Curabitur ut laoreet enim. Proin porta condimentum nulla ac tempor. Suspendisse vel ante diam. Fusce posuere, justo nec rutrum ultricies, enim urna fringilla dolor, id varius tellus libero semper nunc. Cras non dui elementum, suscipit quam et, vehicula justo. Pellentesque rutrum vestibulum dolor in finibus. Integer tempor scelerisque mollis. Ut eget venenatis nisl. Proin tristique ipsum eget felis condimentum feugiat.'
  }))
}