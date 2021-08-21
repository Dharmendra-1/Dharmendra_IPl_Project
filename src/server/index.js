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

const teamWonMatchAndTossJsonFilePath = path.join(
  __dirname,
  '../public/output/teamWonMatchAndToss.json'
);
const playerOfTheMatchJsonFilePath = path.join(
  __dirname,
  '../public/output/playerOfTheMatch.json'
);
const strikeRateOfBatsmanJsonFilePath = path.join(
  __dirname,
  '../public/output/outputstrikeRateOfBatsman.json'
);
const highestDissmissPlayerJsonFilePath = path.join(
  __dirname,
  '../public/output/highestDissmissPlayer.json'
);
const superOverEconomiesJsonFilePath = path.join(
  __dirname,
  '../public/output/superOverEconomies.json'
);

const jsonFilePath = [
  teamWonMatchAndTossJsonFilePath,
  playerOfTheMatchJsonFilePath,
  strikeRateOfBatsmanJsonFilePath,
  highestDissmissPlayerJsonFilePath,
  superOverEconomiesJsonFilePath,
];

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

        const resultOfProblem = [
          teamWonMatchAndToss,
          playerOfTheMatch,
          strikeRateOfBatsman,
          highestDissmissPlayer,
          superOverEconomies,
        ];

        convertIntoJson(resultOfProblem, jsonFilePath);
      });
  });

const convertIntoJson = (resultOfProblem, jsonFilePath) => {
  let index = 0;
  resultOfProblem.forEach((matchResult) => {
    let jsonDataOfMatch = JSON.stringify(matchResult);

    fs.writeFile(jsonFilePath[index++], jsonDataOfMatch, (error, data) => {
      if (error) {
        console.error(error.message);
      }
    });
  });
};
