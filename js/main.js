var canvas,ctx,w,h;
window.onload=init;
var ball={
  x:100,
  y:100,
  r:10,
  speedX:3,
  speedY:2,
  color:"blue"
}
var monster={
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
  mainLoop();
}
function mainLoop() {
  //擦除画板
  ctx.clearRect(0,0,w,h);
  //绘制monster和ball
  drawMonster(monster);
  drawball(ball);
  //更新小球位置
  updateBallPos(ball);
  //再次绘制
  requestAnimationFrame(mainLoop);
}
function drawMonster(m){
  ctx.save();
  ctx.fillStyle=m.color;
  ctx.translate(m.x,m.y);
  ctx.fillRect(0,0,m.width,m.height);
  ctx.restore();
}
function drawball(b) {
  ctx.save();
  ctx.fillStyle=b.color;
  ctx.translate(b.x,b.y);
  ctx.beginPath();
  ctx.arc(0,0,b.r,0,Math.PI*2);
  ctx.fill();
  ctx.restore();
}
function updateBallPos(b) {
  b.x+=b.speedX;
  b.y+=b.speedY;
  testCollisionBallWithWall(b);
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