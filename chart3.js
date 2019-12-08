// Themes begin
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);
// Themes end

/**
 * Chart design taken from Samsung health app
 */

var chart = am4core.create("chartdiv3", am4charts.XYChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.paddingRight = 40;

chart.data = [{
    "name": "Rockets",
    "steps": 246.0,
    "href": "assets/rockets_logo.png"
}, {
    "name": "Celtics",
    "steps": 296.5,
    "href": "assets/celtics_logo.png"
}, {
    "name": "76ers",
    "steps": 316.9,
    "href": "assets/76ers_logo.png"
}, {
    "name": "Warriors",
    "steps": 320.1,
    "href": "assets/gs_logo.png"
}];

// subtitle
var subtitle = chart.titles.create();
subtitle.text = "2018-2019 NBA Finalists Passes Per Game";
subtitle.fontSize = 30;
subtitle.marginBottom = 25;
// Add title
var title = chart.titles.create();
title.text = "Warriors Outpass Opponents";
title.fontSize = 45;
title.marginBottom = 20;


// Create axes
var valueAxisX = chart.xAxes.push(new am4charts.ValueAxis());
valueAxisX.title.text = 'Total Passes Per Team';
valueAxisX.title.marginTop = 20;
valueAxisX.title.fontSize = 25;
valueAxisX.min = 0;
valueAxisX.max = 325;
valueAxisX.renderer.minGridDistance = 50;
valueAxisX.fontSize = 20;
valueAxisX.marginBottom = 20;

var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "name";
categoryAxis.renderer.grid.template.strokeOpacity = 0;
categoryAxis.renderer.minGridDistance = 10;
categoryAxis.renderer.labels.template.dx = -40;
categoryAxis.renderer.minWidth = 120;
categoryAxis.renderer.tooltip.dx = -40;

var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.inside = true;
valueAxis.renderer.labels.template.fillOpacity = 0.3;
valueAxis.renderer.grid.template.strokeOpacity = 0;
valueAxis.min = 0;
valueAxis.cursorTooltipEnabled = false;
valueAxis.renderer.baseGrid.strokeOpacity = 0;
valueAxis.renderer.labels.template.dy = 20;

var series = chart.series.push(new am4charts.ColumnSeries);
series.dataFields.valueX = "steps";
series.dataFields.categoryY = "name";
series.tooltipText = "{valueX.value}";
series.tooltip.pointerOrientation = "vertical";
series.tooltip.dy = - 30;
series.columnsContainer.zIndex = 100;

var columnTemplate = series.columns.template;
columnTemplate.height = am4core.percent(50);
columnTemplate.maxHeight = 50;
columnTemplate.column.cornerRadius(60, 10, 60, 10);
columnTemplate.strokeOpacity = 0;

series.heatRules.push({ target: columnTemplate, property: "fill", 
dataField: "valueX", min: am4core.color("#fff"), max: am4core.color("#FFC72C") });
series.mainContainer.mask = undefined;

var cursor = new am4charts.XYCursor();
chart.cursor = cursor;
cursor.lineX.disabled = true;
cursor.lineY.disabled = true;
cursor.behavior = "none";

var bullet = columnTemplate.createChild(am4charts.CircleBullet);
bullet.circle.radius = 30;
bullet.valign = "middle";
bullet.align = "left";
bullet.isMeasured = true;
bullet.interactionsEnabled = false;
bullet.horizontalCenter = "right";
bullet.interactionsEnabled = false;

var hoverState = bullet.states.create("hover");
var outlineCircle = bullet.createChild(am4core.Circle);
outlineCircle.adapter.add("radius", function (radius, target) {
    var circleBullet = target.parent;
    return circleBullet.circle.pixelRadius + 10;
})

var image = bullet.createChild(am4core.Image);
image.width = 150;//60;
image.height = 150;
image.horizontalCenter = "middle";
image.verticalCenter = "middle";
image.propertyFields.href = "href";

image.adapter.add("mask", function (mask, target) {
    var circleBullet = target.parent;
    return circleBullet.circle;
})

var previousBullet;
chart.cursor.events.on("cursorpositionchanged", function (event) {
    var dataItem = series.tooltipDataItem;

    if (dataItem.column) {
        var bullet = dataItem.column.children.getIndex(1);

        if (previousBullet && previousBullet != bullet) {
            previousBullet.isHover = false;
        }

        if (previousBullet != bullet) {

            var hs = bullet.states.getKey("hover");
            hs.properties.dx = dataItem.column.pixelWidth;
            bullet.isHover = true;

            previousBullet = bullet;
        }
    }
})