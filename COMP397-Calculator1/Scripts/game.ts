/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />

/// <reference path="objects/button.ts" />


// Game Framework Variables
var canvas = document.getElementById("canvas");
var stage: createjs.Stage;
var stats: Stats;

var assets: createjs.LoadQueue;
var manifest = [
    { id: "btnSpin", src: "assets/images/btnSpin.png" },
    { id: "btnOff", src: "assets/images/btnOff.png" },
    { id: "btnReset", src: "assets/images/btnReset.png" },
    { id: "btn100", src: "assets/images/btn100.png" },
    { id: "btn50", src: "assets/images/btn50.png" },
    { id: "btn10", src: "assets/images/btn10.png" },
    { id: "Grapes", src: "assets/images/grape.png" },
    { id: "Banana", src: "assets/images/banana.png" },
    { id: "Orange", src: "assets/images/orange.png" },
    { id: "Cherry", src: "assets/images/cherry.png" },
    { id: "Bar", src: "assets/images/bar.png" },
    { id: "Lemon", src: "assets/images/lemon.png" },
    { id: "Blank", src: "assets/images/blank.png" },
    { id: "Seven", src: "assets/images/seven.png" },
    { id: "clicked", src: "assets/audio/clicked.wav" }
];


// Game Variables
var helloLabel: createjs.Text; // create a reference
var playerMoneyDisplay: objects.Text;
var playerBetDisplay: objects.Text;
var playerPayoutDisplay: objects.Text;
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var lemons = 0;
var sevens = 0;
var blanks = 0;


// Game Objects
var background: createjs.Bitmap;
var btnSpin: objects.Button;
var btnOff: objects.Button;
var btnReset: objects.Button;
var btn100: objects.Button;
var btn50: objects.Button;
var btn10: objects.Button;
var row1: createjs.Bitmap;
var row2: createjs.Bitmap;
var row3: createjs.Bitmap;

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
    stats.domElement.style.right = '0px'
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
function pinkButtonClicked(event: createjs.MouseEvent) {
    createjs.Sound.play("clicked");
}

// Callback functions that change the alpha transparency of the button


// Our Main Game Function
function main() {

    console.log("Game is Running");

    createUI();

   /* helloLabel = new createjs.Text("Hello World!", "40px Consolas", "#000000");
    helloLabel.regX = helloLabel.getMeasuredWidth() * 0.5;
    helloLabel.regY = helloLabel.getMeasuredHeight() * 0.5;
    helloLabel.x = 160;
    helloLabel.y = 190;
    stage.addChild(helloLabel);
    */


}

//Function tu create all the user interface ********************************************************************
function createUI() {

    //add background image
    background = new createjs.Bitmap("assets/images/background.jpg");
    stage.addChild(background); // Add the background to the game container

    //add Spin btn creating an object from the class Button
    btnSpin = new objects.Button(assets.getResult("btnSpin"), 358, 439,false);
    stage.addChild(btnSpin);
    btnSpin.on("click", spin);

    //add Off btn creating an object from the class Button
    btnOff = new objects.Button(assets.getResult("btnOff"), 382, 126, false);
    stage.addChild(btnOff);
    btnOff.on("click", closeWindow);

    //add Reset btn creating an object from the class Button
    btnReset = new objects.Button(assets.getResult("btnReset"), 60, 125, false);
    stage.addChild(btnReset);
    btnReset.on("click", resetAll);

    //add 100 btn creating an object from the class Button
    btn100 = new objects.Button(assets.getResult("btn100"), 214, 441, false);
    stage.addChild(btn100);
    //event to invoque method to add 100 to playerBet
    btn100.on("click", addingPlayerBet100);

    //add 50 btn creating an object from the class Button
    btn50 = new objects.Button(assets.getResult("btn50"), 147, 441, false);
    stage.addChild(btn50);
    //event to invoque method to add 50 to playerBet
    btn50.on("click", addingPlayerBet50);

    //add 10 btn creating an object from the class Button
    btn10 = new objects.Button(assets.getResult("btn10"), 79, 441, false);
    stage.addChild(btn10);
    //event to invoque method to add 10 to playerBet
    btn10.on("click", addingPlayerBet10);

    //add money text  creating an object from the class Text
    playerMoneyDisplay = new objects.Text(playerMoney.toString(), 124.5, 381);
    stage.addChild(playerMoneyDisplay);

    //add Bet text  creating an object from the class Text
    playerBetDisplay = new objects.Text(playerBet.toString(), 238.5, 381);
    stage.addChild(playerBetDisplay);

    //add Bet text  creating an object from the class Text
    playerPayoutDisplay = new objects.Text(winnings.toString(), 353.5, 381);
    stage.addChild(playerPayoutDisplay);



}


//function to increase bet and display it **********************************************************************
function addingPlayerBet100() {

    //increse bet
    playerBet += 100;
    if (playerBet > playerMoney) {
        playerBet -= 100;
    }
    //display bet
    stage.removeChild(playerBetDisplay);
    playerBetDisplay = new objects.Text(playerBet.toString(), 238.5, 381);
    stage.addChild(playerBetDisplay);
}


function addingPlayerBet50() {

    //increse bet
    playerBet += 50;
    if (playerBet > playerMoney) {
        playerBet -= 50;
    }
    //display bet
    stage.removeChild(playerBetDisplay);
    playerBetDisplay = new objects.Text(playerBet.toString(), 238.5, 381);
    stage.addChild(playerBetDisplay);
}

function addingPlayerBet10() {

    //increse bet
    playerBet += 10;
    if (playerBet > playerMoney) {
        playerBet -= 10;
    }
    //display bet
    stage.removeChild(playerBetDisplay);
    playerBetDisplay = new objects.Text(playerBet.toString(), 238.5, 381);
    stage.addChild(playerBetDisplay);
}


// When the player clicks the spin button the game kicks off **************************************************************************
function spin(){
    
    if (playerMoney == 0) {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            showPlayerStats();
            resetAll();
        }
    }
    else if (playerBet <= 0) {
        alert("All bets must be a positive $ amount.");
    }
    else if (playerBet <= playerMoney) {
        spinResult = Reels();
        //remove row images
        stage.removeChild(row1);
        stage.removeChild(row2);
        stage.removeChild(row3);
        //add image in the row 1 
        row1 = new createjs.Bitmap(assets.getResult(spinResult[0]));
        row1.x = 96;
        row1.y = 256;
        stage.addChild(row1);
        //add image in the row 2 
        row2 = new createjs.Bitmap(assets.getResult(spinResult[1]));
        row2.x = 212;
        row2.y = 255;
        stage.addChild(row2);
        //add image in the row 3 
        row3 = new createjs.Bitmap(assets.getResult(spinResult[2]));
        row3.x = 327;
        row3.y = 256;
        stage.addChild(row3);
        determineWinnings();
        turn++;
    }
    else {
        alert("Please enter a valid bet amount");
    }

}

/* When this function is called it determines the betLine results.**************************************************
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "Blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "Grapes";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "Banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "Orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "Cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "Bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "Lemon";
                lemons++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "Seven";
                sevens++;
                break;
        }
    }
    return betLine;
}

// Utility function to check if a value falls within a range of bounds ****************************************************************
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}

// This function calculates the player's winnings, if any *****************************************************************
function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if (bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (lemons == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (lemons == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else {
        lossNumber++;
        showLossMessage();
    }

}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    stage.removeChild(playerPayoutDisplay, playerMoneyDisplay, playerBetDisplay);
    //add Bet text  creating an object from the class Text
    playerPayoutDisplay = new objects.Text(winnings.toString(), 353.5, 381);
    stage.addChild(playerPayoutDisplay);
    //add money text  creating an object from the class Text
    playerMoneyDisplay = new objects.Text(playerMoney.toString(), 124.5, 381);
    stage.addChild(playerMoneyDisplay);
    resetFruitTally();
    playerBet = 0;
    //add Bet text  creating an object from the class Text
    playerBetDisplay = new objects.Text(playerBet.toString(), 238.5, 381);
    stage.addChild(playerBetDisplay);
    
    //checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    stage.removeChild(playerPayoutDisplay, playerMoneyDisplay, playerBetDisplay);
    //add Bet text  creating an object from the class Text
    playerPayoutDisplay = new objects.Text("0", 353.5, 381);
    stage.addChild(playerPayoutDisplay);
    //add money text  creating an object from the class Text
    playerMoneyDisplay = new objects.Text(playerMoney.toString(), 124.5, 381);
    stage.addChild(playerMoneyDisplay);
    resetFruitTally();
    playerBet = 0;
    //add Bet text  creating an object from the class Text
    playerBetDisplay = new objects.Text(playerBet.toString(), 238.5, 381);
    stage.addChild(playerBetDisplay);
    

}




//function to reset the game return variables to 0 
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
    createUI()
}

//function to show player stats
function showPlayerStats() {
    winRatio = winNumber / turn;
    alert("Jackpot: " + jackpot + "\n"
        + "Player Money: " + playerMoney + "\n"
        + "Turn: " + turn + "\n"
        + "Wins: " + winNumber + "\n"
        + "Losses: " + lossNumber + "\n"
        + "Win Ratio: " + (winRatio * 100).toFixed(2) + "%"
        );
}

// Utility function to reset all fruit tallies *************************************
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    lemons = 0;
    sevens = 0;
    blanks = 0;
}

//function that close the window ********************************************************************************
function closeWindow() {
    showPlayerStats()
    window.open('', '_self', '');
    window.close();
}