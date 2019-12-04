
function Pipe(parentElem, top, imgSource){
  this.pipe;
  this.parentElem = parentElem;
  this.top = top;
  this.width = 80;
  this.right = -this.width;
  this.imgSource = imgSource;
  this.height = 350;
  this.scoreCounted = false;
  this.init = function () {
      this.pipe = document.createElement('div');
      this.pipe.style.width = this.width + 'px';
      this.pipe.style.height = this.height + 'px';
      this.pipe.style.position = 'absolute';
      this.pipe.style.top = this.top + 'px';
      this.pipe.style.right = this.right + 'px';
      this.pipe.style.background = this.imgSource;
      this.parentElem.appendChild(this.pipe);
      return this;
  }
  this.movePipe = function(){
      this.pipe.style.right = this.right + 'px';
  }
  this.removePipe = function(){
      this.parentElem.removeChild(this.pipe);
  }
}
