const highestDissmissPlayerByOtherPlayer = (deliveries) => {
  const dissmissPlayer = deliveries.reduce((objOfPlayer, match) => {
    if (
      match.player_dismissed.length !== 0 &&
      match.dismissal_kind !== 'run out'
    ) {
      let player = match.player_dismissed;
      let bowler = match.bowler;

      if (objOfPlayer[player]) {
        if (objOfPlayer[player][bowler]) {
          objOfPlayer[player][bowler] += 1;
        } else {
          objOfPlayer[player][bowler] = 1;
        }
      } else {
        objOfPlayer[player] = {};
      }
    }

    return objOfPlayer;
  }, {});

  let batsmanName = Object.keys(dissmissPlayer);

  let highestDissmiss = batsmanName.reduce((objOfPlayer, player) => {
    let bowlerEntries = Object.entries(dissmissPlayer[player]);

    let sortedDataOfBowler = bowlerEntries.sort((firstEntry, secondEntry) => {
      if (firstEntry[1] < secondEntry[1]) {
        return 1;
      } else if (firstEntry[1] > secondEntry[1]) {
        return -1;
      } else {
        return 0;
      }
    });

    let bowlerData = sortedDataOfBowler.slice(0, 1).flat();

    if (Array.isArray(bowlerData) && bowlerData.length !== 0) {
      if (objOfPlayer[player]) {
        objOfPlayer[player][bowlerData[0]] = bowlerData[1];
      } else {
        objOfPlayer[player] = {};
        objOfPlayer[player][bowlerData[0]] = bowlerData[1];
      }
    }

    return objOfPlayer;
  }, {});

  return highestDissmiss;
};

module.exports = highestDissmissPlayerByOtherPlayer;
