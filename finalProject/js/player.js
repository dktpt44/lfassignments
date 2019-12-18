class Player {
  constructor(parElem) {
    this.playerElement;
    this.width = 75;
    this.height = 175;
    this.left = 290;
    this.bottom = 20;
    this.midPos = 290;
    this.curLeftVal = this.left;
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
  changeWid = function (widVal,leftVal) {
    this.left = leftVal;
    this.playerElement.style.left = this.left + 'px';
    this.width = widVal;
    this.playerElement.style.width = this.width + 'px';
    this.playerImage.style.width = this.width + 'px';
  }
  get botPos(){
    return this.bottom;
  }
  jumpInAir = function () {
    var incrfirst = true;
    var newPos = this.bottom + this.jumpHeight;
    var indx = 1;
    var timeout = 0;
    var jumpInterval = setInterval(startAnim.bind(this), 10);
    function startAnim() {
      if (this.bottom > newPos) {
        clearInterval(jumpInterval);
        this.changeWid(75,this.left);
        this.jumpDown();
      } else {
        if (timeout % 4 == 0) {
          timeout = 0;
          if(indx==2){
            this.changeWid(95,this.left-4);
          } else if(indx==3){
            this.changeWid(100,this.left-10);
          } else if(indx==4){
            this.changeWid(105,this.left-10);
          } 
          this.changeImg('images/up/' + indx + '.png')
          indx++;
          if (indx > 5 && incrfirst) {
            incrfirst=false;
            this.changeWid(75,this.left+24);
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
    var incrfirst= true;
    var newPos = 20;
    var indx = 5;
    var timeout = 0;
    var jumpInterval = setInterval(startAnim.bind(this), 10);
    function startAnim() {
      if (this.bottom < newPos) {
        this.isInAir = false;
        this.changeWid(75,this.left+4);
        clearInterval(jumpInterval);
      } else {
        if (timeout % 10 == 0) {
          timeout = 0;
        if(indx==3){
          this.changeWid(110,this.left+10);
        } else if(indx==4){
          this.changeWid(120,this.left-24);
        } 
          this.changeImg('images/up/' + indx + '.png')
          indx--;
          if (indx < 2 && incrfirst) {
            incrfirst=false;
            indx =2;
            this.changeWid(96,this.left+10);
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
        this.left -= 8;
        this.playerElement.style.left = this.left + 'px';
      }
    }
  }
  moveRightGravity = function () {
    if(this.left > this.midPos){
      return;
    }
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
        this.left += 8;
        this.playerElement.style.left = this.left + 'px';
      }
    }
  }
  moveLeftGravity = function () {
    if(this.left < this.midPos){
      return;
    }
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
        this.left -= 8;
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
        this.left += 8;
        this.playerElement.style.left = this.left + 'px';
      }
    }
  }

}