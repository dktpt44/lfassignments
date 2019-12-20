class Map {
  constructor(parElem, bottomPos, leftPos, width, height, isObstacle, obsT) {
    this.mapElement;
    this.width = width;
    this.height = height;
    this.left = leftPos;
    this.bottom = bottomPos;
    this.parElem = parElem;
    this.isThisChecked = false;
    this.mapImage;
    this.src = 'images/small.png';
    this.isObstacle = isObstacle;
    this.obstacleType = obsT;
    this.makeMapImg();
  }

  makeMapImg = function () {
    this.mapElement = document.createElement('div');
    this.mapElement.style.width = this.width + 'px';
    this.mapElement.style.height = this.height + 'px';
    this.mapElement.style.position = 'absolute';
    this.mapElement.style.bottom = this.bottom + 'px';
    this.mapElement.style.left = this.left + 'px';
    this.parElem.appendChild(this.mapElement);
    this.mapImage = document.createElement('img');
    this.mapImage.style.width = this.width + 'px';
    this.mapImage.style.height = this.height + 'px';
    if (this.isObstacle) {
      if (this.obstacleType == 'left') {
        this.src = 'images/obstaclel.png';
      } else if (this.obstacleType == 'right') {
        this.src = 'images/obstacler.png';
      } else {
        this.src = 'images/obstacle1.png';
      }
    }
    this.mapImage.setAttribute('src', this.src);
    this.mapElement.appendChild(this.mapImage);
  }

  //changing attributes during animation
  setMapAttrs = function (wid, hei, left, bot) {
    this.width = wid;
    this.height = hei;
    this.left = left;
    this.bottom = bot;
  }

  moveMap = function () {
    this.mapElement.style.width = this.width + 'px';
    this.mapElement.style.height = this.height + 'px';
    this.mapImage.style.width = this.width + 'px';
    this.mapImage.style.height = this.height + 'px';
    this.mapElement.style.bottom = this.bottom + 'px';
    this.mapElement.style.left = this.left + 'px';
  }

  set isChecked(bolVal) {
    this.isThisChecked = bolVal;
  }

  get isChecked() {
    return isThisChecked;
  }

  get botPos() {
    return this.bottom;
  }

  get getW() {
    return this.width;
  }

  get leftPos() {
    return this.left;
  }

  get getH() {
    return this.height;
  }

  get getObstacleType() {
    return this.obstacleType;
  }

  removeMap = function () {
    this.parElem.removeChild(this.mapElement);
  }
}
