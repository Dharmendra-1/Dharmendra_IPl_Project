const _ = require('lodash');

const strikeRateOfBatsmanEachSeason = (matches, deliveries) => {
  const strikeRateOfBatsmanEachYear = _.chain(matches)
    .map((match) => match.season)
    .uniqBy()
    .reduce((finalstrikeRateObj, year) => {
      let idOfSeason = _.chain(matches)
        .filter((match) => (match.season === year ? match : undefined))
        .map((match) => match.id)
        .value();

      let ballPlayByBatsman = {};

      let batsmanRuns = _.chain(deliveries)
        .reduce((runsOfObj, match) => {
          if (idOfSeason.indexOf(match.match_id) !== -1) {
            let batsman = match.batsman;
            let batsmanRun = _.toNumber(match.batsman_runs);

            runsOfObj[year] || (runsOfObj[year] = {});
            runsOfObj[year][batsman] =
              (runsOfObj[year][batsman] || 0) + batsmanRun;

            ballPlayByBatsman[year] || (ballPlayByBatsman[year] = {});
            ballPlayByBatsman[year][batsman] =
              (ballPlayByBatsman[year][batsman] || 0) + 1;
          }

          return runsOfObj;
        }, {})
        .value();

      let calculateStrikeRate = _.chain(ballPlayByBatsman)
        .reduce((strikeRate, ballData) => {
          _.chain(ballData)
            .keys(ballData)
            .forEach((player) => {
              if (batsmanRuns[year].hasOwnProperty(player)) {
                let runs = batsmanRuns[year][player];
                let bowl = ballPlayByBatsman[year][player];

                let batsmanstrikeRates = _.toNumber(
                  ((runs / bowl) * 100).toFixed(2)
                );

                strikeRate[year] || (strikeRate[year] = {});
                strikeRate[year][player] = batsmanstrikeRates;
              }
            })
            .value();

          return strikeRate;
        }, {})
        .value();

      _.chain(calculateStrikeRate[year])
        .toPairs()
        .sortBy((arr) => arr[1])
        .forEach((array) => {
          finalstrikeRateObj[year] || (finalstrikeRateObj[year] = {});
          finalstrikeRateObj[year][array[0]] = array[1];
        })
        .value();

      return finalstrikeRateObj;
    }, {})
    .value();

  return strikeRateOfBatsmanEachYear;
};

module.exports = strikeRateOfBatsmanEachSeason;
