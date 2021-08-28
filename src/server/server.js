const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 4000;

const readFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (error, fileData) => {
      if (error) {
        reject(err);
      } else {
        resolve(fileData);
      }
    });
  });
};

const server = http.createServer((request, response) => {
  const reqUrl = request.url;

  switch (reqUrl) {
    case '/':
      readFile(path.join(__dirname, '../public/index.html'))
        .then((content) => {
          response.writeHead(200, { 'content-type': 'text/html' });
          response.write(content);
          response.end();
        })
        .catch((error) => {
          response.writeHead(404, { 'content-type': 'text/html' });
          response.write('File Not Found and Error :' + error);
          response.end();
        });
      break;
    case '/style.css':
      readFile(path.join(__dirname, '../public/style.css'))
        .then((content) => {
          response.writeHead(200, { 'content-type': 'text/css' });
          response.write(content);
          response.end();
        })
        .catch((error) => {
          response.writeHead(404, { 'content-type': 'text/html' });
          response.write('File Not Found and Error :' + error);
          response.end();
        });
      break;

    case '/highestDissmissPlayer.json':
      readFile(
        path.join(__dirname, '../public/output/highestDissmissPlayer.json')
      )
        .then((content) => {
          response.writeHead(200, { 'content-type': 'application/json' });
          response.write(content);
          response.end();
        })
        .catch((error) => {
          response.writeHead(404, { 'content-type': 'application/json' });
          response.write('File Not Found and Error :' + error);
          response.end();
        });
      break;

    case '/strikeRateOfBatsman.json':
      readFile(
        path.join(__dirname, '../public/output/outputstrikeRateOfBatsman.json')
      )
        .then((content) => {
          response.writeHead(200, { 'content-type': 'application/json' });
          response.write(content);
          response.end();
        })
        .catch((error) => {
          response.writeHead(404, { 'content-type': 'application/json' });
          response.write('File Not Found and Error :' + error);
          response.end();
        });
      break;

    case '/playerOfTheMatch.json':
      readFile(path.join(__dirname, '../public/output/playerOfTheMatch.json'))
        .then((content) => {
          response.writeHead(200, { 'content-type': 'application/json' });
          response.write(content);
          response.end();
        })
        .catch((error) => {
          response.writeHead(404, { 'content-type': 'application/json' });
          response.write('File Not Found and Error :' + error);
          response.end();
        });
      break;

    case '/superOverEconomies.json':
      readFile(path.join(__dirname, '../public/output/superOverEconomies.json'))
        .then((content) => {
          response.writeHead(200, { 'content-type': 'application/json' });
          response.write(content);
          response.end();
        })
        .catch((error) => {
          response.writeHead(404, { 'content-type': 'application/json' });
          response.write('File Not Found and Error :' + error);
          response.end();
        });
      break;

    case '/teamWonMatchAndToss.json':
      readFile(
        path.join(__dirname, '../public/output/teamWonMatchAndToss.json')
      )
        .then((content) => {
          response.writeHead(200, { 'content-type': 'application/json' });
          response.write(content);
          response.end();
        })
        .catch((error) => {
          response.writeHead(404, { 'content-type': 'application/json' });
          response.write('File Not Found and Error :' + error);
          response.end();
        });
      break;

    default:
      readFile(path.join(__dirname, '../public/error.html')).then((content) => {
        response.writeHead(200, { 'content-type': 'text/html' });
        response.write(content);
        response.end();
      });
  }
});

server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
