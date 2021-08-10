var dog, dogImg, dogHappy;
var database;
var foodS, foodStock;

function preload() {
  
  dogImg = loadImage("Dog.png");
  dogHappy = loadImage("happydog.png");
  
}

function setup() {

  createCanvas(500, 500);
  
  database = firebase.database();

  dog = createSprite(250, 350, 30, 30);
  dog.addImage(dogImg);
  dog.scale = 0.20;

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  
}


function draw() {  

  background(rgb(46, 139, 87));

  if(keyWentDown(UP_ARROW)) {
    foodS = foodS - 1;
    writeStock(foodS);
    dog.addImage(dogHappy);
  }
  else if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }

  if(foodS <= 0) {

    

    if(keyWentDown(UP_ARROW)) {
      foodS = 0;
      writeStock(foodS);
      dog.addImage(dogImg);
    }

  }

  if(keyCode === 82) {
    foodS = 20;
  }

  drawSprites();
  
  
  fill("white");
  stroke("5")
  textSize(15);
  text("Note: *Press UP_ARROW Key to Feed Drago!!*", 20, 40);

  fill("green");
  stroke("20") 
   textSize(15);
  text("Food Remaining = " + foodS, 150, 200);

  fill("black");
    textSize(15);
    text("Press the 'R' key to refill", 150, 480);

}


function readStock(data) {

  foodS = data.val();

}


function writeStock(x) {

  database.ref("/").update({
    Food:x
  })

}
