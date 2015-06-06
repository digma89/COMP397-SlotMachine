/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="objects/button.ts" />
// Game Framework Variables
var canvas = document.getElementById("canvas");
var stage;
var stats;
var assets;
var manifest = [
    { id: "btnSpin", src: "assets/images/btnSpin.png" },
    { id: "btnOff", src: "assets/images/btnOff.png" },
    { id: "btnReset", src: "assets/images/btnReset.png" },
    { id: "btn100", src: "assets/images/btn100.png" },
    { id: "btn50", src: "assets/images/btn50.png" },
    { id: "btn10", src: "assets/images/btn10.png" },
    { id: "clicked", src: "assets/audio/clicked.wav" }
];
// Game Variables
var helloLabel; // create a reference
var plusButton;
// Game Objects
var background;
var btnSpin;
var btnOff;
var btnReset;
var btn100;
var btn50;
var btn10;
// Preloader Function
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    // event listener triggers when assets are completely loaded
    assets.on("complete", init, this);
    assets.loadManifest(manifest);
    //Setup statistics object
    setupStats();
}
// Callback function that initializes game objects
function init() {
    stage = new createjs.Stage(canvas); // reference to the stage
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60); // framerate 60 fps for the game
    // event listener triggers 60 times every second
    createjs.Ticker.on("tick", gameLoop);
    // calling main game function
    main();
}
// function to setup stat counting
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // set to fps
    // align bottom-right
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
// Callback function that creates our Main Game Loop - refreshed 60 fps
function gameLoop() {
    stats.begin(); // Begin measuring
    stage.update();
    stats.end(); // end measuring
}
// Callback function that allows me to respond to button click events
function pinkButtonClicked(event) {
    createjs.Sound.play("clicked");
}
// Callback functions that change the alpha transparency of the button
// Our Main Game Function
function main() {
    console.log("Game is Running");
    createUI();
    /*
        helloLabel = new createjs.Text("Hello World!", "40px Consolas", "#000000");
        helloLabel.regX = helloLabel.getMeasuredWidth() * 0.5;
        helloLabel.regY = helloLabel.getMeasuredHeight() * 0.5;
        helloLabel.x = 160;
        helloLabel.y = 190;
        stage.addChild(helloLabel);
    
    
    */
}
//Function tu create all the user interface
function createUI() {
    background = new createjs.Bitmap("assets/images/background.jpg");
    stage.addChild(background); // Add the background to the game container
    btnSpin = new objects.Button(assets.getResult("btnSpin"), 358, 439, false);
    stage.addChild(btnSpin);
    btnSpin.on("click", pinkButtonClicked);
    btnOff = new objects.Button(assets.getResult("btnOff"), 382, 126, false);
    stage.addChild(btnOff);
    btnOff.on("click", closeWindow);
    btnReset = new objects.Button(assets.getResult("btnReset"), 60, 125, false);
    stage.addChild(btnReset);
    btn100 = new objects.Button(assets.getResult("btn100"), 214, 441, false);
    stage.addChild(btn100);
    btn50 = new objects.Button(assets.getResult("btn50"), 147, 441, false);
    stage.addChild(btn50);
    btn10 = new objects.Button(assets.getResult("btn10"), 79, 441, false);
    stage.addChild(btn10);
}
function closeWindow() {
    window.open('', '_self', '');
    window.close();
}
//# sourceMappingURL=game.js.map