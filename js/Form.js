class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder","please enter your name");
    this.playButton = createButton("PLAY");
    this.titleImg = createImg("./assets/title.png", "game title");
    this.greeting = createElement("h3");
  }

  setElementsPosition() {
    this.titleImg.position(120,50);
    this.input.position(windowWidth/2-100,windowHeight/2-100);
    this.playButton.position(windowWidth/2-85,windowHeight/2-50);
    this.greeting.position(width / 2 - 300, height / 2 - 100);
  }

  setElementsStyle(){
    this.titleImg.class("gameTitle")
    this.input.class("customInput");
    this.playButton.class("customButton");
    this.greeting.class("greeting");
  }

  handleMousePressed() {
    this.playButton.mousePressed(() => {
      this.input.hide();
      this.playButton.hide();

      var message = `
      WELCOME ${this.input.value()}
      </br>Wait for another player to join...`;

      this.greeting.html(message);
      playerCount=playerCount+1;
      player.name = this.input.value();
      player.index = playerCount;
      console.log(player.index)
      player.addPlayer();
      player.updateCount(playerCount);
      player.getDistance();
    });
  }

  hide(){
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();

  }


  display(){
   this.setElementsPosition();
   this.setElementsStyle();
   this.handleMousePressed();
  }
}
