
     
//Globals
var startFlight = false;
var starPassed = false;
var numberOfStarts = 1000;
var colorRatio = 0;
var ratio = 400;
var stars = [];
var speed = 4;
var mouse_x, mouse_y;
var bg;
var hyperDrive = false;
var x = 0, y = 0, z = 0;
//Screen Size
var pScreen;
      
var canvas = {
  w : 0,
  h : 0, 
  context : null
}
      
/**
 * The start object
 */
function star(x, y ,z, oX, oY){
          
  this.x = x;
  this.y = y;
  this.z = z;
  this.oX = oX;
  this.oY = oY;
          
  this.draw = function(){
    canvas.context.lineWidth = (1 - colorRatio * this.z) * 2;
    canvas.context.beginPath();
    canvas.context.moveTo(this.star_x_save, this.star_y_save);
    canvas.context.lineTo(this.oX, this.oY);
    canvas.context.stroke();
    canvas.context.closePath();                         
  }
}            
      
function init(){
          
  var pScreen = $pScreen();
          
  // Create Stars
  mouse_x = pScreen.w / 2;
  mouse_y = pScreen.h / 2;
  x = Math.round( pScreen.w / 2);
  y = Math.round( pScreen.h / 2);
  z =( pScreen.w + pScreen.h ) / 2;
          
  for(var i = 0;i < numberOfStarts;i++)
  {
              
    //console.log(z);
    colorRatio = 1/z;
    //ratio = 5;
    // console.log(colorRatio);
    //cursor_x = x;
    //cursor_y =y;
              
    //                    stars.push(new star(
    //                    Math.random() * pScreen.w * 2 - x * 2,
    //                    Math.random() * pScreen.h * 2 - y * 2,
    //                    Math.round(Math.random() * z),
    //                    0,
    //                    0
    //                ));
    stars.push(new star(
      Math.random() * pScreen.w * 2 - x * 2,
      Math.random() * pScreen.h * 2 - y * 2,
      Math.round(Math.random() * z),
      0,
      0
    ));
    //console.log( pScreen)

  }
          
  //set the stage
  var playground = $getE("playground");
  playground.width = pScreen.w;
  playground.height = pScreen.h;
  playground.style.background = '#000';
  canvas.context = playground.getContext('2d');
          
          
  //The Space is Dark
  canvas.context.fillStyle= 'rgb(0,0,0)';
  //canvas.context.fillStyle= 'rgba(0,0,0,' + opacity + ')';
  //And stars are White
  canvas.context.strokeStyle='rgb(255,255,255)';
     
}
      
      
var gameLoop = function(){
          
  //canvas.context.fillRect(0, 0, pScreen.w, pScreen.h);
  
  canvas.context.drawImage(bg, 0, 0);
          
  //Get the global: position of the mouse pointer

          
          
  for(var i = 0 ; i < stars.length; i++){
    starPassed = true;
              
    //Old Position
    star_x_save = stars[i].oX;
    star_y_save = stars[i].oY;
              
              
    //stars[i].x += mouse_x >> 4; 
              
    if(stars[i].x > x << 1) { 
      stars[i].x -= pScreen.w << 1; 
      starPassed = false; 
    } 
    if(stars[i].x < -x << 1) { 
      stars[i].x += pScreen.w << 1; 
      starPassed = false; 
    }
              
    //stars[i].y += mouse_y >> 4; 
              
    if(stars[i].y > y << 1) {
      stars[i].y -= pScreen.h << 1; 
      starPassed = false; 
    } 
    if(stars[i].y < -y << 1) { 
      stars[i].y +=  pScreen.h <<1; 
      starPassed = false;
    }
              
    stars[i].z -= speed; 
              
    if(stars[i].z > z) { 
      stars[i].z -= z; 
      starPassed = false; 
    } 
              
    if(stars[i].z < 0 ) { 
      stars[i].z += z; 
      starPassed = false; 
    }
              
    stars[i].oX = x + (stars[i].x / stars[i].z) * ratio;
    stars[i].oY = y + (stars[i].y / stars[i].z) * ratio;
              
    stars[i].star_x_save = star_x_save;
    stars[i].star_y_save = star_y_save;
              
    if(star_x_save > 0 && star_x_save < pScreen.w && star_y_save > 0 && star_y_save < pScreen.h && starPassed){
      stars[i].draw()
    }
  }
  requestAnimationFrame(gameLoop)
}
      
//Window Finish Loading
window.onload = function(){
  
  
  $getE('playground').style.display = 'none';
  bg = new Image();        
  bg.onload = function(){
    $getE('hud').style.display = 'none';
    $getE('playground').style.display = 'block';
    init();
    gameLoop();
  }
  bg.src = 'bg.jpg';

}
      
window.onkeydown = function(e){
  if(e.keyCode == 32 && !hyperDrive){
    speed = 10;
    canvas.context.fillStyle = "rgba(0,0,0, 0.1)";
    hyperDrive = true;
  }
  else{
    speed = 4;
    canvas.context.fillStyle = "rgb(0,0,0)";                    
    hyperDrive = false;
  }
}
   