var carouselContainer = document.getElementsByClassName('carousel-container')[0];
var carouselWrapper = carouselContainer.getElementsByClassName('carousel-image-wrapper')[0];
var carouselImages = carouselWrapper.getElementsByTagName('img');
var totalNumberOfImages = carouselImages.length;
carouselWrapper.style.width = (carouselImages.length) * 800 + 'px';
carouselWrapper.style.left = '0px';
var index = 1;
var indicatorHolder = document.getElementById('img-indicators');

for (var i = 0; i < totalNumberOfImages; i++) {
  var newcircle = document.createElement('button');
  newcircle.classList.add('circle');
  newcircle.onclick = function(e) {
    changeImage(e.target);
  }
  indicatorHolder.appendChild(newcircle);
}

var listOfButtons = document.getElementsByClassName('circle');
changeCircle();

function moveLeft() {
  var currentLeft = parseInt(carouselWrapper.style.left);
  if ((currentLeft % 800) != 0) {
    return;
  }
  var newLeft = currentLeft + 800;
  if (currentLeft == 0) {
    index = totalNumberOfImages + 1;
    newLeft = -(totalNumberOfImages - 1) * 800;
    var dummyid = setInterval(function () {
      if (currentLeft == newLeft) {
        clearInterval(dummyid);
        changeCircle();
      }
      carouselWrapper.style.left = currentLeft + 'px';
      currentLeft -= 40;
    }, 5)
  } else {
    var dummyid = setInterval(function () {
      if (currentLeft == newLeft) {
        clearInterval(dummyid);
        changeCircle();
      }
      carouselWrapper.style.left = currentLeft + 'px';
      currentLeft += 10;
    }, 10)
  }
  index--;
}

function moveRight() {
  var currentLeft = parseInt(carouselWrapper.style.left);
  if ((currentLeft % 800) != 0) {
    return;
  }
  var newLeft = currentLeft - 800;
  if (index == totalNumberOfImages) {
    index = 0;
    newLeft = 0;
    var dummyid = setInterval(function () {
      if (currentLeft == newLeft) {
        clearInterval(dummyid);
        changeCircle();
      }
      carouselWrapper.style.left = currentLeft + 'px';
      currentLeft += 40;
    }, 5)
  } else {
    var dummyid = setInterval(function () {
      if (currentLeft == newLeft) {
        clearInterval(dummyid);
        changeCircle();
      }
      carouselWrapper.style.left = currentLeft + 'px';
      currentLeft -= 10;

    }, 10)
  }
  index++;
}


function changeCircle(){
  listOfButtons[index-1].classList.add('bigger-circle');
  removeAllStyles();

}

function changeImage(clickedButton){
  var oldIndex = index;
  for(var i = 0; i<totalNumberOfImages; i++){
    if(listOfButtons[i]==clickedButton){
      index = i+1;
      break;
    }
  }
  animateImage(oldIndex);
  removeAllStyles();
  clickedButton.classList.add('bigger-circle');
  
}
function removeAllStyles(){
  for(var i = 0; i<totalNumberOfImages;i++){
    if(i==index-1){
      continue;
    }
    listOfButtons[i].classList.remove('bigger-circle');
  }
}
function animateImage(oldIndex){
  if(oldIndex==index){
    return;
  } else if(index < oldIndex){
    var leftIncrement = (oldIndex-index)*20;
    var currentLeft = parseInt(carouselWrapper.style.left);
    var newLeft = -(index-1)*800;
    var dummyid = setInterval(function () {
      if (currentLeft == newLeft) {
        clearInterval(dummyid); 
      }
      carouselWrapper.style.left = currentLeft + 'px';
      currentLeft += leftIncrement;
    }, 10);
  } else {
    var rightIncrement = (index-oldIndex)*20;
    var currentRight = parseInt(carouselWrapper.style.left);
    var newRight = -(index-1)*800;
    var dummyid = setInterval(function () {
      if (currentRight == newRight) {
        clearInterval(dummyid); 
      }
      carouselWrapper.style.left = currentRight + 'px';
      currentRight -= rightIncrement;
    }, 10);
  }

}