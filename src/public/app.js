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
    plotOptions: {
      column: {
        colorByPoint: true,
      },
    },
    colors: [
      '#FFA500',
      '#00FFFF',
      '#800080',
      '#FFFF00',
      '#008000',
      '#FF00FF',
      '#00FF00',
      '#808000',
      '#A52A2A',
      '#00008B',
    ],
    title: {
      text: 'Player Of The Match Each Season',
      style: {
        fontSize: '3em',
        color: '#00000',
      },
    },
    subtitle: {
      text: 'Source: <a href="https://www.kaggle.com/patrickb1912/ipl-complete-dataset-20082020">IPL</a>',
      style: {
        fontSize: '1em',
      },
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '2em',
          color: '#000000',
          fontFamily: 'Verdana, sans-serif',
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'PLAYER OF THE MATCH',
        style: {
          fontSize: '1.5em',
          color: '#000000',
        },
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: 'PLAYER OF THE MATCH',
      style: {
        fontSize: '1.5em',
        width: '300px',
      },
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
    plotOptions: {
      column: {
        colorByPoint: true,
      },
    },
    colors: ['#00008B', '#800080', '#008000', '#FFFF00', '#800000'],
    title: {
      text: 'Team Won Match And Toss',
      style: {
        fontSize: '3em',
        color: '#00000',
      },
    },
    subtitle: {
      text: 'Source: <a href="https://www.kaggle.com/patrickb1912/ipl-complete-dataset-20082020">IPL</a>',
      style: {
        fontSize: '1em',
      },
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '2em',
          color: '#000000',
          fontFamily: 'Verdana, sans-serif',
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Team Won Match And Toss',
        style: {
          fontSize: '1.5em',
          color: '#000000',
        },
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: 'Team Won Match And Toss',
      style: {
        fontSize: '1.5em',
        width: '300px',
      },
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
    plotOptions: {
      column: {
        colorByPoint: true,
      },
    },
    colors: ['#FFA500', '#800000', '#FF00FF', '#0000FF', '#008000'],
    title: {
      text: 'Best Economies in Super Over',
      style: {
        fontSize: '3em',
        color: '#00000',
      },
    },
    subtitle: {
      text: 'Source: <a href="https://www.kaggle.com/patrickb1912/ipl-complete-dataset-20082020">IPL</a>',
      style: {
        fontSize: '1em',
      },
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '2em',
          color: '#000000',
          fontFamily: 'Verdana, sans-serif',
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Best Economies in Super Over',
        style: {
          fontSize: '1.5em',
          color: '#000000',
        },
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: 'Best Economies in Super Over',
      style: {
        fontSize: '1.5em',
        width: '300px',
      },
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
    let bowlerData = Object.entries(plotingData[player]).flat();
    let playerInfo = `${player} Out BY ${bowlerData[0]}`;
    array.push([playerInfo, bowlerData[1]]);
    return array;
  }, []);

  Highcharts.chart('dissmissPlayer', {
    chart: {
      type: 'column',
    },
    plotOptions: {
      column: {
        colorByPoint: true,
      },
    },
    colors: [
      '#ff0000',
      '#00ff00',
      '#0000ff',
      '#FFA500',
      '#800000',
      '#FF00FF',
      '#0000FF',
      '#008000',
      '#00FFFF',
      '#800080',
      '#FFA500',
      '#A52A2A',
    ],
    title: {
      text: 'Highest Dissmiss Batsman By Bowler',
      style: {
        fontSize: '3em',
        color: '#00000',
      },
    },
    subtitle: {
      text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">IPL</a>',
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '1.5em',
          color: '#000000',
          fontFamily: 'Verdana, sans-serif',
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Highest Dissmiss Batsman By Bowler',
        style: {
          fontSize: '1.5em',
          color: '#000000',
        },
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: 'Dissmiss Player',
      style: {
        fontSize: '1.5em',
        width: '300px',
      },
    },
    series: [
      {
        name: 'Dissmiss Player',
        data: seriesData,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y:.1f}',
          y: 2,
          style: {
            fontSize: '1.5em',
            fontFamily: 'Verdana, sans-serif',
          },
        },
      },
    ],
  });
};

const plotStrikeRateOfBatsman = async () => {
  let response = await fetch('http://localhost:4000/strikeRateOfBatsman.json');
  let plotingData = await response.json();
  let year = Object.keys(plotingData);
  let seriesData = year.reduce((array, season) => {
    let data = Object.entries(plotingData[season]).slice(0, 1).flat();
    let name = `${data[0]} in ${season}`;
    let strikeRate = data[1];
    array.push([name, strikeRate]);
    return array;
  }, []);

  Highcharts.chart('strikeRates', {
    chart: {
      type: 'column',
    },
    plotOptions: {
      column: {
        colorByPoint: true,
      },
    },
    colors: ['#00FFFF', '#800080', '#FFA500', '#A52A2A'],
    title: {
      text: 'TOP BATSMAN STRIKE RATE OF EACH SEASON',
      style: {
        fontSize: '3em',
        color: '#00000',
      },
    },
    subtitle: {
      text: 'Source: <a href="https://www.kaggle.com/patrickb1912/ipl-complete-dataset-20082020">IPL</a>',
      style: {
        fontSize: '1em',
      },
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '2em',
          color: '#000000',
          fontFamily: 'Verdana, sans-serif',
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'TOP BATSMAN STRIKE RATE OF EACH SEASON',
        style: {
          fontSize: '1.5em',
          color: '#000000',
        },
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: 'STRIKE RATE',
      style: {
        fontSize: '1.5em',
        width: '300px',
      },
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

plotPlayerOfTheMatch();
plotTeamWOnMatchAndToss();
plotSuperOverEconomies();
plotHighestDissmissPlayer();
plotStrikeRateOfBatsman();
