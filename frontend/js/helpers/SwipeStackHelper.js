/* eslint-disable operator-linebreak */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
export function swipeOutCard(card, direction) {
  if (direction === NEUTRAL || direction === SKIP) {
    for (let i = 0; i < 40; i++) {
      setTimeout(() => {
        card.style.top =
          'calc(50% - 40%' +
          (direction === NEUTRAL ? ' + ' : ' - ') +
          i * 1.5 +
          '% + 50px)'
      }, i * 5)
    }
  } else if (direction === YES || direction === NO) {
    for (let i = 0; i < 40; i++) {
      setTimeout(() => {
        card.style.left =
          'calc(50% - 40%' +
          (direction === YES ? ' + ' : ' - ') +
          i * 1.5 +
          '%)'
      }, i * 5)
    }
  }
}

export function swipeInCard(card, direction) {
  if (direction === NEUTRAL || direction === SKIP) {
    for (let i = 40; i >= 0; i--) {
      setTimeout(() => {
        card.style.top =
          'calc(50% - 40%' +
          (direction === NEUTRAL ? ' + ' : ' - ') +
          i * 1.5 +
          '% + 50px)'
      }, 40 * 5 - i * 5)
    }
  } else if (direction === YES || direction === NO) {
    for (let i = 40; i >= 0; i--) {
      setTimeout(() => {
        card.style.left =
          'calc(50% - 40%' +
          (direction === YES ? ' + ' : ' - ') +
          i * 1.5 +
          '%)'
      }, 40 * 5 - i * 5)
    }
  }
}

export const YES = {
  answer: 'yes',
  direction: 'left',
  xCoordinate: 90,
  yCoordinate: 0
}

export const NO = {
  answer: 'no',
  direction: 'right',
  xCoordinate: -90,
  yCoordinate: 0
}

export const NEUTRAL = {
  answer: 'neutral',
  direction: 'down',
  xCoordinate: 0,
  yCoordinate: 90
}

export const SKIP = {
  answer: 'skip',
  direction: 'up',
  xCoordinate: 0,
  yCoordinate: -90
}

export function getResultObjectFromString(searchString) {
  return [this.YES, this.NO, this.NEUTRAL, this.SKIP].filter(x => x.answer === searchString || x.direction === searchString)[0]
}

export function dragging(card, direction, throwOutConfidence) {
  // Let opacity decrease when the card gains throwOutConfidence but don't let it fall lower than 0.3
  card.style.opacity = Math.max(1 - throwOutConfidence, 0.7)

  if (throwOutConfidence > 0.1) {
    if (direction === 'right') {
      card.style.background =
        'hsl(83.6,25%,' +
        Math.min(43.9 + (1 - throwOutConfidence) * 100, 70) +
        '%)'
    } else if (direction === 'left') {
      card.style.background =
        'hsl(0,53.7%,' +
        Math.min(42.4 + (1 - throwOutConfidence) * 100, 70) +
        '%)'
    } else if (direction === 'down') {
      card.style.background =
        'hsl(0,0%,' +
        Math.min(75.7 + (1 - throwOutConfidence) * 100, 70) +
        '%)'
    } else if (direction === 'up') {
      card.style.background =
        'hsl(0,0%,' +
        Math.min(75.7 + (1 - throwOutConfidence) * 100, 70) +
        '%)'
    }
  }
}

export function resetCardPosition(card) {
  card.style.left = undefined
  card.style.top = undefined
}

export function finishedDragging(card) {
  card.style.opacity = 1
  card.style.background = '#fff'
}
