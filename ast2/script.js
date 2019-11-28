var IMAGE_WIDTH = 500;
// Transition time is to be given in seconds.
// Hold time is to be given in seconds.
var firstImageCarousel = new ImageCarousel(0.5, 3, 0);
var secondImageCarousel = new ImageCarousel(0.2, 2, 1);

function ImageCarousel(transitionTime, holdTime, cIndex) {
  this.transitionTime = transitionTime;
  this.holdTime = holdTime;
  this.cIndex = cIndex;
  var incrementByX = IMAGE_WIDTH/(this.transitionTime*100);
  var currentImgIndex = 1;
  var carouselContainer = document.getElementsByClassName('carousel-container')[this.cIndex];
  var carouselWrapper = carouselContainer.getElementsByClassName('carousel-image-wrapper')[0];
  var carouselImages = carouselWrapper.getElementsByTagName('img');
  var totalNumberOfImages = carouselImages.length;
  carouselWrapper.style.width = totalNumberOfImages * IMAGE_WIDTH + 'px';
  carouselWrapper.style.left = '0px';

  addIndicators();
  addButtons();
  function addIndicators() {
    var indicatorHolder = document.createElement('div');
    indicatorHolder.classList.add('img-indicators')
    carouselContainer.appendChild(indicatorHolder);
    for (var i = 0; i < totalNumberOfImages; i++) {
      var newcircle = document.createElement('button');
      newcircle.classList.add('circle');
      newcircle.onclick = function (e) {
        changeImage(e.target);
      }
      indicatorHolder.appendChild(newcircle);
    }
  }
  function addButtons() {
    var leftButtonHolder = document.createElement('div');
    leftButtonHolder.classList.add('left-button');
    carouselContainer.appendChild(leftButtonHolder);
    var leftButton = document.createElement('button');
    leftButtonHolder.appendChild(leftButton);
    var imgx = document.createElement('img');
    imgx.setAttribute('src', 'images/double-left.png')
    leftButton.appendChild(imgx);
    leftButton.addEventListener('click', moveLeft);

    var rightButtonHolder = document.createElement('div');
    rightButtonHolder.classList.add('right-button');
    carouselContainer.appendChild(rightButtonHolder);
    var rightButton = document.createElement('button');
    rightButtonHolder.appendChild(rightButton);
    var imgx = document.createElement('img');
    imgx.setAttribute('src', 'images/double-right.png')
    rightButton.appendChild(imgx);
    rightButton.addEventListener('click', moveRight);
  }
  var listOfButtons = carouselContainer.getElementsByClassName('circle');
  changeCircle();
  var globalInterval = null;
  function globalAnimate(flag){
    if(flag){
      globalInterval = setInterval(function(){
        moveRight();
      },holdTime*1000);
    } else {
      clearInterval(globalInterval);
    }
  }
 

  function moveLeft() {
    var currentLeft = parseInt(carouselWrapper.style.left);
    if ((currentLeft % IMAGE_WIDTH) != 0) {
      return;
    }
    globalAnimate(false);
    var newLeft = currentLeft + IMAGE_WIDTH;
    if (currentLeft == 0) {
      currentImgIndex = totalNumberOfImages + 1;
      newLeft = -(totalNumberOfImages - 1) * IMAGE_WIDTH;
      var dummyid = setInterval(function () {
        carouselWrapper.style.left = currentLeft + 'px';
        currentLeft -= 40;
        if (currentLeft <= newLeft) {
          carouselWrapper.style.left = newLeft + 'px';     
          changeCircle();
          clearInterval(dummyid);
          globalAnimate(true);
        }
      }, 10)
    } else {
      var dummyid = setInterval(function () { 
        carouselWrapper.style.left = currentLeft + 'px';
        currentLeft += incrementByX;
        if (currentLeft >= newLeft) {
          carouselWrapper.style.left = newLeft + 'px';
          changeCircle();
          clearInterval(dummyid);
          globalAnimate(true);
        }
      }, 10)
    }
    currentImgIndex--;
  }

  function moveRight() {
    var currentLeft = parseInt(carouselWrapper.style.left);
    if ((currentLeft % IMAGE_WIDTH) != 0) {
      return;
    }
    globalAnimate(false);
    var newLeft = currentLeft - IMAGE_WIDTH;
    if (currentImgIndex == totalNumberOfImages) {
      currentImgIndex = 0;
      newLeft = 0;
      var dummyid = setInterval(function () {
        carouselWrapper.style.left = currentLeft + 'px';
        currentLeft += 40;
        if (currentLeft >= newLeft) {
          carouselWrapper.style.left = newLeft + 'px';
          changeCircle();
          clearInterval(dummyid);
          globalAnimate(true);
        }
      }, 10)
    } else {
      var dummyid = setInterval(function () {
        carouselWrapper.style.left = currentLeft + 'px';
        currentLeft -= incrementByX;
        if (currentLeft <= newLeft) {
          carouselWrapper.style.left = newLeft + 'px';
          changeCircle();
          clearInterval(dummyid);
          globalAnimate(true);
        }

      }, 10);
    }
    currentImgIndex++;
  }

  function changeCircle() {
    listOfButtons[currentImgIndex - 1].classList.add('bigger-circle');
    removeAllStyles();
  }

  function changeImage(clickedButton) {
    var oldIndex = currentImgIndex;
    for (var i = 0; i < totalNumberOfImages; i++) {
      if (listOfButtons[i] == clickedButton) {
        currentImgIndex = i + 1;
        break;
      }
    }
    animateImage(oldIndex);
    removeAllStyles();
    clickedButton.classList.add('bigger-circle');
  }

  function removeAllStyles() {
    for (var i = 0; i < totalNumberOfImages; i++) {
      if (i == currentImgIndex - 1) {
        continue;
      }
      listOfButtons[i].classList.remove('bigger-circle');
    }
  }

  function animateImage(oldIndex) {
    if (oldIndex == currentImgIndex) {
      return;
    } else if (currentImgIndex < oldIndex) {
      globalAnimate(false);
      var leftIncrement = (oldIndex - currentImgIndex) * 20;
      var currentLeft = parseInt(carouselWrapper.style.left);
      var newLeft = -(currentImgIndex - 1) * IMAGE_WIDTH;
      var dummyid = setInterval(function () {
        carouselWrapper.style.left = currentLeft + 'px';
        currentLeft += leftIncrement;
        if (currentLeft >= newLeft) {
          carouselWrapper.style.left = newLeft + 'px';
          clearInterval(dummyid);
          globalAnimate(true);
        }
      }, 10);
    } else {
      globalAnimate(false);
      var rightIncrement = (currentImgIndex - oldIndex) * 20;
      var currentRight = parseInt(carouselWrapper.style.left);
      var newRight = -(currentImgIndex - 1) * IMAGE_WIDTH;
      var dummyid = setInterval(function () {
        carouselWrapper.style.left = currentRight + 'px';
        currentRight -= rightIncrement;
        if (currentRight <= newRight) {
        carouselWrapper.style.left = newRight + 'px';
          clearInterval(dummyid);
          globalAnimate(true);
        }
      }, 10);
    }

  }
  globalAnimate(true);


}




