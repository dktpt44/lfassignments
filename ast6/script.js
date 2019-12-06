var anim1 = new helixAnim().init();

function helixAnim() {
  this.container;
  this.width = 600;
  this.height = 300;
  this.rows = 9;
  this.columns = 25;
  this.top;
  this.left;
  this.canvas;
  this.ctx;
  this.frameCount = 1;
  this.speed = 0.05;
  this.maxRadius = 5;
  this.phase = 0;
  this.animInterval;


  this.init = function () {
    this.container = document.getElementsByClassName('helix-anim')[0];
    this.canvas = document.getElementById('helix-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.background = '#1f1e17';
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
    this.container.style.width = this.width + 'px';
    this.container.style.height = this.height + 'px';
    this.animInterval = setInterval(this.animateBalls.bind(this), 20);
  }

  this.animateBalls = function () {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.left = 0;
    var columnDiff = 0;
    this.frameCount++;
    this.phase = this.frameCount * this.speed;
    for (var i = 0; i < 2; i++) {
      var rowPhase;
      if (i == 0) {
        rowPhase = this.phase;
      } else {
        rowPhase = this.phase + i * Math.PI;
      }
      this.left = 0;
      for (var col = 0; col < this.columns; col++) {
        this.left += this.maxRadius * 2 + 1;
        columnDiff = (col * Math.PI) / 10;
        for (var row = 0; row < this.rows; row++) {
          this.top = 40 + row * 9 + Math.sin(rowPhase + columnDiff) * 25;
          var changeSize = (Math.cos(rowPhase - row * 0.05 + columnDiff) + 1) * 0.5;
          var currRad = changeSize * this.maxRadius;
          this.ctx.beginPath();
          this.ctx.arc(this.left, this.top, currRad, 0, 2 * Math.PI, false);
          this.ctx.fillStyle = '#fc9a49';
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    }
  }
}




