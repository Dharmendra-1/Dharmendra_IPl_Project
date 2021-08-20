const fs = require('fs');
const csv = require('csvtojson');
const path = require('path');

const WonMatchAndToss = require('./ipl/teamWonMatchAndToss');

const matchesFilePath = path.join(__dirname, '../data/matches.csv');
const deliveriesFilePath = path.join(__dirname, '../data/deliveries.csv');

csv()
  .fromFile(matchesFilePath)
  .then((matches) => {
    const teamWonMatchAndToss = WonMatchAndToss(matches);
  });
