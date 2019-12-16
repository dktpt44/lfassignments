class Player {
  constructor(parElem) {
    this.playerElement;
    this.width = 75;
    this.height = 175;
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
    this.jumpHeight = 200;
  }
  changeWid = function (widVal,leftVal) {
    this.left = leftVal;
    this.playerElement.style.left = this.left + 'px';
    this.width = widVal;
    this.playerElement.style.width = this.width + 'px';
    this.playerImage.style.width = this.width + 'px';
  }
  makeplayerImg = function () {
    this.playerElement = document.createElement('div');
    this.playerElement.style.width = this.width + 'px';
    this.playerElement.style.height = this.height + 'px';
    this.playerElement.style.position = 'absolute';
    this.playerElement.style.zIndex = '2';
    this.playerElement.style.bottom = this.bottom + 'px';
    this.playerElement.style.left = this.left + 'px';
    this.parElem.appendChild(this.playerElement);
    this.playerImage = document.createElement('img');
    this.playerImage.style.width = this.width + 'px';
    this.playerImage.style.height = this.height + 'px';
    this.playerElement.appendChild(this.playerImage);
  }
  changeImg = function (srcImg) {
    this.playerImage.setAttribute('src', srcImg);
  }
  jumpInAir = function () {
    var newPos = this.bottom + this.jumpHeight;
    var indx = 1;
    var timeout = 0;
    var jumpInterval = setInterval(startAnim.bind(this), 10);
    function startAnim() {
      if (this.bottom > newPos) {
        clearInterval(jumpInterval);
        this.jumpDown();
      } else {
        if (timeout % 4 == 0) {
          timeout = 0;
          if(indx==2){
            this.changeWid(90);
          } else if(indx==3){
            this.changeWid(100,285);
          } else if(indx==4){
            this.changeWid(105,275);
          } 
          this.changeImg('images/up/' + indx + '.png')
          indx++;
          if (indx > 5) {
            this.changeWid(65,this.midPos);
            indx = 5;
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
    var indx = 5;
    var timeout = 0;
    var jumpInterval = setInterval(startAnim.bind(this), 10);
    function startAnim() {
      if (this.bottom < newPos) {
        this.isInAir = false;
        this.changeWid(75,this.midPos);
        clearInterval(jumpInterval);
      } else {
        if (timeout % 10 == 0) {
          timeout = 0;
        if(indx==3){
          this.changeWid(110,285);
        } else if(indx==4){
          this.changeWid(120,275);
        } 
          this.changeImg('images/up/' + indx + '.png')
          indx--;
          if (indx < 2) {
            indx =2;
            this.changeWid(90);
          }  
        }
        timeout++;
        this.bottom -= 5;
        this.playerElement.style.bottom = this.bottom + 'px';
      }
    }
  }
  moveLeft = function () {
    var newPos = this.left - 100;
    clearInterval(this.animInterval);
    this.animInterval = setInterval(startAnim.bind(this), 10);
    function startAnim() {
      if (this.left < newPos) {
        clearInterval(this.animInterval);
        this.isMovingLR = false;
        this.lane = 'left';
      } else {
        this.left -= 6;
        this.playerElement.style.left = this.left + 'px';
      }
    }
  }
  moveRightGravity = function () {
    var newPos = this.midPos;
    clearInterval(this.animInterval);
    this.animInterval = setInterval(startAnim.bind(this), 10);
    function startAnim() {
      if (this.left > newPos) {
        clearInterval(this.animInterval);
        this.playerElement.style.left = newPos + 'px';
        this.isMovingLR = false;
        this.lane = 'center';
      } else {
        this.left += 6;
        this.playerElement.style.left = this.left + 'px';
      }
    }
  }
  moveLeftGravity = function () {
    var newPos = this.midPos;
    clearInterval(this.animInterval);
    this.animInterval = setInterval(startAnim.bind(this), 10);
    function startAnim() {
      if (this.left < newPos) {
        clearInterval(this.animInterval);
        this.playerElement.style.left = newPos + 'px';
        this.isMovingLR = false;
        this.lane = 'center';

      } else {
        this.left -= 6;
        this.playerElement.style.left = this.left + 'px';
      }
    }
  }
  moveRight = function () {
    var newPos = this.left + 100;
    clearInterval(this.animInterval);
    this.animInterval = setInterval(startAnim.bind(this), 10);
    function startAnim() {
      if (this.left > newPos) {
        clearInterval(this.animInterval);
        this.isMovingLR = false;
        this.lane = 'right';

      } else {
        this.left += 6;
        this.playerElement.style.left = this.left + 'px';
      }
    }
  }

}