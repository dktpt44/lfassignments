class Game {
  constructor() {
    this.mapContainer = document.getElementsByClassName('map-container')[0];
    this.pathContainer = document.getElementsByClassName('path-container')[0];
    this.player;
    this.playerIndex = 1;
    this.changeLate = 0;
    this.oneRunLength;
    this.gameSpeed = 3;
    this.obstaclePos = -1;
    this.map = [];
    this.bottomPosition = [-120, 0, 94, 168, 222, 261, 292, 316, 335, 351, 365];
    this.heights = [120, 95, 75, 55, 40, 32, 25, 20, 14, 11, 8];
    this.leftPosition = [-89, 0, 70, 125, 168, 201, 228, 248, 264, 276.2, 287];
    this.widths = [830, 650, 510, 399, 313, 246, 192.5, 152.5, 120.5, 95.3, 74];
    this.bottomDecreaser = [];
    this.widthIncreaser = [];
    this.heightIncreaser = [];
    this.timeframe;
    this.gameInterval;
    this.start();
  }

  start = function () {
    this.player = new Player(this.mapContainer);
    this.player.changeImg('images/run/' + this.playerIndex + '.png');
    this.player.isInAir = false;
    this.player.isMovingLR = false;
    this.player.lane='center';
    document.addEventListener('keydown', this.keyInp.bind(this));
    document.addEventListener('keyup', this.keyInpSec.bind(this));
    //time taken in millis
    this.timeframe = 600 / this.gameSpeed;   
    var ix;
    //generating short paths in the beginning without any obstacles
    while (this.map.length < 7) {
      var indx = this.map.length;
      var newMapE = new Map(this.pathContainer, this.bottomPosition[indx],
        this.leftPosition[indx], this.widths[indx], this.heights[indx], false,'none');
      this.map.push(newMapE);
    }
    for (ix = 0; ix < 10; ix++) {
      this.widthIncreaser.push((this.widths[ix] - this.widths[ix + 1]) * 10 / this.timeframe);
      this.heightIncreaser.push((this.heights[ix] - this.heights[ix + 1]) * 10 / this.timeframe);
      this.bottomDecreaser.push((this.bottomPosition[ix + 1] - this.bottomPosition[ix]) * 10 / this.timeframe);
    }
    this.gameInterval = setInterval(this.startGame.bind(this), 10);
  }
  startGame = function () {
    while (this.map.length < 11) {
      var indx = this.map.length;
      var obs = false;
      var obsTyp = 'none';
      if (this.obstaclePos == -1) {
        var rndNum = this.getRandomNum(1, 3);
        obs = true;
        this.obstaclePos = indx;
        if (rndNum == 1) {
          obsTyp='full';
        } else if(rndNum==2){
          obsTyp='left';
        } else if (rndNum ==3){
          obsTyp='right';
        }
      }
      var newMapE = new Map(this.pathContainer, this.bottomPosition[indx],
        this.leftPosition[indx], this.widths[indx], this.heights[indx], obs,obsTyp);
      this.map.push(newMapE);
    }
    //animating player
    if(!this.player.isInAir){
      this.changeLate++;
      if (this.changeLate % 5 == 0) {
        this.changeLate = 0;
        if (this.playerIndex == 12) {
          this.playerIndex = 0;
        }
        this.playerIndex++;
        this.player.changeImg('images/run/' + this.playerIndex + '.png');
      }
    }
    //moving map
    var mapIndex;
    for (mapIndex = 0; mapIndex < this.map.length; mapIndex++) {
      var currentMap = this.map[mapIndex];
      if (currentMap.botPos < -120) {
        this.obstaclePos--;
        if(this.obstaclePos<0){
          this.obstaclePos=-1;
        }
        currentMap.removeMap();
        this.map.splice(mapIndex, 1);
      }
      var newWidth = currentMap.getW;
      var newHeight = currentMap.getH;
      var newLeft = currentMap.leftPos;
      var newBot = currentMap.botPos;

      var widIncr = this.widthIncreaser[mapIndex - 1];
      newWidth += widIncr;
      newLeft -= widIncr / 2;
      newHeight += this.heightIncreaser[mapIndex - 1];
      newBot -= this.bottomDecreaser[mapIndex - 1];

      currentMap.setMapAttrs(newWidth, newHeight, newLeft, newBot);
      currentMap.moveMap();
    }
  }

  keyInp = function () {
    if (this.player.isInAir || this.player.isMovingLR || this.player.lane!='center') {
      return;
    }
    var pressedKey = event.keyCode;
    if (pressedKey == 38) {
      this.player.isInAir = true;
      this.player.jumpInAir();
    } else if (pressedKey == 37) {
      this.player.isMovingLR = true;
      this.player.moveLeft();
    } else if (pressedKey == 39) {
      this.player.isMovingLR = true;
      this.player.moveRight();
    } else {
      return;
    }
  }
  keyInpSec = function () {
    var pressedKey = event.keyCode;
    if (pressedKey == 37) {
      this.player.isMovingLR = true;
      this.player.moveRightGravity();
    } else if (pressedKey == 39) {
      this.player.isMovingLR = true;
      this.player.moveLeftGravity();
    } else {
      return;
    }
  }

  renderMap = function () {

  }
  getRandomNum = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
var myGame = new Game();