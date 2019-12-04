function bird(parElem) {
  this.bird;
  this.parElem = parElem;
  this.width = 60;
  this.height = 45;
  this.topX = 280;
  this.angle = 0;
  this.init = function () {
    this.bird = document.createElement('div');
    this.bird.style.width = this.width + 'px';
    this.bird.style.height = this.height + 'px';
    this.bird.style.background = 'url(images/bird1.png)';
    this.bird.style.position = 'absolute';
    this.bird.style.right = '50%';
    this.bird.style.top = this.topX + 'px';
    this.bird.style.zIndex='2';
    this.changeAngle();
    this.parElem.appendChild(this.bird);
    return this;
  }
  this.changeImg = function(imgx) {
    this.bird.style.background = imgx;
  }
  this.moveBird = function () {
    this.bird.style.top = this.topX + 'px';
  }
  this.changeAngle = function () {
    this.bird.style.transform = 'rotate(' + this.angle + 'deg)';
  }
  this.removeBird = function() {
    this.parElem.removeChild(this.bird);
  }

}