class Game {
  constructor() {
    this.mapContainer = document.getElementsByClassName('map-container')[0];
    this.pathContainer = document.getElementsByClassName('path-container')[0];
    this.warnElement;
    this.scoreElement;
    this.coinElement;
    this.soundElem;
    this.highScore;
    this.gameScore = 0;
    this.coins = 0;
    this.newCoinLane = 1;
    this.totalCoins;
    this.showCoins = false;
    this.coinStoreKey = 'GAMETOTALCOINS';
    this.storageKey = 'GAMEHIGHSCORE';
    this.player;
    this.playerIndex = 1;
    this.changeLate = 0;
    this.levelIncreaser = 0;
    this.oneRunLength;
    this.gameSpeed = 3;
    this.gameState;
    this.obstaclePos1 = -1;
    this.obstaclePos2 = 3;
    this.followIndex = 1;
    this.map = [];
    this.coin = [];
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
    this.mapContainer.style.backgroundImage = 'url(images/back.jpg)';
    this.showGameScreen();
  }

  showGameScreen = function () {
    this.mapContainer.style.backgroundImage = 'url(images/front.png)';
    var playButton = document.createElement('img');
    playButton.setAttribute('src', 'images/playbutton.png');
    playButton.classList.add('play-button');
    this.mapContainer.appendChild(playButton);
    this.highScore = window.localStorage.getItem(this.storageKey);
    if (this.highScore == null || this.highScore == undefined) {
      this.highScore = 0;
    }
    var temp = window.localStorage.getItem(this.coinStoreKey);
    if (temp == null || temp == undefined) {
      temp = 0;
    }
    this.totalCoins = parseInt(temp);
    this.gameState = 'ready';
    this.soundElem = document.createElement("audio");
    this.soundElem.setAttribute("preload", "auto");
    this.soundElem.setAttribute("controls", "none");
    this.soundElem.style.display = "none";
    document.body.appendChild(this.soundElem);
    var showCoins = document.createElement('span');
    showCoins.classList.add('totalcoinstxt');
    showCoins.innerHTML = 'Coins: ' + this.totalCoins;
    this.mapContainer.appendChild(showCoins)
    var showHigh = document.createElement('span');
    showHigh.classList.add('highscoretxt');
    showHigh.innerHTML = 'Highest: ' + this.highScore;
    this.mapContainer.appendChild(showHigh);
    playButton.addEventListener('click', function () {
      this.playSound('click');
      this.mapContainer.style.backgroundImage = 'url(images/back.jpg)';
      this.mapContainer.removeChild(playButton);
      this.mapContainer.removeChild(showHigh);
      this.mapContainer.removeChild(showCoins);
      this.start();
    }.bind(this));
  }

  start = function () {
    this.player = new Player(this.mapContainer);
    this.player.isInAir = false;
    this.player.isMovingLR = false;
    this.player.lane = 'center';
    this.gameState = 'running';
    this.scoreElement = document.createElement('span');
    this.scoreElement.classList.add('scoretxt');
    this.scoreElement.innerHTML = this.gameScore;
    this.coinElement = document.createElement('span');
    this.coinElement.classList.add('cointxt');
    this.coinElement.innerHTML = this.coins;
    this.warnElement = document.createElement('p');
    this.warnElement.classList.add('warning-message');
    this.mapContainer.appendChild(this.warnElement);
    this.mapContainer.appendChild(this.scoreElement);
    this.mapContainer.appendChild(this.coinElement);
    this.showWarning('warn');
    document.addEventListener('keydown', this.keyInp.bind(this));
    document.addEventListener('keyup', this.keyInpSec.bind(this));
    //generating short paths in the beginning without any obstacles
    while (this.map.length < 8) {
      var indx = this.map.length;
      var newMapE = new Map(this.pathContainer, this.bottomPosition[indx],
        this.leftPosition[indx], this.widths[indx], this.heights[indx], false, 'none');
      this.map.push(newMapE);
    }
    //generates increment values
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
      //adding coins 
      if (obsTyp == 'none') {
        if (this.showCoins) {
          var newCoin = new Coin(this.pathContainer, this.newCoinLane);
          this.coin.push(newCoin);
        }
      } else {
        if (this.getRandomNum(1, 3) == 2) {
          this.showCoins = true;
        } else {
          this.showCoins = false;
        }
        this.newCoinLane = this.getRandomNum(1, 3);
      }
    }
    if (this.gameSpeed < 4.75) {
      this.levelIncreaser++;
      if (this.levelIncreaser > 500) {
        this.levelIncreaser = 0;
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
        if (this.playerIndex == 11) {
          this.playerIndex = 0;
        }
        this.playerIndex++;
        this.player.changeImg(this.playerIndex);
      }
    }
    //moving map
    var mapIndex;
    for (mapIndex = 0; mapIndex < this.map.length; mapIndex++) {
      var currentMap = this.map[mapIndex];
      var currentCoin = this.coin[mapIndex];
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
      //coin handling
      if (currentCoin != null || currentCoin != undefined) {
        var coinIndex = 0;
        if (currentCoin.botPos < -70) {
          currentCoin.removeCoin();
          this.coin.splice(mapIndex, 1);
        }
        //identifying the position of coin
        for (var xx = 0; xx < this.bottomPosition.length; xx++) {
          if (currentCoin.botPos <= this.bottomPosition[xx]) {
            coinIndex = xx;
            break;
          }
        }
        //animating coin
        if (this.changeLate % 5 == 0) {
          currentCoin.changeImg();
        }
        currentCoin.changePos(this.bottomDecreaser[coinIndex - 1], this.widthIncreaser[coinIndex - 1] / 10);
        //collision detection with coin
        if (!this.player.isInAir) {
          if (this.player.botPos + 18 > currentCoin.botPos && this.player.botPos < currentCoin.botPos + currentCoin.coinWH
            && this.player.leftPos < currentCoin.leftPos + currentCoin.coinWH && this.player.leftPos + this.player.playerWid > currentCoin.leftPos) {
            this.playSound('coin');
            currentCoin.collectCoin();
            this.coin.splice(mapIndex, 1);
            this.coins++;
            this.coinElement.innerHTML = this.coins;
          }
        }
      }
      //player obstacle collision detection
      if (currentMap.isObstacle && !this.player.isInAir) {
        //check collision
        if (this.player.botPos + 18 > currentMap.botPos && this.player.botPos < currentMap.botPos + currentMap.getH - 15) {
          if (currentMap.getObstacleType == 'left' && this.player.lane != 'right' ||
            currentMap.getObstacleType == 'right' && this.player.lane != 'left') {
            if (!(this.player.lane == 'center' && this.player.botPos > currentMap.botPos + currentMap.getH - 40)) {
              if (!currentMap.isThisChecked) {
                this.playSound('enemy');
                this.followIndex++;
                currentMap.isThisChecked = true;
              }
              if (this.followIndex == 2) {
                this.gameState = 'stopped';
                this.showWarning('died1');
                clearInterval(this.gameInterval);
              } else {
                this.showWarning('warn');
              }
            }
          } else if (currentMap.getObstacleType == 'full') {
            this.gameState = 'stopped';
            this.playSound('fall');
            this.showWarning('died2');
            clearInterval(this.gameInterval);
            this.player.playerFall();
          }
          if (this.gameState == 'stopped') {
            this.showRestartDialog();
          }
        }
      }
    }
    //increasing score
    if (this.player.isInAir) {
      this.changeLate++
    }
    if (this.changeLate % 5 == 0) {
      this.gameScore += Math.round(this.gameSpeed * 2);
      this.scoreElement.innerHTML = this.gameScore;
    }
  }

  showRestartDialog = function () {
    var restartD = document.createElement('div');
    restartD.classList.add('restart-diag');
    this.mapContainer.appendChild(restartD);
    var headText = document.createElement('span');
    headText.classList.add('diag-head');
    restartD.appendChild(headText);
    //when save me cannot be used
    if (this.totalCoins < 15 && this.coins < 15) {
      var txtVal = "Minimum 15 coins required to save you.";
      headText.innerHTML = txtVal;
      var butOk = document.createElement('button');
      butOk.classList.add('diag-button');
      butOk.style.marginLeft = '140px';
      restartD.appendChild(butOk);
      butOk.innerHTML = 'Exit';
      butOk.addEventListener('click', function () {
        this.playSound('click');
        this.mapContainer.removeChild(restartD);
        this.gameState = 'over';
        this.restartGame();
      }.bind(this));
    } else {
      //when save me can be used
      var txtVal = "Save yourself for 15 coins?";
      headText.innerHTML = txtVal;
      var butOk = document.createElement('button');
      butOk.classList.add('diag-button');
      restartD.appendChild(butOk);
      butOk.innerHTML = 'YES';
      butOk.style.marginLeft = '110px';
      butOk.addEventListener('click', function () {
        this.playSound('revive');
        if (this.totalCoins > 15) {
          this.totalCoins -= 15;
          window.localStorage.setItem(this.coinStoreKey, this.totalCoins);
        } else {
          this.coins -= 15;
        }
        this.mapContainer.removeChild(restartD);
        this.gameState = 'running';
        this.followIndex = 1;
        this.restartGame();
        this.start();
      }.bind(this));
      var butNo = document.createElement('button');
      butNo.classList.add('diag-button');
      restartD.appendChild(butNo);
      butNo.innerHTML = 'NO';
      butNo.addEventListener('click', function () {
        this.playSound('click');
        this.mapContainer.removeChild(restartD);
        this.gameState = 'over';
        this.restartGame();
      }.bind(this));
    }
  }

  restartGame = function () {
    var loopIndx = this.map.length;
    for (var i = 0; i < loopIndx; i++) {
      this.map[i].removeMap();
    }
    loopIndx = this.coin.length;
    for (var i = 0; i < loopIndx; i++) {
      this.coin[i].removeCoin();
    }
    this.map = [];
    this.coin = [];
    this.player.removePlayer();
    this.mapContainer.removeChild(this.warnElement);
    this.mapContainer.removeChild(this.scoreElement);
    this.mapContainer.removeChild(this.coinElement);
    if (this.gameState == 'over') {
      if (this.gameScore > this.highScore) {
        this.highScore = this.gameScore;
        window.localStorage.setItem(this.storageKey, this.highScore);
      }
      this.totalCoins += this.coins;
      window.localStorage.setItem(this.coinStoreKey, this.totalCoins);
      new Game();
    }
  }

  increaseGameSpeed = function () {
    //time taken in millis
    this.timeframe = 600 / this.gameSpeed;
    var ix;
    //clearing arrays
    this.widthIncreaser = [];
    this.heightIncreaser = [];
    this.bottomDecreaser = [];
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
      this.playSound('jump');
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
      warnText = "Alien is following you."
    } else if (whatToDo == 'died1') {
      warnText = "Alien caught you."
    } else if (whatToDo == 'died2') {
      warnText = "Watch our for alien made holes."
    } else if (whatToDo == 'hide') {
      warnText = '';
    }
    this.warnElement.innerHTML = warnText;
  }

  playSound = function (cases) {
    if (cases == 'click') {
      this.soundElem.src = 'audio/click.wav';
    } else if (cases == 'revive') {
      this.soundElem.src = 'audio/rev.wav';
    } else if (cases == 'jump') {
      this.soundElem.src = 'audio/jump.wav';
    } else if (cases == 'enemy') {
      this.soundElem.src = 'audio/enemy.wav';
    } else if (cases == 'coin') {
      this.soundElem.src = 'audio/coin.wav';
    } else if (cases == 'fall') {
      this.soundElem.src = 'audio/fall.wav';
    }
    this.soundElem.play();
  }
}
var myGame = new Game();
