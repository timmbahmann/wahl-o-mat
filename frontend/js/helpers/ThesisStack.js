/* eslint-disable operator-linebreak */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
class ThesisStack {
  constructor(theses) {
    this.theses = theses
    this.answeredTheses = []
    this.activeThesis = this.theses[this.theses.length - 1]
  }

  get Finished() {
    return this.answeredTheses.length === this.theses.length
  }

  get Theses() {
    return this.theses
  }

  get AnsweredTheses() {
    return this.answeredTheses
  }

  get ActiveThesis() {
    return this.activeThesis
  }

  answer(answeredThesisId, answer) {
    console.log(answeredThesisId)
    console.log(this.theses)
    // Get the full data of the thesis that has been answered by its unique id
    let answeredThesis = this.theses.filter(
      x => x._id === answeredThesisId
    )[0]

    // Push the answered thesis to the "answered"-stack, along with the result
    this.answeredTheses.push({
      thesis: answeredThesis,
      result: answer
    })

    // If there are still more theses in total than answered ones, set the new active thesis.
    // Else set it to null to indicate that there are no more cards to swipe
    if (this.answeredTheses.length < this.theses.length) {
      this.activeThesis = this.theses[(this.theses.length - 1) - this.answeredTheses.length]
    } else {
      this.activeThesis = null
    }
  }

  answerActiveThesis(answer) {
    this.answer(this.activeThesis._id, answer)
  }

  revert() {
    let lastThesis = this.answeredTheses.pop()
    this.activeThesis = lastThesis.thesis

    return lastThesis
  }
}

export default ThesisStack