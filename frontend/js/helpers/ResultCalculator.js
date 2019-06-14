export function getResults(answeredTheses) {
  // Get only the panel names from the theses by ...
  let panels = answeredTheses
    // ... extracting all answers from all answered theses and putting them in a single one-dimensional list
    .flatMap(answeredThesis => answeredThesis.thesis.antworten)
    // ... getting only the panel names from the resulting objects
    .map(answer => answer.name)
    // ... filter so that only unique values remain
    .filter((value, index, self) => self.indexOf(value) === index)

  let points = [];
  let maxPoints = answeredTheses.length * 2;

  console.log(answeredTheses.map(x => x.result))
  console.log(answeredTheses.map(x => x.thesis.antworten.map(y => y.antwort).join(" ")))

  let count = 0;
  // Calculate points for each panel and push them to the points list
  panels.forEach(panel => {
    let pointsForGremium = {
      panel: panel,
      points: 0
    };

    // Increase points for every answered thesis that matches the panel's answer 
    // according to the wahlomat algorithm that can be found under
    // https://www.bpb.de/system/files/dokument_pdf/Rechenmodell%20des%20Wahl-O-Mat.pdf
    answeredTheses.forEach(answeredThesis => {
      let gremiumAnswer = answeredThesis.thesis.antworten.filter(answer => answer.name === panel)[0].antwort;

      if (answeredThesis.result === gremiumAnswer)
        pointsForGremium.points += 2;
      else if (answeredThesis.result != "skip" && (answeredThesis.result === "neutral" || gremiumAnswer === "neutral"))
        pointsForGremium.points += 1;
    })

    points.push(pointsForGremium)
  })

  // Calculate a percentage of the maximum possible points for all point results that can later be displayed
  let results = points.map(pointsForGremium => {
    return {
      gremium: pointsForGremium.gremium,
      result: ((pointsForGremium.points / maxPoints) * 100),
    }
  });

  return results;
}