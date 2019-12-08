// Themes begin
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv4", am4charts.XYChart);

var colorSet = new am4core.ColorSet();
chart.colors.list = [am4core.color("#FFC72C")];

// Add data
chart.data = [
  {
    "year": "2009- 10",
    "ay": 31.7,
    "aValue": 22.4
  }, 
  {
    "year": "2010- 11",
    "ay": 43.9,
    "aValue": 22.5
  },
  {
    "year": "2011- 12",
    "ay": 34.8,
    "aValue": 22.3
  },
  {
    "year": "2012- 13",
    "ay": 57.3,
    "aValue": 22.5
  }, {
  "year": "2013- 14",
  "ay": 62.2,
  "aValue": 23.3
}, {
  "year": "2014- 15",
  "ay": 81.7,
  "aValue": 27.4,
}, {
  "year": "2015- 16",
  "ay": 89.0,
  "aValue": 28.9,
}, {
  "year": "2016- 17",
  "ay": 81.7,
  "aValue": 30.4,
}, {
  "year": "2017- 18",
  "ay": 70.7,
  "aValue": 29.3,

}, {
  "year": "2018- 19",
  "ay": 69.5,
  "aValue": 29.4,
}];

// subtitle
var subtitle = chart.titles.create();
subtitle.text = "Winning Percentage and Assists Per Game Since 2009";
subtitle.fontSize = 30;
subtitle.marginBottom = 25;

// Add title
var title = chart.titles.create();
title.text = "Assists Increase Warriors Wins";
title.fontSize = 45;
title.marginBottom = 20;

// X Axis
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.dataFields.category = "year";
categoryAxis.renderer.minGridDistance = 60;

categoryAxis.title.text = 'NBA Season';
categoryAxis.title.fontSize = 25;
categoryAxis.title.marginTop = 20;

categoryAxis.fontSize = 20;

categoryAxis.marginBottom = 20;
categoryAxis.min = "2010"

// Y axis
var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = 'Winning Percentage (%)';
valueAxis.title.fontSize = 30;
valueAxis.fontSize = 20;
valueAxis.max = 100;

// Create series
var series1 = chart.series.push(new am4charts.LineSeries());
series1.dataFields.categoryX = "year";
series1.dataFields.valueY = "ay";
series1.dataFields.value = "aValue";
series1.strokeOpacity = 0;
series1.strokeWidth = 0;

var bullet1 = series1.bullets.push(new am4charts.CircleBullet());
series1.heatRules.push({
  target: bullet1.circle,
  min: 5,
  max: 20,
  property: "radius"
});

bullet1.tooltipText = "Assists Per Game: [bold]{value}[/]";