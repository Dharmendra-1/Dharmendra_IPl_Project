const plotPlayerOfTheMatch = async () => {
  let response = await fetch('http://localhost:4000/playerOfTheMatch.json');
  let playerOfTheMatchData = await response.json();

  let year = Object.keys(playerOfTheMatchData);
  let seriesData = year.reduce((series, year) => {
    let player = Object.keys(playerOfTheMatchData[year]);
    let playerWithYear = player + ' in ' + year;
    let value = playerOfTheMatchData[year][player];
    series.push([playerWithYear, value]);
    return series;
  }, []);

  Highcharts.chart('containerFirst', {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Player Of The Match Each Season',
    },
    subtitle: {
      text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">IPL</a>',
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '15px   ',
          fontFamily: 'Verdana, sans-serif',
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'PLAYER OF THE MATCH',
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: 'PLAYER OF THE MATCH',
    },
    series: [
      {
        name: 'TOP PLAYER',
        data: seriesData,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y:.1f}',
          y: 2,
          style: {
            fontSize: '2em',
            fontFamily: 'Verdana, sans-serif',
          },
        },
      },
    ],
  });
};

const plotTeamWOnMatchAndToss = async () => {
  let response = await fetch('http://localhost:4000/teamWonMatchAndToss.json');
  let plotingData = await response.json();
  let seriesData = Object.entries(plotingData);

  Highcharts.chart('containerTwo', {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Team Won Match And Toss',
    },
    subtitle: {
      text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">IPL</a>',
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '15px   ',
          fontFamily: 'Verdana, sans-serif',
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Team Won Match And Toss',
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: 'Team Won Match And Toss',
    },
    series: [
      {
        name: 'TEAM',
        data: seriesData,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y:.1f}',
          y: 2,
          style: {
            fontSize: '2em',
            fontFamily: 'Verdana, sans-serif',
          },
        },
      },
    ],
  });
};

const plotSuperOverEconomies = async () => {
  let response = await fetch('http://localhost:4000/superOverEconomies.json');
  let plotingData = await response.json();
  let seriesData = Object.entries(plotingData);

  Highcharts.chart('containerThird', {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Best Economies in Super Over',
    },
    subtitle: {
      text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">IPL</a>',
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '15px   ',
          fontFamily: 'Verdana, sans-serif',
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Best Economies in Super Over',
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: 'Best Economies in Super Over',
    },
    series: [
      {
        name: 'TEAM',
        data: seriesData,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y:.1f}',
          y: 2,
          style: {
            fontSize: '2em',
            fontFamily: 'Verdana, sans-serif',
          },
        },
      },
    ],
  });
};

const plotHighestDissmissPlayer = async () => {
  let response = await fetch(
    'http://localhost:4000/highestDissmissPlayer.json'
  );
  let data = await response.json();
  let plotingData = Object.fromEntries(Object.entries(data).slice(0, 100));
  let batsman = Object.keys(plotingData);
  let seriesData = batsman.reduce((array, player) => {
    let bowlerName = Object.keys(plotingData[player]);
    let bothName = `${player} By ${bowlerName[0]}`;
    let wktTimes = plotingData[player][bowlerName];

    array.push({ name: bothName, data: [wktTimes] });
    return array;
  }, []);

  Highcharts.chart('dissmissPlayer', {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Highest Dissmiss Player By Other Player',
    },
    subtitle: {
      text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">IPL</a>',
    },
    xAxis: {
      title: {
        text: 'Highest Dissmiss Player By Other Player',
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: '',
        align: 'high',
      },
      labels: {
        overflow: 'justify',
      },
    },
    tooltip: {
      valueSuffix: ' Times',
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: -80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: seriesData,
  });
};

const plotStrikeRateOfBatsman = async () => {
  let response = await fetch('http://localhost:4000/strikeRateOfBatsman.json');
  let plotingData = await response.json();
  let year = Object.keys(plotingData);

  let seriesData = year.reduce((array, season) => {
    let infoOfPlayer = Object.entries(plotingData[season]).slice(0, 20).flat();

    let playerName = infoOfPlayer.filter((ele) => typeof ele === 'string');

    let keys = Object.keys(plotingData);
    playerName.forEach((nameOfPlayer) => {
      let plotData = [];
      keys.forEach((yr) => {
        let objOfData = plotingData[yr];
        for (let player in objOfData) {
          if (player === nameOfPlayer) {
            plotData.push(objOfData[nameOfPlayer]);
          }
        }
      });

      plotData = plotData.slice(0, 9);
      array.push({ name: nameOfPlayer, data: plotData });
    });

    return array;
  }, []);

  Highcharts.chart('strikeRates', {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Strike Rate Of Batsman Each Season',
    },
    subtitle: {
      text: 'Source: IPL',
    },
    xAxis: {
      categories: year,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Strike Rate Of Batsman Each Season',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: seriesData,
  });
};

plotPlayerOfTheMatch();
plotTeamWOnMatchAndToss();
plotSuperOverEconomies();
plotHighestDissmissPlayer();
plotStrikeRateOfBatsman();
