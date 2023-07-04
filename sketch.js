var canvas;
var backgroundImage;
var database,gameState;
var form, game, player;
var playerCount;
var car1,car2,cars=[];
var car1_img,car2_img,track;
var allPlayers;
var fuels,powerCoins;
var fuelImage, powerCoinImage;

function preload() {
 backgroundImage = loadImage("./assets/background.png");
  car1_img = loadImage("/assets/car1.png");
  car2_img = loadImage("/assets/car2.png");
  track = loadImage("/assets/track.jpg");
  fuelImage = loadImage("./assets/fuel.png");
  powerCoinImage = loadImage("./assets/goldCoin.png");
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
 background(backgroundImage);
// background("red");

  if(playerCount == 2){
     game.update(1);

  }

  if(gameState==1){
    console.log("gamestate updated")
    game.play();
  }
}
