var anim1 = new helixAnim().init();

function helixAnim(){
  this.container;
  this.width=800;
  this.height=500;
  this.rows = 11;
  this.columns = 20;
  this.minTop = 80;
  this.nextBallDown = 20; //median ball size
  this.maxBallWH= 28;
  this.moveDownDist = 60;
  this.minLeft = 30;
  this.movingDist;
  this.newMinTop;
  this.newBotTop;
  this.columnGap=1;
  this.ballsArray1;
  this.ballsArray2;
  this.animInterval;

  this.init = function() {
    this.container = document.getElementsByClassName('helix-anim')[0];
    this.container.style.width=this.width+'px';
    this.container.style.height=this.height+'px';
    // creating 2d array to hold all the balls.
    this.ballsArray1 = new Array(this.rows);
    for(var i = 0; i<this.ballsArray1.length; i++) {
      this.ballsArray1[i] = new Array(this.columns);
    }
    this.ballsArray2 = new Array(this.rows);
    for(var i = 0; i<this.ballsArray2.length; i++) {
      this.ballsArray2[i] = new Array(this.columns);
    }
    this.createBalls();
    this.animInterval = setInterval(this.animateBalls.bind(this),20);
  }
  this.createBalls = function(){
    for(var i =0;i<this.columns;i++){
      for(var j=0;j<this.rows;j++){
        var newBall = new ball(this.container);
        var wid = this.nextBallDown-j*1.7;
        newBall.width = wid;
        newBall.height = wid;
        newBall.movingup=true;
        newBall.left=this.minLeft+i*this.columnGap+i*this.maxBallWH+(this.nextBallDown-wid)/2;
        newBall.top=this.minTop+j*this.nextBallDown+25*Math.sin((newBall.left-this.minLeft)/80-(Math.PI/2));
        newBall.init();
        this.ballsArray1[j][i] = newBall;
      }
    }
    this.newMinTop = this.minTop+25*Math.sin(-(Math.PI/2))+2;
    this.movingDist = 50;
    for(var i =0;i<this.columns;i++){
      for(var j=this.rows-1;j>=0;j--){
        var newBall = new ball(this.container);
        var wid = this.nextBallDown-(this.rows-j)*1.7;
        newBall.width = wid;
        newBall.height = wid;
        newBall.movingup=false;
        newBall.left=this.minLeft+i*this.columnGap+i*this.maxBallWH+(this.nextBallDown-wid)/2;
        newBall.top=this.moveDownDist+this.minTop+j*this.nextBallDown+25*Math.sin((newBall.left-this.minLeft)/80+(Math.PI/2));
        newBall.init();
        // newBall.style.backgroundColor='red';
        this.ballsArray2[j][i] = newBall;
      }
    }
    this.newBotTop = this.moveDownDist+this.minTop+this.rows*this.nextBallDown+25*Math.sin((Math.PI/2));

  }
  this.animateBalls = function(){

    for(var i =0;i<this.columns;i++){
      for(var j=0;j<this.rows;j++){
        var thisBall = this.ballsArray1[j][i];
        var thisBall2 = this.ballsArray2[j][i];
        if(thisBall.movingup){
          thisBall.top--;
        }else{
          thisBall.top++;
        }
        thisBall.move();
        if(thisBall.top<=this.newMinTop){
          thisBall.movingup = false;
        } else if(thisBall.top>=this.newMinTop+this.movingDist+j*this.maxBallWH){
          thisBall.movingup = true;
        }

        if(thisBall2.movingup){
          thisBall2.top--;
        }else{
          thisBall2.top++;
        }
        thisBall2.move();
        if(thisBall2.top>=this.newBotTop){
          thisBall2.movingup = true;
        } else if(thisBall2.top<=this.newBotTop-this.movingDist-(this.rows-j)*this.maxBallWH){
          thisBall2.movingup = false;
        }
      }
    }

    

  }

}