startNewGame(0);
function blockCar(parElem, lane) {
  this.parElem = parElem;
  this.lane = lane;
  this.carWidth = 50;
  this.carHeight = 80;
  this.leftX = 0;
  this.topX = 0;
  this.newCar;
  this.init = function () {
    this.newCar = document.createElement('div');
    this.newCar.style.width = this.carWidth + 'px';
    this.newCar.style.height = this.carHeight + 'px';
    this.newCar.style.position = 'absolute';
    this.newCar.style.top = -this.carHeight + 'px';
    this.newCar.style.background = 'url(images/enemyOne.png)';
    if (this.lane == 1) {
      this.leftX = 126;
    } else if (this.lane == 2) {
      this.leftX = 225;
    } else {
      this.leftX = 323;
    }
    this.newCar.style.left = this.leftX + 'px';
    this.parElem.appendChild(this.newCar);
  }
  this.moveDown = function () {
    this.newCar.style.top = this.topX + 'px';
  }
  this.removeCar = function () {
    this.parElem.removeChild(this.newCar);
  }
}
function carGame(cIndex) {
  this.gameContainer;
  this.containerWidth = 500;
  this.containerHeight = 600;
  this.gameWrapper;
  this.wrapperHeight = 1200;
  this.wrapperTop = -600;
  this.blockCar = [];
  this.gameSpeed = 5;
  this.gameScore = 0;
  this.highScore = 0;
  this.myCar;
  this.spdCounter = 0;
  this.gameInterval;
  this.scoreContainer;
  this.hScoreContainer;
  this.cIndex = cIndex;
  this.carDistance = 0;
  var startMov;
  this.init = function () {
    this.gameContainer = document.getElementsByClassName('game-container')[this.cIndex];
    this.scoreContainer = document.getElementsByClassName('current-score')[this.cIndex];
    this.hScoreContainer = document.getElementsByClassName('highest-score')[this.cIndex];
    this.highScore = this.hScoreContainer.innerHTML;
    this.gameWrapper = document.createElement('div');
    this.gameWrapper.style.width = this.containerWidth + 'px';
    this.gameWrapper.style.height = this.wrapperHeight + 'px';
    this.gameWrapper.style.position = 'absolute';
    this.gameWrapper.style.top = this.wrapperTop + 'px';
    this.gameContainer.appendChild(this.gameWrapper);
    for (var i = 0; i < 2; i++) {
      var backImage = document.createElement('img');
      backImage.style.width = this.containerWidth + 'px';
      backImage.style.height = this.containerHeight + 'px';
      backImage.setAttribute('src', 'images/roadLane.jpg');
      backImage.style.objectFit = 'cover';
      backImage.style.display = 'block';
      this.gameWrapper.appendChild(backImage);
    }
    var myCar = document.createElement('div');
    myCar.style.width = '50px';
    myCar.style.height = '80px';
    myCar.style.position = 'absolute';
    myCar.style.top = '510px';
    myCar.style.left = '225px';
    myCar.style.background = 'url(images/myCar.png)';
    this.gameContainer.appendChild(myCar);
    this.myCar = myCar;
    document.onkeydown = this.moveCar.bind(this);
    this.gameInterval = setInterval(this.moveGame.bind(this), 10);
  }
  this.moveCar = function () {
    var arrowKey = event.keyCode;
    var currentLeft = parseInt(this.myCar.style.left);
    var newLeftX;
    if (arrowKey == 37) {
      //left key pressed
      if (currentLeft == 323) {
        newLeftX = 225;
      } else if (currentLeft == 225) {
        newLeftX = 126;
      } else {
        return;
      }
      startMov = setInterval(moveLf.bind(this), 10);
      function moveLf() {
        if (currentLeft < newLeftX) {
          this.myCar.style.left = newLeftX + 'px';
          clearInterval(startMov);
        } else {
          currentLeft -= 13;
          this.myCar.style.left = currentLeft + 'px';
        }
      }
    } else if (arrowKey == 39) {
      if (currentLeft == 126) {
        newLeftX = 225;
      } else if (currentLeft == 225) {
        newLeftX = 323;
      } else {
        return;
      }
      startMov = setInterval(moveLf.bind(this), 10);
      function moveLf() {

        if (currentLeft > newLeftX) {
          this.myCar.style.left = newLeftX + 'px';
          clearInterval(startMov);
        } else {
          currentLeft += 13;
          this.myCar.style.left = currentLeft + 'px';
        }
      }
    }
  }
  this.moveGame = function () {
    if (this.gameSpeed < 10) {
      if (this.spdCounter > 1000) {
        this.spdCounter = 0;
        this.gameSpeed += 1;
      } else {
        this.spdCounter++;
      }

    }

    this.wrapperTop += this.gameSpeed;
    if (this.wrapperTop >= 0) {
      this.wrapperTop = -600;
    }
    this.gameWrapper.style.top = this.wrapperTop + 'px';

    for (var carIndex = 0; carIndex < this.blockCar.length; carIndex++) {
      var nextCar = this.blockCar[carIndex];
      nextCar.topX += this.gameSpeed;
      // nextCar.style.top = nextCar.topX + this.gameSpeed +'px';
      nextCar.moveDown();

      //check collision

      var lowerx = nextCar.leftX;
      var upperx = lowerx + nextCar.carWidth;
      var lowery = nextCar.topX;
      var uppery = lowery + nextCar.carHeight;
      var newX = parseInt(this.myCar.style.left);
      var newY = parseInt(this.myCar.style.top);

      //the numbers are not perfect to ensure that cars seem to touch during collision
      if (newX + 47 >= lowerx &&
        newX+2 <= upperx &&
        newY + 75 >= lowery &&
        newY+6 <= uppery) {
          //disabling arrow keys.
          this.myCar.style.left = parseInt(this.myCar.style.left) -1 + 'px';
          if(this.gameScore>this.highScore){
            this.highScore = this.gameScore;
            this.hScoreContainer.innerHTML = this.highScore;
          }          
          clearInterval(startMov);
          setTimeout(newG.bind(this), 900);
          function newG() { 
            this.gameContainer.removeChild(this.gameWrapper);
            this.gameContainer.removeChild(this.myCar);
            for(var i = 0; i<this.blockCar.length;i++){
              this.blockCar[i].removeCar();
            }
            startNewGame(this.cIndex); 
          }
          clearInterval(this.gameInterval);
          // this.myCar.style.background = 'url(images/end.gif)';
      }
      //Removing cars
      if (this.blockCar[carIndex].topX > this.containerHeight + 80) {
        this.blockCar[carIndex].removeCar();
        this.blockCar.splice(carIndex, 1);
        this.gameScore++;
        this.scoreContainer.innerHTML = this.gameScore;
      }
    }
    //Adding new cars
    this.carDistance += this.gameSpeed;
    if (this.carDistance > 350) {
      this.carDistance = 0;
      var newBlockCar = new blockCar(this.gameContainer, getRandomNum());
      newBlockCar.init();
      this.blockCar.push(newBlockCar);
    }
  }
  function getRandomNum() {
    return Math.round(Math.random() * 2 + 1);
  }
}
function startNewGame(cIndex){
  var gameContainer = document.getElementsByClassName('game-container')[cIndex];
  var scoreContainer = document.getElementsByClassName('current-score')[cIndex];
  gameContainer.style.backgroundImage = 'url(images/lambo.jpg)';
  gameContainer.style.backgroundSize = 'contain';
  var imgx = document.createElement('img');
  imgx.setAttribute('src', 'images/play.png')
  imgx.classList.add('play-button');
  gameContainer.appendChild(imgx);
  var gameTxt = document.createElement('h1');
  gameTxt.classList.add('game-text');
  gameTxt.innerHTML = "Fury Road"
  gameContainer.appendChild(gameTxt);
  imgx.onclick = function(e) {
    scoreContainer.innerHTML = "0";
    gameContainer.removeChild(imgx);
    gameContainer.removeChild(gameTxt);
    new carGame(cIndex).init();
  }
}
