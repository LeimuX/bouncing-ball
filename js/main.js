var canvas,ctx,w,h;
window.onload=init;
function init(){
  canvas=document.querySelector("#myCanvas");
  ctx=canvas.getContext("2d");
  w=canvas.width;
  h=canvas.height;
}