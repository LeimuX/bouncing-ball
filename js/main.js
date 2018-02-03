var canvas,ctx,w,h,balls,mousePos;
window.onload=init;
var player={
  x:10,
  y:10,
  width:10,
  height:10,
  color:"red"
}
function init(){
  canvas=document.querySelector("#myCanvas");
  ctx=canvas.getContext("2d");
  w=canvas.width;
  h=canvas.height;
  balls=createBalls(10);
  canvas.addEventListener("mousemove",mouseMoved);
  mainLoop();
}
function mouseMoved(e){
  mousePos=getMousePos(e);
}
function getMousePos(e) {
  var canvasRect=canvas.getBoundingClientRect();
  
  return {
    x:(e.clientX-canvasRect.left),
    y:(e.clientY-canvasRect.top)
  }
}
function mainLoop() {
  //擦除画板
  ctx.clearRect(0,0,w,h);
  //绘制player和ball
  drawPlayer(player);
  drawBalls();
  //显示剩余小球数
  showAliveBalls();


  //更新小球位置
  updateBallsPos();
  //更新玩家位置
  updatePlayerPos();
  
  //再次绘制
  requestAnimationFrame(mainLoop);
}
function showAliveBalls(){
  ctx.save();
  ctx.font="20px Arial";
  if(balls.length>0){
    ctx.fillText(balls.length,10,20);
  }
  else {
    ctx.fillText("你赢了",10,20);
  }
  ctx.restore();
}
function drawPlayer(m){
  ctx.save();
  ctx.fillStyle=m.color;
  ctx.translate(m.x,m.y);
  ctx.fillRect(0,0,m.width,m.height);
  ctx.restore();
}
function drawBalls() {
  balls.forEach(function(b){
    drawCircle(b);
  });
}
function drawCircle(b) {
  ctx.save();
  ctx.fillStyle=b.color;
  ctx.translate(b.x,b.y);
  ctx.beginPath();
  ctx.arc(0,0,b.r,0,Math.PI*2);
  ctx.fill();
  ctx.restore();
}
function updateBallsPos() {
  balls.forEach(function(b,idx){
    b.x+=b.speedX;
    b.y+=b.speedY;
    testCollisionBallWithWall(b);
    testCollisionBallWithPlayer(b,idx);
  })
}
function updatePlayerPos() {
  if(mousePos){
  player.x=mousePos.x-player.width/2;
  player.y=mousePos.y-player.height/2;
}
 
}
function testCollisionBallWithPlayer(b,idx) {
  
    var isIntersect=ballRectIntersect(b.x,b.y,b.r,player.x,player.y,player.width,player.height);
    
    if(isIntersect) {
      //把与矩形相交的小球从数组剔除
      console.log("isInterset");
      balls.splice(idx,1);
    }
  }

function ballRectIntersect(centerX,centerY,radius,rectX,rectY,rectW,rectH){
  //参数分别为：小球圆心x坐标、y坐标、小球半径、矩形左上角x坐标、y坐标、
  //矩形宽度、高度。
  var testX=centerX,testY=centerY;
  //寻找矩形上距小球圆心最近的点
  if(testX<rectX) {
    testX=rectX;
  }
  if(testX>(rectX+rectW)) {
    testX=rectX+rectW;
  }
  

  if(testY<rectY){
    testY=rectY;
  }
  if(testY>(rectY+rectH)) {
    testY=rectY+rectH;
  }
  
  return (((testY-centerY)*(testY-centerY)+(testX-centerX)*(testX-centerX))<radius*radius);
}
function testCollisionBallWithWall(b) {
  if((b.x+b.r)>w) {
    //小球超出右墙
    b.speedX=-b.speedX;
    b.x=w-b.r; //将小球至于右边缘
  }
  else if((b.x-b.r)<0) { //小球超出左墙
    b.speedX=-b.speedX;
    b.x=b.r;
  }

  if((b.y+b.r)>h) {//小球触及地面
    b.speedY=-b.speedY;
    b.y=h-b.r;  //将小球放置于地面上
  }
  else if((b.y-b.r)<0){ //小球碰到顶部
    b.speedY=-b.speedY;
    b.y=b.r;

  }
}
function createBalls(n) {
  var ballArrs=[];
  for(var i=0;i<n;i++) {
    var ball={
      x:w/2,
      y:h/2,
      r:25*Math.random()+5,
      speedX:-3+6*Math.random(),
      speedY:-3+6*Math.random(),
      color:getRandomColor()
    }
    ballArrs.push(ball);
  }
  return ballArrs;
}
function getRandomColor(){
  var colors=['red', 'blue', 'cyan', 'purple', 'pink', 'green', 'yellow'];
  var idx=Math.round(Math.random()*(colors.length-1));
  return colors[idx];
}