var dog,happyDog,FoodS,FoodStock;
var happyDog2;
var database
function preload()
{
  happyDog = loadImage("dogImg.png");
  happyDog2 = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(650,600);
  database = firebase.database();

  dog = createSprite(300,280);
  dog.addImage(happyDog);
  dog.scale = 0.5;

  FoodStock = database.ref('Food');
  FoodStock.on("value",readStock);

}


function draw() {  
  background(46, 139, 87);
  
  if(keyWentDown(UP_ARROW)){
  writeStock(FoodS);
  dog.addImage(happyDog2);
}
textSize(30); 
fill("blue");
text("FOOD REMAINING: " + FoodS,100,550);
text("PRESS UP ARROW TO FEED THE ",80,45);
text("ONE AND ONLY COOKIE",130,75);
  
drawSprites();
 }

function writeStock(x){
if(x <= 0){
  x = 0;
}
else{
  x = x-1;
}
database.ref('/').update({
  'Food': x
})
}

function readStock(data){
FoodS = data.val();
}