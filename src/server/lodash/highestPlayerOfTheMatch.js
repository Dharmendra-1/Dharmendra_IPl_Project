const _ = require('lodash');

const playerOfTheMatch = (matches) => {
  let allPlayer = _.chain(matches)
    .reduce((obj, match) => {
      let season = match.season;
      let player = match.player_of_match;

      obj[season] || (obj[season] = {});
      obj[season][player] = (obj[season][player] || 0) + 1;

      return obj;
    }, {})
    .value();

  let topPlayer = _.chain(allPlayer)
    .keys()
    .reduce((finalObj, year) => {
      let player = _.chain(allPlayer[year])
        .toPairs()
        .sortBy((arr) => arr[1])
        .slice(-1)
        .flatten()
        .value();

      finalObj[year] || (finalObj[year] = {});
      finalObj[year][player[0]] = player[1];

      return finalObj;
    }, {})
    .value();

  return topPlayer;
};

module.exports = playerOfTheMatch;
