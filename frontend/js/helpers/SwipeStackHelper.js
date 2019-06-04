function swipeOutCard(card, direction) {
  if (direction === "up" || direction === "down") {
    for (let i = 0; i < 40; i++) {
      setTimeout(() => {
        card.style.top =
          "calc(50% - 40%" +
          (direction === "down" ? " + " : " - ") +
          i * 1.5 +
          "% + 50px)";
      }, i * 5);
    }
  } else if (direction === "left" || direction === "right") {
    for (let i = 0; i < 40; i++) {
      setTimeout(() => {
        card.style.left =
          "calc(50% - 40%" +
          (direction === "right" ? " + " : " - ") +
          i * 1.5 +
          "%)";
      }, i * 5);
    }
  }
}

function swipeInCard(card, direction) {
  if (direction === "right" || direction === "left") {
    for (let i = 40; i >= 0; i--) {
      setTimeout(() => {
        card.style.left =
          "calc(50% - 40%" +
          (direction === "right" ? " + " : " - ") +
          i * 1.5 +
          "%)";
      }, 40 * 5 - i * 5);
    }
  } else if (direction === "down" || direction === "up") {
    for (let i = 40; i >= 0; i--) {
      setTimeout(() => {
        card.style.top =
          "calc(50% - 40%" +
          (direction === "down" ? " + " : " - ") +
          i * 1.5 +
          "% + 50px)";
      }, 40 * 5 - i * 5);
    }
  }
}

export function dragging(card, direction, throwOutConfidence) {
  // Let opacity decrease when the card gains throwOutConfidence but don't let it fall lower than 0.3
  card.style.opacity = Math.max(1 - throwOutConfidence, 0.7);

  if (throwOutConfidence > 0.1) {
    if (direction === "right") {
      card.style.background =
        "hsl(83.6,25%," +
        Math.min(43.9 + (1 - throwOutConfidence) * 100, 70) +
        "%)";
    } else if (direction === "left") {
      card.style.background =
        "hsl(0,53.7%," +
        Math.min(42.4 + (1 - throwOutConfidence) * 100, 70) +
        "%)";
    } else if (direction === "down") {
      card.style.background =
        "hsl(0,0%," +
        Math.min(75.7 + (1 - throwOutConfidence) * 100, 70) +
        "%)";
    } else if (direction === "up") {
      card.style.background =
        "hsl(0,0%," +
        Math.min(75.7 + (1 - throwOutConfidence) * 100, 70) +
        "%)";
    }
  }
}

export function throwCardOut(card, answer) {
  let direction = answer === "yes" ? "right" :
    answer === "no" ? "left" :
    answer === "neutral" ? "down" :
    answer === "skip" ? "up" :
    null;

  swipeOutCard(card, direction);
}

export function finishedDragging(card) {
  card.style.opacity = 1;
  card.style.background = "#fff";
}

export function bringCardBack(card, fromAnswer) {
  let direction = fromAnswer === "yes" ? "right" :
    answer === "no" ? "left" :
    answer === "neutral" ? "down" :
    answer === "skip" ? "up" :
    null;

  swipeInCard(card, direction);
}