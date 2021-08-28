const _ = require('lodash');

const wonTossAndMatch = (matches) => {
  const WonMatchAndToss = _.chain(matches)
    .filter((match) => match.winner === match.toss_winner)
    .reduce((finalObj, match) => {
      finalObj[match.winner] = (finalObj[match.winner] || 0) + 1;
      return finalObj;
    }, {})
    .toPairs()
    .sortBy((arr) => arr[1])
    .reduce((finalObj, team) => {
      finalObj[team[0]] = team[1];
      return finalObj;
    }, {})
    .value();

  return WonMatchAndToss;
};

module.exports = wonTossAndMatch;
