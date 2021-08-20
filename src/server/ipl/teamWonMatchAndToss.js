const teamWonMatchAndToss = (matches) => {
  const wonMatchAndToss = matches.reduce((objOfTeam, match) => {
    const toss_winner = match.toss_winner;
    const match_winner = match.winner;

    if (toss_winner === match_winner) {
      if (objOfTeam[toss_winner]) {
        objOfTeam[toss_winner] += 1;
      } else {
        objOfTeam[toss_winner] = 1;
      }
    }

    return objOfTeam;
  }, {});

  const wonMatchAndTossEntries = Object.entries(wonMatchAndToss);

  const sortedDataOfTeam = wonMatchAndTossEntries.sort(
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

  const finalSortedDataWonMatchAndToss = Object.fromEntries(sortedDataOfTeam);

  return finalSortedDataWonMatchAndToss;
};

module.exports = teamWonMatchAndToss;
