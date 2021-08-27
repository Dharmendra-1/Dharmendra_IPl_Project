const _ = require('lodash');

const superOverEconomie = (deliveries) => {
  let bowlerBowl = {};
  let bowlerTotalRun = _.chain(deliveries)
    .reduce((runsOfObj, match) => {
      if (_.toNumber(match.is_super_over) === 1) {
        let bowler = match.bowler;
        let totalRuns = _.toNumber(match.total_runs);

        runsOfObj[bowler]
          ? (runsOfObj[bowler] += totalRuns)
          : (runsOfObj[bowler] = {}) && (runsOfObj[bowler] = totalRuns);

        bowlerBowl[bowler]
          ? (bowlerBowl[bowler] += 1)
          : (bowlerBowl[bowler] = {}) && (bowlerBowl[bowler] = 1);
      }

      return runsOfObj;
    }, {})
    .value();

  let calculateEconomies = _.chain(bowlerTotalRun)
    .keys()
    .reduce((obj, player) => {
      if (bowlerBowl.hasOwnProperty(player)) {
        let runs = bowlerTotalRun[player];
        let bowl = bowlerBowl[player];

        let economie = _.toNumber((runs / (bowl / 6)).toFixed(2));

        obj[player] = economie;
      }

      return obj;
    }, {})
    .value();

  let finalEconomies = _.chain(calculateEconomies)
    .toPairs()
    .sortBy((arr) => arr[1])
    .reduce((obj, ar) => {
      obj[ar[0]] = ar[1];
      return obj;
    }, {})
    .value();

  return finalEconomies;
};

module.exports = superOverEconomie;
