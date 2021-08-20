const strikeRateOfBatsmanEachSeason = (matches, deliveries) => {
  const year = matches
    .map((match) => match.season)
    .reduce((arrayOfSeason, season) => {
      if (arrayOfSeason.indexOf(season) === -1) {
        arrayOfSeason.push(season);
      }

      return arrayOfSeason;
    }, []);

  const strikeRateOfBatsman = year.reduce((objOfStrikeRate, season) => {
    let idOfSeason = matches
      .filter((match) => match.season === season)
      .map((match) => Number(match.id));

    let ballPlayByBatsman = {};

    let batsmanRuns = deliveries.reduce((objOfBatsmanRun, deliverie) => {
      let deli_id = Number(deliverie.match_id);

      if (idOfSeason.indexOf(deli_id) !== -1) {
        let batsman = deliverie.batsman;
        let runsOfbatsman = Number(deliverie.batsman_runs);

        if (ballPlayByBatsman[season]) {
          if (ballPlayByBatsman[season][batsman]) {
            ballPlayByBatsman[season][batsman] += 1;
          } else {
            ballPlayByBatsman[season][batsman] = 1;
          }
        } else {
          ballPlayByBatsman[season] = {};
        }

        if (objOfBatsmanRun[season]) {
          if (objOfBatsmanRun[season][batsman]) {
            objOfBatsmanRun[season][batsman] += runsOfbatsman;
          } else {
            objOfBatsmanRun[season][batsman] = runsOfbatsman;
          }
        } else {
          objOfBatsmanRun[season] = {};
        }
      }

      return objOfBatsmanRun;
    }, {});

    let playerName = Object.keys(batsmanRuns[season]);

    let calculateStrikeRate = playerName.reduce(
      (objOfStrikeRate, nameOfPlayer) => {
        if (ballPlayByBatsman[season].hasOwnProperty(nameOfPlayer)) {
          let strikeRate = Number(
            (
              (batsmanRuns[season][nameOfPlayer] /
                ballPlayByBatsman[season][nameOfPlayer]) *
              100
            ).toFixed(2)
          );

          if (objOfStrikeRate[season]) {
            if (!objOfStrikeRate[season][nameOfPlayer]) {
              objOfStrikeRate[season][nameOfPlayer] = strikeRate;
            }
          } else {
            objOfStrikeRate[season] = {};
          }
        }

        return objOfStrikeRate;
      },
      {}
    );

    let seasonallydataOfStrikeRate = Object.entries(
      calculateStrikeRate[season]
    );

    let sortedSeasonallyData = seasonallydataOfStrikeRate.sort(
      (firstEntry, secondEntry) => {
        if (firstEntry[1] < secondEntry[1]) {
          return 1;
        } else if (firstEntry[1] > secondEntry[1]) {
          return -1;
        } else {
          return 0;
        }
      }
    );

    let finalStrikeRatesOfBatsman = Object.fromEntries(sortedSeasonallyData);

    if (!objOfStrikeRate[season]) {
      objOfStrikeRate[season] = {};
      objOfStrikeRate[season] = finalStrikeRatesOfBatsman;
    }

    return objOfStrikeRate;
  }, {});

  return strikeRateOfBatsman;
};

module.exports = strikeRateOfBatsmanEachSeason;
