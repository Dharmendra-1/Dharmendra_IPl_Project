const highestPlayerOfTheMatchOfEachSeason = (matches) => {
  const playerOfTheMatch = matches.reduce((objOfPlayerOfTheMatch, match) => {
    let season = match.season;
    let player = match.player_of_match;

    if (objOfPlayerOfTheMatch[season]) {
      if (objOfPlayerOfTheMatch[season][player]) {
        objOfPlayerOfTheMatch[season][player] += 1;
      } else {
        objOfPlayerOfTheMatch[season][player] = 1;
      }
    } else {
      objOfPlayerOfTheMatch[season] = {};
    }

    return objOfPlayerOfTheMatch;
  }, {});

  const year = Object.keys(playerOfTheMatch);

  const highestNumberOfPlayerOfTheMatch = year.reduce((objOfPlayer, season) => {
    let seasonOfPlayerEntries = Object.entries(playerOfTheMatch[season]);
    let sortedDataOfPlayer = seasonOfPlayerEntries.sort(
      (firstEntry, secondEntry) => {
        if (firstEntry[1] > secondEntry[1]) {
          return -1;
        } else if (firstEntry[1] < secondEntry[1]) {
          return 1;
        } else {
          return 0;
        }
      }
    );

    let topPlayerOfSeason = sortedDataOfPlayer.slice(0, 1).flat();

    let playerName = topPlayerOfSeason[0];
    let numberOfTime = topPlayerOfSeason[1];

    if (objOfPlayer[season]) {
      if (!objOfPlayer[season][playerName]) {
        objOfPlayer[season][playerName] = numberOfTime;
      }
    } else {
      objOfPlayer[season] = {};
      objOfPlayer[season][playerName] = numberOfTime;
    }

    return objOfPlayer;
  }, {});

  return highestNumberOfPlayerOfTheMatch;
};

module.exports = highestPlayerOfTheMatchOfEachSeason;
