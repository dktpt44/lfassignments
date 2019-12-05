
function ball(parentElem){
  this.ball;
  this.parentElem = parentElem;
  this.top = 10;
  this.width = 80;
  this.left = 10;
  this.movingup=false;
  this.height = 350;
  this.init = function () {
      this.ball = document.createElement('div');
      this.ball.style.borderRadius = '50%';
      this.ball.style.width = this.width + 'px';
      this.ball.style.height = this.height + 'px';
      this.ball.style.position = 'absolute';
      this.ball.style.top = this.top + 'px';
      this.ball.style.left = this.left + 'px';
      this.ball.style.backgroundColor = 'orange';
      this.parentElem.appendChild(this.ball);
      return this;
  }
  this.move = function () {
    this.ball.style.top = this.top + 'px';
  }

}
