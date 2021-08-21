const bestSuperOverEconomies = (deliveries) => {
  let bowlerBowl = {};

  let bowlerTotalRuns = deliveries.reduce((objOfBowler, match) => {
    if (Number(match.is_super_over) === 1) {
      let bowler = match.bowler;
      let totalRuns = Number(match.total_runs);

      if (objOfBowler[bowler]) {
        objOfBowler[bowler] += totalRuns;
        bowlerBowl[bowler] += 1;
      } else {
        objOfBowler[bowler] = {};
        objOfBowler[bowler] = totalRuns;
        bowlerBowl[bowler] = 1;
      }
    }

    return objOfBowler;
  }, {});

  let calculateEconomies = Object.keys(bowlerTotalRuns).reduce(
    (objOfBowler, playerName) => {
      if (bowlerBowl.hasOwnProperty(playerName)) {
        let economieOfBowler = Number(
          (bowlerTotalRuns[playerName] / (bowlerBowl[playerName] / 6)).toFixed(
            2
          )
        );

        if (!objOfBowler[playerName]) {
          objOfBowler[playerName] = economieOfBowler;
        }
      }

      return objOfBowler;
    },
    {}
  );

  let sortedDataOfBestEconomies = Object.entries(calculateEconomies).sort(
    (firstEntry, secondEntry) => {
      if (firstEntry[1] > secondEntry[1]) {
        return 1;
      } else if (firstEntry[1] < secondEntry[1]) {
        return -1;
      } else {
        return 0;
      }
    }
  );

  let bestEconomiesOfBowlerInSuperOver = Object.fromEntries(
    sortedDataOfBestEconomies
  );

  return bestEconomiesOfBowlerInSuperOver;
};

module.exports = bestSuperOverEconomies;
