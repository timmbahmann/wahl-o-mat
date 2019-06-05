/* eslint-disable operator-linebreak */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */

// TODO: This function still has to be implemented and,as of now, exists only for testing purposes
export function getResults(answeredTheses) {
  let gremien = answeredTheses.flatMap(x => x.answers).map(x => x.name).filter((value, index, self) =>
    self.indexOf(value) === index)

  return gremien.map(x => ({
    name: x,
    percentage: Math.floor(Math.random() * 80 + 20)
  }))
}
