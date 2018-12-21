// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Enemy's Initial location
    this.x = x;
    this.y = y;

    // Enemy's speed
    this.speed = speed;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    
    // Make sure that the enemies won't leave the edges of the platform
    if(this.x >= 400) {
        this.x = 0;
    }
    
    // Check the Collision between the Enemy and the Player
    if (player.x < this.x + 60 && player.x + 37 > this.x && player.y < this.y + 25 && player.y + 30 > this.y) {
        player.x = 200;
        player.y = 380;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
   
    // The Player's position
    this.x = x;
    this.y = y;
    // The Player's sprite Image
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function () {
    // Make sure the player doesn't leave the game
    this.x = ((this.x < 0) ? 400 : ( (this.x > 400) ? 0 : this.x ));

    // Return to the Starting point if the Player reaches  the Sea
    if(this.y < 60) {
        this.x = 200;
        this.y = 380;
    }
    else if(this.y > 380) { // Make sure the Player doesn't leave the game
        this.y = 380;
    }
}

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Move the player according to the keys
Player.prototype.handleInput = function (direction) {
    
    switch(direction) {
        case 'up' : this.y -= 80; break;
        case 'down' : this.y += 80; break;
        case 'left' : this.x -= 100; break;
        case 'right' : this.x += 100; break;
    }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// the Enemies should have a random speed (I think)
allEnemies = [new Enemy(0, 60, Math.floor(Math.random() * 150)), new Enemy(0, 140, Math.floor(Math.random() * 150)), new Enemy(0, 220, Math.floor(Math.random() * 150))];
player = new Player(200, 380);

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
