class Game {
  constructor() {
    this.mapContainer = document.getElementsByClassName('map-container')[0];
    this.pathContainer = document.getElementsByClassName('path-container')[0];
    this.warnElement;
    this.scoreElement;
    this.player;
    this.playerIndex = 1;
    this.changeLate = 0;
    this.levelIncreaser=0;
    this.oneRunLength;
    this.gameSpeed = 3;
    this.gameState;
    this.obstaclePos1 = -1;
    this.obstaclePos2 = 3;
    this.followIndex = 1;
    this.map = [];
    this.coin=[];
    this.warningHolder = 0;
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
    this.player.lane = 'center';
    this.gameState = 'running';
    this.warnElement = document.createElement('p');
    this.warnElement.classList.add('warning-message');
    this.mapContainer.appendChild(this.warnElement);
    this.scoreElement = document.createElement('p');
    this.scoreElement.classList.add('warning-message');
    this.mapContainer.appendChild(this.scoreElement);
    this.showWarning('warn');
    document.addEventListener('keydown', this.keyInp.bind(this));
    document.addEventListener('keyup', this.keyInpSec.bind(this));

    //generating short paths in the beginning without any obstacles
    while (this.map.length < 9) {
      var indx = this.map.length;
      var newMapE = new Map(this.pathContainer, this.bottomPosition[indx],
        this.leftPosition[indx], this.widths[indx], this.heights[indx], false, 'none');
      this.map.push(newMapE);
    }
    this.increaseGameSpeed();
    this.gameInterval = setInterval(this.startGame.bind(this), 10);
  }

  startGame = function () {
    //adding paths
    while (this.map.length < 11) {
      var indx = this.map.length;
      var obs = false;
      var obsTyp = 'none';
      var that = this;
      if (this.obstaclePos2 == -1) {
        this.obstaclePos2 = indx;
        dothis();
      }
      if (this.obstaclePos1 == -1) {
        this.obstaclePos1 = indx;
        dothis();
      }

      function dothis() {
        var rndNum = that.getRandomNum(1, 4);
        if (rndNum == 1) {
          obs = true;
          obsTyp = 'full';
        } else if (rndNum == 2) {
          obs = true;
          obsTyp = 'left';
        } else if (rndNum == 3) {
          obs = true;
          obsTyp = 'right';
        }
      }
      var newMapE = new Map(this.pathContainer, this.bottomPosition[indx],
        this.leftPosition[indx], this.widths[indx], this.heights[indx], obs, obsTyp);
      this.map.push(newMapE);
    }
    if (this.gameSpeed < 4.75) {
      this.levelIncreaser++;
      if(this.levelIncreaser>500){
        this.levelIncreaser=0;
        this.gameSpeed += 0.25;
        this.increaseGameSpeed();
      }
    }
    if (this.followIndex > 0) {
      this.warningHolder++;
      if (this.warningHolder > 1000) {
        this.showWarning('hide');
        this.followIndex = 0;
        this.warningHolder = 0;
      }
    }
    //animating player
    if (!this.player.isInAir) {
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
        this.obstaclePos1--;
        this.obstaclePos2--;
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

      //collision detection
      if (currentMap.isObstacle && !this.player.isInAir) {
        //check collision
        if (this.player.botPos + 18 > currentMap.botPos && this.player.botPos < currentMap.botPos + currentMap.getH - 10) {
          if (currentMap.getObstacleType == 'left' && this.player.lane != 'right' ||
            currentMap.getObstacleType == 'right' && this.player.lane != 'left') {
            if (!currentMap.isThisChecked) {
              this.followIndex++;
              currentMap.isThisChecked = true;
            }
            if (this.followIndex == 2) {
              this.gameState = 'over';
              this.showWarning('died');
              clearInterval(this.gameInterval);
            } else {
              this.showWarning('warn');
            }
          } else if (currentMap.getObstacleType == 'full') {
            clearInterval(this.gameInterval);
            this.gameState = 'over';
            this.showWarning('died');
          }
        }
      }
      if (this.gameState == 'over') {
        this.player.changeImg('images/run/5.png')
      }
    }
  }
  increaseGameSpeed = function () {
    //time taken in millis
    this.timeframe = 600 / this.gameSpeed;
    var ix;
    //clearing arrays
    this.widthIncreaser = [];
    this.heightIncreaser=[];
    this.bottomDecreaser=[];
    for (ix = 0; ix < 10; ix++) {
      this.widthIncreaser.push((this.widths[ix] - this.widths[ix + 1]) * 10 / this.timeframe);
      this.heightIncreaser.push((this.heights[ix] - this.heights[ix + 1]) * 10 / this.timeframe);
      this.bottomDecreaser.push((this.bottomPosition[ix + 1] - this.bottomPosition[ix]) * 10 / this.timeframe);
    }
  }
  keyInp = function () {
    if (this.gameState != 'running') {
      return;
    }
    var pressedKey = event.keyCode;
    if (pressedKey == 38 && !this.player.isInAir) {
      this.player.isInAir = true;
      this.player.jumpInAir();
    } else if (pressedKey == 37 && !this.player.isMovingLR && this.player.lane == 'center') {
      this.player.isMovingLR = true;
      this.player.moveLeft();
    } else if (pressedKey == 39 && !this.player.isMovingLR && this.player.lane == 'center') {
      this.player.isMovingLR = true;
      this.player.moveRight();
    } else {
      return;
    }
  }
  keyInpSec = function () {
    if (this.gameState != 'running') {
      return;
    }
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

  getRandomNum = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  showWarning = function (whatToDo) {
    var warnText;
    if (whatToDo == 'warn') {
      warnText = "You have been followed by a monster."
    } else if (whatToDo == 'died') {
      warnText = "You died."
    } else if (whatToDo == 'hide') {
      warnText = '';
    }
    this.warnElement.innerHTML = warnText;
  }

}
var myGame = new Game();