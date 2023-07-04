class Game {
  constructor() {
    this.resetButton = createButton("reset");
    this.leaderBoardTitle=createElement("h2");
    this.leader1=createElement("h2");
    this.leader2=createElement("h2");
  }
//getState is reading from the database 
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  //update(state)writing into the database
  update(state) {
    console.log(state)
    database.ref("/").update({

      gameState: state
    });
  }


   start(){
   form=new Form();
   form.display();
   player=new Player();
   playerCount = player.getCount();

   car1 = createSprite(width / 2 - 50, height - 10);
   car1.addImage("car1", car1_img);
   car1.scale = 0.07;

   car2 = createSprite(width / 2 + 100, height - 10);
   car2.addImage("car2", car2_img);
   car2.scale = 0.07;

   cars = [car1, car2];

   fuels = new Group();
   powerCoins = new Group();

   // Adding fuel sprite in the game
   //we are adding fuels to our game
   //
   this.addSprites(fuels, 4, fuelImage, 0.02);//calling a function-'addSprites;

   // Adding coin sprite in the game
   this.addSprites(powerCoins, 18, powerCoinImage, 0.09);

   }
   //spriteGroup=fuels,numberOfSprites=4,spriteImage-fuelImage,scale=0.02
   addSprites(spriteGroup, numberOfSprites, spriteImage, scale) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;

      x = random(width / 2 + 150, width / 2 - 150);
      y = random(-height * 4.5, height - 400);

      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  }

   play(){
   
    console.log("hello")
    form.hide();

    form.titleImg.position(30, 50);
    form.titleImg.class("gameTitleAfterEffect");
  //  this.resetTitle.html("resetGame");
  //  this.resetTitle.class("resetText");
  //  this.resetTitle.position(width/2+200,50)
    this.resetButton.class("resetButton");
    this.resetButton.position(windowWidth/2+500,windowHeight/2-280);

    this.leaderBoardTitle.html("leaderBoard");
    this.leaderBoardTitle.class("resetText");
    this.leaderBoardTitle.position(width/3-50,40);
    this.leader1.class("leadersText");
    this.leader1.position(width/3-50,80);
    this.leader2.class("leadersText");
    this.leader2.position(width/3-50,130);

    this.handleResetButton();
    player.getPlayersInfo();
    player.getCarsAtEnd();

  
      if (allPlayers !== undefined) {
        image(track, 0, -height*4, width,height * 6);
        this.showLeaderBoard();
  
        //index of the array
        var index = 0;
        for (var plr in allPlayers) {
          //use data form the database to display the cars in x and y direction
          //61 to 65 means that we are fetching the details of the individual players from 
          //the allPlayers object using index 'plr' and we are storing the position of each player
          //refered by 'plr' index and assigning it to 'cars'
          var x = allPlayers[plr].positionX;
          var y = height - allPlayers[plr].positionY;
          index = index + 1;
          cars[index-1].position.x = x;
          cars[index-1].position.y = y;

          if (index === player.index) {
            stroke(10);
            fill("red");
            ellipse(x, y, 60, 60);
            camera.position.y=cars[index-1].position.y;

            this.handleFuel(index);
            this.handlePowerCoins(index);
          }
        }
   
        this.handlePlayerControls();
        const finishLine=height*3;
        console.log(finishLine);
        console.log(player.positionY);
        if(player.positionY > finishLine){
         gameState=2;
         player.rank +=1;
         player.update();
         player.updateCarsAtEnd(player.rank);
         this.showRank();

        }
        drawSprites();
      }
    }
    showRank(){
      // swal({  
      //   title: "Good job!",  
      //   text: "Click!",  
      //   icon: "success",  
      //   button: "oh yes!" 
      // }); 
      console.log("showtheRank");
    }
    
    handlePlayerControls()
    {
      if (keyIsDown(UP_ARROW)) 
      {
      player.positionY += 20;
      player.update();
      }
      if (keyIsDown(LEFT_ARROW)&& player.positionX > width/2-200) 
      {
      player.positionX -= 5;
      player.update();
      }
      if (keyIsDown(RIGHT_ARROW)&& player.positionX < width/2+200) 
      {
      player.positionX += 5;
      player.update();
      }
  }

   handleResetButton()
   {
     this.resetButton.mousePressed( ()=>{
     database.ref("/").set({
      gameState:0,
      playerCount:0,
      players:{},
      carsAtEnd: 0 
     })
     window.location.reload;
     }
     )

   }
  
   handleFuel(index) {
    // Adding fuel
    cars[index - 1].overlap(fuels, function(collector, collected) {
      player.fuel = 185;
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
    });
  }

  handlePowerCoins(index){
   cars[index - 1].overlap(powerCoins,function(collector,collected){
   player.score += 20;
   player.update();
    collected.remove();
   })

  }

  showLeaderBoard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      // &emsp;    This tag is used for displaying four spaces.
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;

      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }

    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;

      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }
   
}


