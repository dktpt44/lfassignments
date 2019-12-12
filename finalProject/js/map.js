class Map {
  constructor(parElem,bottomPos,leftPos, width,height) {
    this.mapElement;
    this.width=width;
    this.height=height;
    this.left=leftPos;
    this.bottom=bottomPos;
    this.parElem=parElem;
    this.mapImage;
    this.makeMapImg();
  }
  makeMapImg = function() {
    this.mapElement = document.createElement('div');
    this.mapElement.style.width=this.width+'px';
    this.mapElement.style.height=this.height+'px';
    this.mapElement.style.position='absolute';
    this.mapElement.style.bottom=this.bottom+'px';
    this.mapElement.style.left=this.left+'px';
    this.parElem.appendChild(this.mapElement);
    this.mapImage = document.createElement('img');
    this.mapImage.style.width=this.width+'px';
    this.mapImage.style.height=this.height+'px';
    this.mapImage.setAttribute('src','images/small.png');
    this.mapElement.appendChild(this.mapImage);
  }
  setMapAttrs = function (wid,hei,left,bot) {
    this.width=wid;
    this.height=hei;
    this.left=left;
    this.bottom=bot;
  }
  moveMap = function () {
    this.mapElement.style.width=this.width+'px';
    this.mapElement.style.height = this.height+'px';
    this.mapImage.style.width=this.width+'px';
    this.mapImage.style.height=this.height+'px';
    this.mapElement.style.bottom=this.bottom+'px';
    this.mapElement.style.left=this.left+'px';
  }
  get botPos() {
    return this.bottom;
  }
  get getW(){
    return this.width;
  }
  get leftPos() {
    return this.left;
  }
  get getH() {
    return this.height;
  }
  removeMap = function() {
    this.parElem.removeChild(this.mapElement);
  }
}