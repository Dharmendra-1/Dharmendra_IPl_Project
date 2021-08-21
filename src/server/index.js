const fs = require('fs');
const csv = require('csvtojson');
const path = require('path');

const WonMatchAndToss = require('./ipl/teamWonMatchAndToss');
const playerOfTheMatchEachSeason = require('./ipl/highestPlayerOfTheMatch.js');
const strikeRateOfBatsmanEachSeason = require('./ipl/strikeRateOfBatsmanEachSeason');
const highestDissmiss = require('./ipl/highestDissmissPlayerByOtherPlayer');
const bestSuperOverEconomies = require('./ipl/superOverEconomie');

const matchesFilePath = path.join(__dirname, '../data/matches.csv');
const deliveriesFilePath = path.join(__dirname, '../data/deliveries.csv');

csv()
  .fromFile(matchesFilePath)
  .then((matches) => {
    const teamWonMatchAndToss = WonMatchAndToss(matches);
    const playerOfTheMatch = playerOfTheMatchEachSeason(matches);

    csv()
      .fromFile(deliveriesFilePath)
      .then((deliveries) => {
        const strikeRateOfBatsman = strikeRateOfBatsmanEachSeason(
          matches,
          deliveries
        );

        const highestDissmissPlayer = highestDissmiss(deliveries);

        const superOverEconomies = bestSuperOverEconomies(deliveries);
      });
  });
