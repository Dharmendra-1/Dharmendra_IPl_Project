const _ = require('lodash');

const dissmissPlayerByOther = (deliveries) => {
  const dissmissPlayer = _.chain(deliveries)
    .reduce((objOfPlayer, match) => {
      if (
        match.player_dismissed.length !== 0 &&
        match.dismissal_kind !== 'run out'
      ) {
        let player = match.player_dismissed;
        let bowler = match.bowler;

        objOfPlayer[player] || (objOfPlayer[player] = {});
        objOfPlayer[player][bowler] = (objOfPlayer[player][bowler] || 0) + 1;
      }

      return objOfPlayer;
    }, {})
    .value();

  const topDissmiss = _.chain(dissmissPlayer)
    .keys()
    .reduce((obj, player) => {
      let bowlerData = _.chain(dissmissPlayer[player])
        .toPairs()
        .sortBy((arr) => arr[1])
        .slice(-1)
        .flatten()
        .value();

      obj[player] || (obj[player] = {});
      obj[player][bowlerData[0]] = bowlerData[1];

      return obj;
    }, {})
    .value();

  return topDissmiss;
};

module.exports = dissmissPlayerByOther;
