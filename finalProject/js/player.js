class Player {
  constructor(parElem) {
    this.playerElem;
    this.width;
    this.height;
    this.left=leftPos;
    this.bottom=bottomPos;
    this.parElem=parElem;
    this.playerImage;
    this.makeplayerImg();
  }
  makeplayerImg = function() {
    this.playerElement = document.createElement('div');
    this.playerElement.style.width=this.width+'px';
    this.playerElement.style.height=this.height+'px';
    this.playerElement.style.position='absolute';
    this.playerElement.style.bottom=this.bottom+'px';
    this.playerElement.style.left=this.left+'px';
    this.parElem.appendChild(this.playerElement);
    this.playerImage = document.createElement('img');
    this.playerImage.style.width=this.width+'px';
    this.playerImage.style.height=this.height+'px';
    this.playerImage.setAttribute('src','xx');
    this.playerElement.appendChild(this.playerImage);
  }
}