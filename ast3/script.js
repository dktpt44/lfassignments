var boxcolors = ["#e44242", "#e44277", "#f82be7", "#872bf8", "#2b3ef8", "#2bf8ec", "#2bf860", "#82f82b", "#f6ff01", "#ffa201"]
//test with large number of balls cannot be made
//because a new ball here is made on a free space, so that it will not overlap the old one
//generating large number of balls, will result in empty free spaces.
var firstBallCollision = new boxCollision(5, 0, boxcolors).init();
var secondBallCollision = new boxCollision(15, 1, boxcolors).init();

function boxCollision(ballCount, cIndex, boxColors) {
  this.ballCount = ballCount;
  this.cIndex = cIndex;
  var totalColors = boxColors.length;
  var velocityX = [];
  var velocityY = [];

  var allBoxes = [];
  var mainBox = document.getElementsByClassName('main-box')[this.cIndex];

  this.init = function () {
    this.makeBox();
    this.assignVelocities();
    this.moveBox();
  }
  this.assignVelocities = function () {
    for (var i = 0; i < this.ballCount; i++) {
      velocityX[i] = getRandomNum(-5, 5);
      velocityY[i] = getRandomNum(-5, 5);
    }
  }

  this.makeBox = function () {
    for (var index = 0; index < this.ballCount; index++) {
      var newBoxElement = document.createElement('div');
      newBoxElement.classList.add('small-boxes');

      var widthHeight = getRandomNum(10, 50);
      var upLimit = 500 - widthHeight;
      var x = getRandomNum(2, upLimit);
      var y = getRandomNum(2, upLimit);

      if (allBoxes.length >= 1) {
        var findAgain = true;

        while (findAgain) {
          findAgain = false;
          for (oldBox of allBoxes) {
            var oldWH = parseInt(oldBox.style.width);
            var lowerx = parseInt(oldBox.style.left);
            var upperx = lowerx + oldWH;
            var lowery = parseInt(oldBox.style.top);
            var uppery = lowery + oldWH;
            if (x + widthHeight >= lowerx &&
              x <= upperx &&
              y + widthHeight >= lowery &&
              y <= uppery) {
              findAgain = true;
              x = getRandomNum(2, upLimit);
              y = getRandomNum(2, upLimit);
              break;
            }
          }
        }
      }

      newBoxElement.style.width = widthHeight + 'px';
      newBoxElement.style.height = widthHeight + 'px';
      newBoxElement.style.top = y + 'px';
      newBoxElement.style.left = x + 'px';
      newBoxElement.style.backgroundColor = boxColors[Math.floor(getRandomNum(1, totalColors + 1)) - 1];
      allBoxes.push(newBoxElement);
      mainBox.appendChild(newBoxElement);
    }


  }

  this.moveBox = function () {
    setInterval(changexy, 20);
  }

  function changexy() {
    var boxIndex = 0;
    for (oldBox of allBoxes) {
      var oldX = parseInt(oldBox.style.left);
      var oldY = parseInt(oldBox.style.top);
      var boxWH = parseInt(oldBox.style.width);

      var innerBoxIndex = boxIndex + 1;

      var newX = oldX + velocityX[boxIndex];
      var newY = oldY + velocityY[boxIndex];

      while (innerBoxIndex < allBoxes.length) {
        var nextBoxes = allBoxes[innerBoxIndex];
        var oldWH = parseInt(nextBoxes.style.width);
        var lowerx = parseInt(nextBoxes.style.left);
        var upperx = lowerx + oldWH;
        var lowery = parseInt(nextBoxes.style.top);
        var uppery = lowery + oldWH;
        if (newX + boxWH >= lowerx &&
          newX <= upperx &&
          newY + boxWH >= lowery &&
          newY <= uppery) {

          // velocityX[boxIndex] = -velocityX[boxIndex];
          // velocityY[boxIndex] = -velocityY[boxIndex];
          // velocityX[innerBoxIndex] = -velocityX[innerBoxIndex];
          // velocityY[innerBoxIndex] = -velocityY[innerBoxIndex];



          // Elastic collision
          var oldMass = oldWH * oldWH;
          var sumM = oldMass + boxWH * boxWH;
          var diffM = boxWH * boxWH - oldMass;
          var oldVx = velocityX[boxIndex];
          var oldVy = velocityY[boxIndex];
          velocityX[boxIndex] = (diffM / sumM) * velocityX[boxIndex] + ((2 * oldMass * velocityX[innerBoxIndex]) / sumM);
          velocityX[innerBoxIndex] = ((2 * boxWH * boxWH * oldVx) / sumM) - (diffM / sumM) * velocityX[innerBoxIndex];
          velocityY[boxIndex] = (diffM / sumM) * velocityY[boxIndex] + ((2 * oldMass * velocityY[innerBoxIndex]) / sumM);
          velocityY[innerBoxIndex] = (2 * boxWH * boxWH * oldVy) / sumM - (diffM / sumM) * velocityY[innerBoxIndex];

        }
        innerBoxIndex++;
      }
      var newX = oldX + velocityX[boxIndex];
      var newY = oldY + velocityY[boxIndex];

      if (newX >= 500 - boxWH) {
        velocityX[boxIndex] = -velocityX[boxIndex];
      }
      if (newY >= 500 - boxWH) {
        velocityY[boxIndex] = -velocityY[boxIndex];
      }
      if (newX <= 0) {
        velocityX[boxIndex] = -velocityX[boxIndex];
      }
      if (newY <= 0) {
        velocityY[boxIndex] = -velocityY[boxIndex];
      }

      var newX = oldX + velocityX[boxIndex];
      var newY = oldY + velocityY[boxIndex];
      oldBox.style.top = newY + 'px';
      oldBox.style.left = newX + 'px';

      boxIndex++;
    }
  }
  function getRandomNum(min, max) {
    while (true) {
      var returnNum = Math.random() * (max - min) + min;
      if (returnNum < -1 || returnNum > 1) {
        return returnNum;
      }
    }
  }
}









// Ant-smasher






var firstAntSmasher = new antSmasher(10, 0).init();

function antSmasher(antCount, cIndex) {
  this.antCount = antCount;
  this.cIndex = cIndex;
  var velocityX = [];
  var velocityY = [];
  var allAnts = [];
  var mainBox = document.getElementsByClassName('ant-smasher')[this.cIndex];

  this.init = function () {
    this.makeAnts();
    this.assignVelocities();
    this.moveAnts();
  }

  this.assignVelocities = function () {
    for (var i = 0; i < this.antCount; i++) {
      velocityX[i] = getRandomNum(-8, 8);
      velocityY[i] = getRandomNum(-8, 8);
    }
  }

  this.makeAnts = function () {
    for (var index = 0; index < this.antCount; index++) {
      var newBoxElement = document.createElement('div');
      newBoxElement.classList.add('ants');
      var x = getRandomNum(2, 750);
      var y = getRandomNum(2, 550);
      if (allAnts.length >= 1) {
        var findAgain = true;
        while (findAgain) {
          findAgain = false;
          for (oldBox of allAnts) {
            var oldWH = parseInt(oldBox.style.width);
            var lowerx = parseInt(oldBox.style.left);
            var upperx = lowerx + oldWH;
            var lowery = parseInt(oldBox.style.top);
            var uppery = lowery + oldWH;
            if (x + 50 >= lowerx &&
              x <= upperx &&
              y + 50 >= lowery &&
              y <= uppery) {
              findAgain = true;
              x = getRandomNum(2, upLimit);
              y = getRandomNum(2, upLimit);
              break;
            }
          }
        }
      }

      newBoxElement.style.top = y + 'px';
      newBoxElement.style.left = x + 'px';
      allAnts.push(newBoxElement);
      var antImg = document.createElement('img');
      antImg.setAttribute('src', 'images/ant.gif');
      newBoxElement.appendChild(antImg);
      newBoxElement.onclick = function (e) {
        killAnt(e.target);
      }
      mainBox.appendChild(newBoxElement);
    }
  }
  function killAnt(ant) {
    ant.style.display = "none";
    // mainBox.removeChild(ant);
  }

  this.moveAnts = function () {
    setInterval(changexy, 25);
  }




  function changexy() {
    var boxIndex = 0;
    for (oldBox of allAnts) {
      var oldX = parseInt(oldBox.style.left);
      var oldY = parseInt(oldBox.style.top);
      var boxWH = 50;

      var innerBoxIndex = boxIndex + 1;


      var newX = oldX + velocityX[boxIndex];
      var newY = oldY + velocityY[boxIndex];

      while (innerBoxIndex < allAnts.length) {
        
        var nextBoxes = allAnts[innerBoxIndex];
        var oldWH = 50;
        var lowerx = parseInt(nextBoxes.style.left);
        var upperx = lowerx + oldWH;
        var lowery = parseInt(nextBoxes.style.top);
        var uppery = lowery + oldWH;
        if (newX + boxWH >= lowerx &&
          newX <= upperx &&
          newY + boxWH >= lowery &&
          newY <= uppery) {

          // Elastic collision
          var oldMass = oldWH * oldWH;
          var sumM = oldMass + boxWH * boxWH;
          var diffM = boxWH * boxWH - oldMass;
          var oldVx = velocityX[boxIndex];
          var oldVy = velocityY[boxIndex];
          velocityX[boxIndex] = (diffM / sumM) * velocityX[boxIndex] + ((2 * oldMass * velocityX[innerBoxIndex]) / sumM);
          velocityX[innerBoxIndex] = ((2 * boxWH * boxWH * oldVx) / sumM) - (diffM / sumM) * velocityX[innerBoxIndex];
          velocityY[boxIndex] = (diffM / sumM) * velocityY[boxIndex] + ((2 * oldMass * velocityY[innerBoxIndex]) / sumM);
          velocityY[innerBoxIndex] = (2 * boxWH * boxWH * oldVy) / sumM - (diffM / sumM) * velocityY[innerBoxIndex];

        }
        innerBoxIndex++;
      }


      var newX = oldX + velocityX[boxIndex];
      var newY = oldY + velocityY[boxIndex];



      if (newX >= 800 - boxWH) {
        velocityX[boxIndex] = -velocityX[boxIndex];
      }
      if (newY >= 600 - boxWH) {
        velocityY[boxIndex] = -velocityY[boxIndex];
      }
      if (newX <= 0) {
        velocityX[boxIndex] = -velocityX[boxIndex];
      }
      if (newY <= 0) {
        velocityY[boxIndex] = -velocityY[boxIndex];
      }

      var newX = oldX + velocityX[boxIndex];
      var newY = oldY + velocityY[boxIndex];
      oldBox.style.top = newY + 'px';
      oldBox.style.left = newX + 'px';

      boxIndex++;
    }
  }
  function getRandomNum(min, max) {
    while (true) {
      var returnNum = Math.random() * (max - min) + min;
      if (returnNum < -1 || returnNum > 1) {
        return returnNum;
      }
    }
  }
}




















//makingeditsforcheckingcollision



