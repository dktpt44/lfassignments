class Game {
  constructor() {
    this.mapContainer = document.getElementsByClassName('map-container')[0];
    this.pathContainer = document.getElementsByClassName('path-container')[0];
    this.oneRunLength;
    this.gameSpeed = 0.6;
    this.map = [];
    this.bottomPosition = [0, 59, 103, 134, 156, 173, 184, 192];
    this.bottomDecreaser=[];
    this.leftPosition = [0, 67, 115, 150, 176, 193, 203, 210];
    this.widths = [500, 362, 262, 190, 137, 103, 82, 67];
    this.widthIncreaser=[];
    this.heights = [60, 45, 32, 23, 18, 12, 9, 6];
    this.heightIncreaser=[];
    this.timeframe;
    this.gameInterval;
    this.start();
  }
  start = function () {
    this.timeframe = 600 / this.gameSpeed;   //time taken in millis
    var ix;
    while (this.map.length < 8) {
      var indx = this.map.length;
      var newMapE = new Map(this.pathContainer, this.bottomPosition[indx],
        this.leftPosition[indx], this.widths[indx], this.heights[indx]);
      this.map.push(newMapE);
    }
    for(ix=0;ix<7;ix++){
      this.widthIncreaser.push((this.widths[ix]- this.widths[ix + 1]) * 10 / this.timeframe);
      this.heightIncreaser.push((this.heights[ix] - this.heights[ix + 1]) * 10/ this.timeframe);
      this.bottomDecreaser.push((this.bottomPosition[ix + 1] - this.bottomPosition[ix]) * 10 / this.timeframe);
    }
    this.gameInterval = setInterval(this.startGame.bind(this), 10);
  }
  startGame = function () {
    while (this.map.length < 8) {
      var indx = this.map.length;
      var newMapE = new Map(this.pathContainer, this.bottomPosition[indx],
        this.leftPosition[indx], this.widths[indx], this.heights[indx]);
      this.map.push(newMapE);
    }
    var mapIndex;
    for (mapIndex = 0; mapIndex < this.map.length; mapIndex++) {
      var currentMap = this.map[mapIndex];
      if (currentMap.botPos < -60) {
        currentMap.removeMap();
        this.map.splice(mapIndex, 1);
      }
      var newWidth = currentMap.getW;
      var newHeight = currentMap.getH;
      var newLeft = currentMap.leftPos;
      var newBot = currentMap.botPos;
      if (mapIndex == 0) {
        // console.log(timeTaken);
        newWidth += 1760 / this.timeframe;
        newLeft -= 880 / this.timeframe;
        newBot -= this.gameSpeed;
      } else {
        var widIncr = this.widthIncreaser[mapIndex-1];
        newWidth += widIncr;
        newLeft -= widIncr / 2;
        newHeight += this.heightIncreaser[mapIndex-1];
        newBot -= this.bottomDecreaser[mapIndex-1];
      }
      currentMap.setMapAttrs(newWidth, newHeight, newLeft, newBot);
      currentMap.moveMap();
    }
  }

  renderMap = function () {

  }
}
var myGame = new Game();