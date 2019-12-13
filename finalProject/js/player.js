class Player {
  constructor(parElem) {
    this.playerElement;
    this.width = 60;
    this.height = 150;
    this.left = 220;
    this.bottom = 20;
    this.parElem = parElem;
    this.playerImage;
    this.makeplayerImg();
    this.isMovingLR;
    this.isInAir;
    this.jumpHeight = 80;
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
  changeImg = function (indx) {
    var srcImg = 'images/run/' + indx + '.png';
    this.playerImage.setAttribute('src', srcImg);
  }
  jumpInAir = function () {
    var newPos = this.bottom + this.jumpHeight;
    var jumpInterval = setInterval(startAnim.bind(this), 10);
    function startAnim() {
      if (this.bottom > newPos) {
        clearInterval(jumpInterval);
        this.jumpDown();
      } else {
        this.bottom += 5;
        this.playerElement.style.bottom = this.bottom + 'px';
      }
    }
  }
  jumpDown = function () {
    var newPos = 20;
    var jumpInterval = setInterval(startAnim.bind(this), 10);
    function startAnim() {
      if (this.bottom < newPos) {
        clearInterval(jumpInterval);
        this.isInAir=false;
      } else {
        this.bottom -= 5;
        this.playerElement.style.bottom = this.bottom + 'px';
      }
    }
  }
  moveLeft = function () {
    var newPos = this.left-50;
    var leftInterval = setInterval(startAnim.bind(this), 10);
    function startAnim() {
      if (this.left < newPos) {
        clearInterval(leftInterval);
        if(this.isMovingLR){
          this.moveRight();
        }
        this.isMovingLR=false;
      } else {
        this.left -= 5;
        this.playerElement.style.left = this.left + 'px';
      }
    }
    
  }
  moveRight=function () {
    var newPos = this.left+50;
    var leftInterval = setInterval(startAnim.bind(this), 10);
    function startAnim() {
      if (this.left > newPos) {
        clearInterval(leftInterval);
        if(this.isMovingLR){
          this.moveLeft();
        }
        this.isMovingLR=false;
      } else {
        this.left += 5;
        this.playerElement.style.left = this.left + 'px';
      }
    }
    
  }

}