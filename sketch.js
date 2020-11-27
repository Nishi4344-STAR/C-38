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
  dog.scale = 0.11;

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

    fill("yellow");
    textSize(25);
    text("Press the 'R' key to replay", 100, 450);

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
  
  fill("skyBlue");
  textSize(30);
  text("Food Remaining : " + foodS, 100, 250);

  fill("white");
  textSize(20);
  text("Note : To feed Choco(doggy), press the UP arrow key", 13, 40);

}


function readStock(data) {

  foodS = data.val();

}


function writeStock(x) {

  database.ref("/").update({
    Food:x
  })

}
