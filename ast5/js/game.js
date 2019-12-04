var game1 = new game(0).init();

function game(cIndex) {
  this.gameContainer;
  this.containerHeight = 600;
  this.containerWidth = 500;
  this.movingBackground;
  this.cIndex = cIndex;
  this.gamestate = 'paused';
  this.birdAcclrn = 0.02;
  this.birdVelocity = 1.5;
  this.gameVelocity = 1;
  this.gravityInterval;
  this.gameSpeed = 2;
  this.angleHolder = 0;
  this.gameScore = 0;
  this.scoreContainer;
  this.highScore = 0;
  this.initialPause = 0;
  this.gameInterval;
  //this.pipes[][] = null;
  this.upPipes = [];
  this.downPipes = [];
  this.backgroundPosX = 0;
  this.myBird;
  this.jumpValue = 80;
  this.pipeGap = 180;
  this.distBtwnPipes = 0;

  this.init = function () {
    this.gameContainer = document.getElementsByClassName('game-container')[this.cIndex];
    this.movingBackground = document.getElementsByClassName('motion-bg')[this.cIndex];
    this.myBird = new bird(this.gameContainer).init();
    this.gamestate = 'paused';
    this.highScore = window.localStorage.getItem('highScore');
    document.addEventListener('keydown', startG.bind(this));
    function startG() {
      var pressedKey = event.keyCode;
      if (this.gamestate != 'paused') {
        return;
      }
      if (pressedKey == 32) {
        this.gravityInterval = setInterval(this.gravityY.bind(this), 10);
        this.gameInterval = setInterval(this.moveGame.bind(this), 10);
        document.addEventListener('keydown', this.jumpBird.bind(this));
        this.gamestate = 'running';
        this.scoreContainer = document.createElement('p');
        this.scoreContainer.classList.add('score');
        this.scoreContainer.style.position = 'absolute';
        this.scoreContainer.style.top = '15%';
        this.scoreContainer.style.left = '48%';
        this.scoreContainer.style.fontFamily = 'myFont';
        this.scoreContainer.style.fontSize = '60px';
        this.scoreContainer.style.fill = '#fff';
        this.scoreContainer.style.zIndex = '2'
        this.scoreContainer.innerHTML = this.gameScore;
        this.gameContainer.appendChild(this.scoreContainer);

      }
    }
  }

  this.gravityY = function () {
    this.birdVelocity += this.birdAcclrn;
    this.myBird.topX += this.birdVelocity;
    this.birdAcclrn += 0.0014;
    this.angleHolder++;
    this.myBird.moveBird();
    if (this.myBird.angle < 90 && this.angleHolder > 25) {
      this.myBird.angle += 2;
    }
    this.myBird.changeAngle();
    if (this.myBird.topX >= 600 - this.myBird.height) {
      this.gamestate = 'stop';
      clearInterval(this.gameInterval);
      clearInterval(this.gravityInterval);
      this.showStoppedScreen().bind(this);
    }
  }

  this.moveGame = function () {
    this.moveBackground();
    if (this.initialPause < 150) {
      this.initialPause++;
      return;
    }
    for (var pipeIndex = 0; pipeIndex < this.upPipes.length; pipeIndex++) {
      var nextUpPipe = this.upPipes[pipeIndex];
      var nextDownPipe = this.downPipes[pipeIndex];
      nextUpPipe.right += this.gameSpeed;
      nextDownPipe.right += this.gameSpeed;
      nextUpPipe.movePipe();
      nextDownPipe.movePipe();
      //check collision

      var upperx = this.containerWidth - nextUpPipe.right; var lowerx = upperx - nextUpPipe.width;
      var uppery = nextUpPipe.top; var lowery = uppery + nextUpPipe.height;

      var upperx2 = this.containerWidth - nextDownPipe.right; var lowerx2 = upperx2 - nextDownPipe.width;
      var uppery2 = nextDownPipe.top; var lowery2 = uppery2 + nextDownPipe.height;

      var newX = (this.containerWidth / 2) - this.myBird.width;
      // console.log(newX);
      var newY = this.myBird.topX;

      if ((newX <= upperx && newX + this.myBird.width >= lowerx && newY + this.myBird.height >= uppery && newY <= lowery) ||
        (newX <= upperx2 && newX + this.myBird.width >= lowerx2 && newY + this.myBird.height >= uppery2 && newY <= lowery2)) {
        //collision detected
        clearInterval(this.gameInterval);
        this.gamestate = 'stopped';
        this.birdVelocity = 4;
        if (this.gameScore > this.highScore) {
          this.highScore = this.gameScore;
          window.localStorage.setItem('highScore', this.highScore)
        }
        this.showStoppedScreen().bind(this);
      }
      //updating score
      if (upperx < newX + this.myBird.width && !nextUpPipe.scoreCounted) {
        nextUpPipe.scoreCounted = true;
        this.gameScore++;
        this.scoreContainer.innerHTML = this.gameScore;
      }

      //removing pipes
      if (nextUpPipe.right > this.containerHeight + 100) {
        nextUpPipe.removePipe();
        nextDownPipe.removePipe();
        this.upPipes.splice(pipeIndex, 1);
        this.downPipes.splice(pipeIndex, 1);
      }



    }

    //adding pipes
    this.distBtwnPipes += this.gameSpeed;
    if (this.distBtwnPipes > 300) {
      this.distBtwnPipes = 0;
      var newTop = getRandomTop();
      var newUp = new Pipe(this.gameContainer, newTop, 'url(images/top.png)').init();
      var newDown = new Pipe(this.gameContainer, newTop + 350 + this.pipeGap, 'url(images/bottom.png)').init();
      this.upPipes.push(newUp);
      this.downPipes.push(newDown);
    }

  }
  this.showStoppedScreen = function () {
    // this.gameContainer.removeChild(this.myBird);
    this.gameContainer.removeChild(this.scoreContainer);
    var fScoreContainer = document.createElement('div');
    fScoreContainer.style.background = 'url(images/score.png)';
    fScoreContainer.style.position = 'absolute';
    fScoreContainer.style.top = '200px';
    fScoreContainer.style.left = '180px';
    fScoreContainer.style.width = '130px';
    fScoreContainer.style.height = '172px';
    fScoreContainer.style.backgroundRepeat = 'no-repeat';
    fScoreContainer.style.backgroundSize = 'cover';
    this.gameContainer.appendChild(fScoreContainer);

    var scContainer = document.createElement('p');
    scContainer.classList.add('score');
    scContainer.style.position = 'absolute';
    scContainer.style.top = '255px';
    scContainer.style.left = '238px';
    scContainer.style.fontFamily = 'myFont';
    scContainer.style.fontSize = '30px';
    scContainer.style.fill = '#fff';
    scContainer.style.zIndex = '3'
    scContainer.innerHTML = this.gameScore;
    this.gameContainer.appendChild(scContainer);



    var scContainer2 = document.createElement('p');
    scContainer2.classList.add('score');
    scContainer2.style.position = 'absolute';
    scContainer2.style.top = '315px';
    scContainer2.style.left = '238px';
    scContainer2.style.fontFamily = 'myFont';
    scContainer2.style.fontSize = '30px';
    scContainer2.style.fill = '#fff';
    scContainer2.style.zIndex = '3'
    scContainer2.innerHTML = this.highScore;
    this.gameContainer.appendChild(scContainer2);


    var resumeButton = document.createElement('div');
    resumeButton.style.background = 'url(images/restart.png)';
    resumeButton.style.position = 'absolute';
    resumeButton.style.top = '400px';
    resumeButton.style.left = '180px';
    resumeButton.style.width = '130px';
    resumeButton.style.height = '60px';
    resumeButton.style.backgroundRepeat = 'no-repeat';
    resumeButton.style.backgroundSize = 'contain';
    this.gameContainer.appendChild(resumeButton);
    resumeButton.addEventListener('click', startGame.bind(this));
    function startGame(e) {
      this.gameContainer.removeChild(resumeButton);
      this.gameContainer.removeChild(scContainer);
      this.gameContainer.removeChild(scContainer2);
      this.gameContainer.removeChild(fScoreContainer);
      var x = new game(this.cIndex).init();
    }
  }
  function getRandomTop() {
    var max = 0;
    var min = -200;
    return Math.round(Math.random() * (max - min) + min);
  }
  this.jumpBird = function () {
    var pressedKey = event.keyCode;
    if (this.gamestate != 'running') {
      return;
    }
    this.birdVelocity = 1.5;
    this.birdAcclrn = 0.02;
    if (pressedKey == 32) {
      var finalPos = this.myBird.topX - this.jumpValue;
      if (finalPos <= -200) {
        finalPos = -200;
      }
      clearInterval(this.gravityInterval);
      this.angleHolder = 0;
      this.myBird.angle = -30;
      this.myBird.changeAngle();
      var jumpInterval = setInterval(startJump.bind(this), 10);
      function startJump() {

        if (this.myBird.topX <= finalPos) {
          clearInterval(jumpInterval);
          this.gravityInterval = setInterval(this.gravityY.bind(this), 10);
        } else {
          this.myBird.topX -= 10;
          this.myBird.moveBird();
        }
      }
    } else {
      return;
    }

  }

  this.moveBackground = function () {
    if (this.backgroundPosX < -1000) {
      this.backgroundPosX = 0;
    }
    this.backgroundPosX -= this.gameSpeed;
    this.movingBackground.style.backgroundPositionX = this.backgroundPosX + 'px'
  }
}