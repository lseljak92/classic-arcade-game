'use strict';
var tries = 3;
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;

    //Upload enemy's image
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers. 
    this.x += this.speed * dt;
    if(this.x > 550){
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 500);
    }   

    if(player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
            player.x = 200;
            player.y = 380;
            tries --;
        }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.update = function(){
    if(this.x < 0){
        this.x = 0;
    }
    if(this.x > 400){
        this.x = 400;
    }
    if(this.y > 380){
        this.y = 380;
    }

//When the user reaches the water the game is won and the player is 
//relocated to starting position
    if(this.y < 0){
        this.x = 200;
        this.y = 380;
    }
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);   
}

Player.prototype.handleInput = function(movingKeys){
    switch(movingKeys){
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'left':
            this.x -= this.speed + 50;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(200, 380, 50);

var enemy;
var enemyLocation = [60, 140, 220];

enemyLocation.forEach(function(positionY){
    enemy = new Enemy(0, positionY, 100 + Math.floor(Math.random()* 500));
    allEnemies.push(enemy);
})


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
