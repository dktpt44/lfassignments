class Coin {
  constructor(parElem) {
    this.coinElement;
    this.width = 50;
    this.height = 50;
    this.left = 290;
    this.bottom = 20;
    this.midPos = 290;
    this.parElem = parElem;
    this.coinImage;
    this.makecoinImg();
    this.lane;
  }
  makecoinImg = function () {
    this.coinElement = document.createElement('div');
    this.coinElement.style.width = this.width + 'px';
    this.coinElement.style.height = this.height + 'px';
    this.coinElement.style.position = 'absolute';
    this.coinElement.style.zIndex = '2';
    this.coinElement.style.bottom = this.bottom + 'px';
    this.coinElement.style.left = this.left + 'px';
    this.parElem.appendChild(this.coinElement);
    this.coinImage = document.createElement('img');
    this.coinImage.style.width = this.width + 'px';
    this.coinImage.style.height = this.height + 'px';
    this.coinElement.appendChild(this.coinImage);
  }
  changeImg = function (srcImg) {
    this.coinImage.setAttribute('src', srcImg);
  }
  removeCoin = function() {
    this.parElem.removeChild(this.coinElement);
  }
}