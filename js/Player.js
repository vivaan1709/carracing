
//getCount is the function to read the playerCount from the firebase database into our variable.
//1st create a reference to specific node(playerCount)  
//.on is a listener which will listen to the changes in the database
//once changes are done to a database the playerCount will get updated
//and it will perform an action in response to those changes
//"value" is an event type which we want to listen to.
class Player {
  constructor() {
   this.index=null;
   this.name=null;
   this.positionX=0;
   this.positionY=0;
   this.fuel=185;
   this.score = 0 ;
   this.rank=0;
  }

addPlayer(){ 
  
    var playerIndex = "players/player"+this.index;

    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      score: this.score,
      rank:this.rank
    });
  }

    getDistance()
    {
      console.log("123");
      var playerDistanceRef = database.ref("players/player"+this.index);
      playerDistanceRef.on("value", (data) => { 
       var data = data.val(); 
       console.log(data);
       this.positionX=data.positionX;
       this.positionY=data.positionY;
      });
     console.log(this.positionX);
    }

    update() {
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).update({
        name: this.name,
        positionX: this.positionX,
        positionY: this.positionY,
        score:this.score,
        rank:this.rank

       });
      
    }
  

    getPlayersInfo()
    {
      var playerInfoRef = database.ref("players");
      playerInfoRef.on("value", (data) => {
      allPlayers = data.val();
      console.log(allPlayers);
         
     })

    }

    getCarsAtEnd() //we are updating the rank
    {
      database.ref("carsAtEnd").on("value" , (data) => {
        this.rank = data.val(); 
      } )

    }
  
  getCount() {
    var playerCountRef = database.ref("playerCount");//creating a reference to a database(at playerCount)
    playerCountRef.on("value", (data) => { 
      playerCount = data.val();  //.val() will capture the value from the playerCount 
    });
  }

  //updateCount is a function to update the playerCount of the database
  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    });

  }

   updateCarsAtEnd(rank){
    database.ref("/").update({
      carsAtEnd : rank
    })

   }
  
}
