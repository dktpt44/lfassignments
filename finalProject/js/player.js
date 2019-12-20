class Player {
  constructor(parElem) {
    this.playerElement;
    this.width = 60;
    this.height = 150;
    this.left = 290;
    this.bottom = 20;
    this.midPos = 290;
    this.parElem = parElem;
    this.playerImage;
    this.makeplayerImg();
    this.isMovingLR;
    this.lane;
    this.animInterval;
    this.isInAir;
    this.jumpHeight = 220;
  }
  makeplayerImg = function () {
    this.playerElement = document.createElement('div');
    this.playerElement.style.width = this.width + 'px';
    this.playerElement.style.height = this.height + 'px';
    this.playerElement.style.position = 'absolute';
    this.playerElement.style.zIndex = '2';
    this.playerElement.style.objectFit = 'cover';
    this.playerElement.style.bottom = this.bottom + 'px';
    this.playerElement.style.left = this.left + 'px';
    this.parElem.appendChild(this.playerElement);
    this.playerImage = document.createElement('img');
    this.playerImage.style.height = this.height + 'px';
    this.playerImage.style.objectFit = 'none';
    this.resetImgWid();
    this.changeImg(0);
    this.playerElement.appendChild(this.playerImage);
  }
  get botPos() {
    return this.bottom;
  }
  get leftPos() {
    return this.left;
  }
  get playerWid() {
    return this.width;
  }
  changeImg = function (x) {
    var bot = -(x) * 150 + 'px'
    this.playerImage.style.objectPosition = '0 ' + bot;
  }
  resetImgWid = function () {
    this.playerElement.style.left = this.left + 'px';
    this.width = 60;
    this.playerElement.style.width = this.width + 'px';
    this.playerImage.style.width = this.width + 'px';
    this.playerImage.setAttribute('src', 'images/run.png');
  }
  changeWidJump = function () {
    this.playerImage.setAttribute('src', 'images/jump.png');
    this.left -= 20;
    this.playerElement.style.left = this.left + 'px';
    this.width = 100;
    this.playerElement.style.width = this.width + 'px';
    this.playerImage.style.width = this.width + 'px';
    this.changeImg(0);
  }
  jumpInAir = function () {
    var newPos = this.bottom + this.jumpHeight;
    this.changeWidJump();
    var indx = 0;
    var timeout = 0;
    var jumpInterval = setInterval(startAnim.bind(this), 10);
    function startAnim() {
      if (this.bottom > newPos) {
        clearInterval(jumpInterval);
        this.jumpDown();
      } else {
        if (timeout % 4 == 0) {
          timeout = 0;
          this.changeImg(indx)
          indx++;
          if (indx > 4) {
            indx = 4;
          }
        }
        timeout++;
        this.bottom += 10;
        this.playerElement.style.bottom = this.bottom + 'px';
      }
    }
  }

  jumpDown = function () {
    var newPos = 20;
    var indx = 4;
    var timeout = 0;
    var jumpInterval = setInterval(startAnim.bind(this), 10);
    function startAnim() {
      if (this.bottom < newPos) {
        this.isInAir = false;
        this.left += 20;
        this.resetImgWid();
        clearInterval(jumpInterval);
      } else {
        if (timeout % 10 == 0) {
          timeout = 0;
          this.changeImg(indx);
          indx--;
          if (indx < 2) {
            indx = 2;
          }
        }
        timeout++;
        this.bottom -= 6;
        this.playerElement.style.bottom = this.bottom + 'px';
      }
    }
  }
  playerFall = function () {
    var fall = setInterval(function () {
      this.bottom-=4;
      this.height-=6;
      this.playerElement.style.bottom = this.bottom + 'px';
      this.playerImage.style.height = this.height + 'px';
      if(this.bottom<-150){
        clearInterval(fall);
      }
    }.bind(this), 20);
  }
  moveLeft = function () {
    var newPos = this.left - 90;
    clearInterval(this.animInterval);
    this.animInterval = setInterval(startAnim.bind(this), 10);
    function startAnim() {
      this.left -= 10;
      this.playerElement.style.left = this.left + 'px';
      if (this.left < newPos) {
        clearInterval(this.animInterval);
        this.isMovingLR = false;
        this.lane = 'left';
      }
    }
  }
  moveRightGravity = function () {
    if (this.left > this.midPos) {
      return;
    }
    var newPos = this.midPos;
    clearInterval(this.animInterval);
    this.animInterval = setInterval(startAnim.bind(this), 10);
    function startAnim() {
      this.left += 10;
      if (this.left >= newPos) {
        this.left = this.midPos;
        this.isMovingLR = false;
        this.lane = 'center';
        if (this.isInAir) {
          this.left -= 20;
        }
        clearInterval(this.animInterval);
      }
      this.playerElement.style.left = this.left + 'px';
    }
  }
  moveLeftGravity = function () {
    if (this.left < this.midPos) {
      return;
    }
    var newPos = this.midPos;
    clearInterval(this.animInterval);
    this.animInterval = setInterval(startAnim.bind(this), 10);
    function startAnim() {
      this.left -= 10;
      if (this.left < newPos) {
        clearInterval(this.animInterval);
        this.left = this.midPos;
        this.isMovingLR = false;
        this.lane = 'center';
        if (this.isInAir) {
          this.left -= 20;
        }
      }
      this.playerElement.style.left = this.left + 'px';

    }
  }
  moveRight = function () {
    var newPos = this.left + 90;
    clearInterval(this.animInterval);
    this.animInterval = setInterval(startAnim.bind(this), 10);
    function startAnim() {
      this.left += 10;
      if (this.left > newPos) {
        clearInterval(this.animInterval);
        this.isMovingLR = false;
        this.lane = 'right';
      }
      this.playerElement.style.left = this.left + 'px';
    }
  }
  removePlayer = function () {
    this.parElem.removeChild(this.playerElement);
  }

}