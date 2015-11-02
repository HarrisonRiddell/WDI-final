var game = new Phaser.Game(1200, 720, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
///////////////////////////////////////////////////////
//              PRELOAD - FUNCTION                   //
///////////////////////////////////////////////////////
function preload() {
  game.load.image('city', 'assets/city.png');
  game.load.image('floor', 'assets/floor.png');
  game.load.image('glass', 'assets/glass.png');
  game.load.image('weapon', 'assets/weapon.png');
  game.load.spritesheet('detective', 'assets/player1.png', 31, 52);
  game.load.spritesheet('robber', "./assets/player2.png", 31, 52);
} //preload

///////////////////////////////////////////////////////
//               CREATE - FUNCTION                   //
///////////////////////////////////////////////////////
var platforms;
var ledge;
var ground;
var player1;
var player2;
var timer;
var score1 = 0;
var score2 = 0;
var scoreText1;
var scoreText2;
var timerText;
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.add.sprite(0, -60, 'city');

  platforms = game.add.group();
  platforms.enableBody = true;

  ground = platforms.create(0, game.world.height - 40, "floor");
  ground.scale.setTo(2,2)
  ground.body.immovable = true;

  ground = platforms.create(375, game.world.height - 40, "floor");
  ground.scale.setTo(2,2)
  ground.body.immovable = true;

  ground = platforms.create(750, game.world.height - 40, "floor");
  ground.scale.setTo(2,2)
  ground.body.immovable = true;

  ground = platforms.create(1125, game.world.height - 40, "floor");
  ground.scale.setTo(2,2)
  ground.body.immovable = true;

  // platform 1 (top)
  ledge = platforms.create(Math.random()*320, 175, "floor");
  ledge.body.immovable = true;
  ledge = platforms.create((Math.random()*320)+ 600, 175, "floor");
  ledge.body.immovable = true;

  // platform 2
  ledge = platforms.create(Math.random()*900, 300, "floor");
  ledge.body.immovable = true;

  // platform 3
  ledge = platforms.create(Math.random()*320, 425, "floor");
  ledge.body.immovable = true;
  ledge = platforms.create((Math.random()*320)+ 600, 425, "floor");
  ledge.body.immovable = true;

  // platform 4 (bottom)
  ledge = platforms.create(Math.random()*900, 550, "floor");
  ledge.body.immovable = true;


  ///////////////////////////////////////////////////////
  //                CREATE - PLAYER 1                  //
  ///////////////////////////////////////////////////////
  player1 = game.add.sprite(32, game.world.height - 150, 'detective');
  player1.scale.setTo(1, 1);
  game.physics.arcade.enable(player1);
  player1.body.bounce.y = 0.2;
  player1.body.gravity.y = 300;
  player1.body.collideWorldBounds = true;
  player1.animations.add('right', [0,1,2,3], 10, true);
  player1.animations.add('left', [5,6,7,8], 10, true);

  ///////////////////////////////////////////////////////
  //                CREATE - PLAYER 2                  //
  ///////////////////////////////////////////////////////
  player2 = game.add.sprite(game.world.width - 64, game.world.height - 150, 'robber');
  player2.scale.setTo(1, 1);
  game.physics.arcade.enable(player2);
  player2.body.bounce.y = 0.2;
  player2.body.gravity.y = 300;
  player2.body.collideWorldBounds = true;
  player2.animations.add('right', [0,1,2,3], 10, true);
  player2.animations.add('left', [5,6,7,8], 10, true);

  ///////////////////////////////////////////////////////
  //                CREATE - OBJECTS                   //
  ///////////////////////////////////////////////////////
  glasses = game.add.group()
  glasses.enableBody = true;


  for (var i = 0; i < 10; i++) {
    var glass = glasses.create( i * 120 , Math.random()* 500, 'glass')
    glass.body.gravity.y = 125;
    glass.body.bounce.y = 0.4 + Math.random()*0.2;
  }

  weapons = game.add.group()
  weapons.enableBody = true;

  for (var i = 0; i < 10; i++) {
    var weapon = weapons.create( i * 130 , Math.random()* 500, 'weapon')
    weapon.body.gravity.y = 125;
    weapon.body.bounce.y = 0.4 + Math.random()*0.2;
  }

  scoreTextDetective = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
  
  scoreTextRobber = game.add.text(game.world.width - 150, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
  
  TimerText = game.add.text(550, 16, 'Timer: 30', {fill: '#000'});

} //create

///////////////////////////////////////////////////////
//               UPDATE - FUNCTION                   //
///////////////////////////////////////////////////////
function update() {
  cursors = game.input.keyboard.createCursorKeys();
  game.physics.arcade.collide(player1, platforms);
  game.physics.arcade.collide(player2, platforms);
  game.physics.arcade.collide(player1, player2);
  game.physics.arcade.collide(weapons, platforms);
  game.physics.arcade.collide(glasses, platforms);
  game.physics.arcade.overlap(player1, weapons, collectWeapon, null, this);
  game.physics.arcade.overlap(player2, glasses, collectGlass, null, this);



  ///////////////////////////////////////////////////////
  //            UPDATE - PLAYER 1 MOVEMENT             //
  ///////////////////////////////////////////////////////
  player1.body.velocity.x = 0;

  if (game.input.keyboard.addKey(Phaser.Keyboard.A).isDown) {
      player1.body.velocity.x = -200;
      player1.animations.play('left');
  } else if (game.input.keyboard.addKey(Phaser.Keyboard.D).isDown) {
      player1.body.velocity.x = 200;
      player1.animations.play('right');
  } else {
      player1.animations.stop();
      player1.frame = 4;
  }
  if (game.input.keyboard.addKey(Phaser.Keyboard.W).isDown && player1.body.touching.down) {
      player1.body.velocity.y = -350;
  }
  if (game.input.keyboard.addKey(Phaser.Keyboard.S).isDown) {
    player1.body.velocity.y = 200;
  }

  ///////////////////////////////////////////////////////
  //            UPDATE - PLAYER 2 MOVEMENT             //
  /////////////////////////////////////////////////////// 
  player2.body.velocity.x = 0;

  if (cursors.left.isDown) {
      player2.body.velocity.x = -250;
      player2.animations.play('left');
  } else if (cursors.right.isDown) {
      player2.body.velocity.x = 250;

      player2.animations.play('right');
  } else {
      player2.animations.stop();
      player2.frame = 4;
  }
  if (cursors.up.isDown && player2.body.touching.down) {
      player2.body.velocity.y = -350;
  }
  if (cursors.down.isDown) {
    player2.body.velocity.y = 250;
  }
} //update

///////////////////////////////////////////////////////
//                  COLLECT OBJECTS                  //
///////////////////////////////////////////////////////

function collectWeapon(player1, weapon) {
  weapon.kill();
  scoreDetective += 10;
  scoreTextDetective.text = 'Score: ' + score;
  scoringDetective();
} // collectWeapon

function collectGlass(player2, glass) {
  glass.kill();
  scoreRobber += 10;
  scoreTextRobber.text = 'Score: ' + score;
  scoringRobber();
} // collectGlass

var timer = 30;

var myInterval = setInterval(function() {
  timer --
  TimerText.text = 'Timer: ' + timer
},1000)


















