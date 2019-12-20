class Coin {
  constructor(parElem, lan) {
    this.coinElement;
    this.left = 50;
    this.parElem = parElem;
    this.initWid = 10;
    this.initBot = 365;
    this.finalwid = 70;
    this.finalBot = -70;
    this.initLeft = [308, 318, 328];
    this.finalLeft = [170, 280, 400];
    this.width = this.initWid;
    this.height = this.initWid;
    this.bottom = this.initBot;
    this.lane = lan;
    this.imageIndex = 1;
    this.makecoinImg();
  }

  makecoinImg = function () {
    this.left = this.initLeft[this.lane - 1];
    this.coinElement = document.createElement('img');
    this.coinElement.style.position = 'absolute';
    this.coinElement.style.zIndex = '2';
    this.coinElement.style.objectFit = 'contain';
    this.parElem.appendChild(this.coinElement);
    this.drawCoin();
    this.changeImg();
  }

  changePos(bot, wid) {
    this.bottom -= bot;
    this.width += wid;
    this.height += wid;
    if (this.lane == 1) {
      this.left -= wid * 2;
    } else if (this.lane == 3) {
      this.left += wid / 1.25;
    } else if (this.lane == 2) {
      this.left -= wid / 2;
    }
    this.drawCoin();
  }

  drawCoin = function () {
    this.coinElement.style.width = this.width + 'px';
    this.coinElement.style.height = this.height + 'px';
    this.coinElement.style.bottom = this.bottom + 'px';
    this.coinElement.style.left = this.left + 'px';
  }

  changeImg = function () {
    this.coinElement.setAttribute('src', 'images/coin/' + this.imageIndex + '.png')
    this.imageIndex++;
    if (this.imageIndex > 5) {
      this.imageIndex = 1;
    }
  }

  get botPos() {
    return this.bottom;
  }

  get coinWH() {
    return this.width;
  }

  get leftPos() {
    return this.left;
  }

  removeCoin = function () {
    this.parElem.removeChild(this.coinElement);
  }
  //animating coins after collision
  collectCoin = function () {
    this.width = 45;
    this.height = 45;
    this.coinElement.setAttribute('src', 'images/coin/5.png')
    var targetLeft = 600;
    var targetBottom = 500;
    var collectingAnim = setInterval(startAnim.bind(this), 10);
    function startAnim() {
      this.left += 2;
      this.bottom += 2;
      this.drawCoin();
      if (this.left > targetLeft || this.bottom > targetBottom) {
        this.removeCoin();
        clearInterval(collectingAnim);
      }
    }
  }
}
