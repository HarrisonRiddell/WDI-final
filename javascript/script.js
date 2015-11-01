var game = new Phaser.Game(1200, 720, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

///////////////////////////////////////////////////////
//                    PRELOAD                        //
///////////////////////////////////////////////////////

function preload() {
  game.load.image('city', 'assets/gotham.jpg');
  game.load.image('floor', 'assets/floor.png');
  game.load.image('glass', 'assets/glass.png');
  game.load.image('weapon', 'assets/weapon.png');
  game.load.spritesheet('detective', 'assets/detective.png', 84, 16);
  game.load.spritesheet("zombie", "./assets/zombie.png", 31, 52);
} //preload

///////////////////////////////////////////////////////
//                     CREATE                        //
///////////////////////////////////////////////////////
var platforms;
var player1
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);


  platforms = game.add.group();
  platforms.enableBody = true;

  var ground = platforms.create(0, game.world.height - 40, "floor");
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

  var ledge = platforms.create(Math.random()*320, 550, "floor");
  ledge.body.immovable = true;

  ledge = platforms.create((Math.random()*320)+600, 550, "floor");
  ledge.body.immovable = true;

  ledge = platforms.create(Math.random()*320, 425, "floor");
  ledge.body.immovable = true;

  ledge = platforms.create((Math.random()*320)+600, 425, "floor");
  ledge.body.immovable = true;

  ledge = platforms.create(Math.random()*320, 300, "floor");
  ledge.body.immovable = true;

  ledge = platforms.create((Math.random()*320)+600, 300, "floor");
  ledge.body.immovable = true;

  ledge = platforms.create(Math.random()*320, 175, "floor");
  ledge.body.immovable = true;

  ledge = platforms.create((Math.random()*320)+ 600, 175, "floor");
  ledge.body.immovable = true;

  player1 = game.add.sprite(32, game.world.height - 150, 'zombie');
  player1.scale.setTo(1, 1);
  game.physics.arcade.enable(player1);
  player1.body.bounce.y = 0.2;
  player1.body.gravity.y = 300;
  player1.body.collideWorldBounds = true;
  player1.animations.add('right', [0,1,2,3], 10, true);
  player1.animations.add('left', [5,6,7,8], 10, true);

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
} //create

///////////////////////////////////////////////////////
//                     UPLOAD                        //
///////////////////////////////////////////////////////
function update() {
  cursors = game.input.keyboard.createCursorKeys();
  game.physics.arcade.collide(player1, platforms);
  game.physics.arcade.collide(weapons, platforms);
  game.physics.arcade.collide(glasses, platforms);
  game.physics.arcade.overlap(player1, glasses, collectGlass, null, this);


  player1.body.velocity.x = 0;

  if (cursors.left.isDown)
  {
      player1.body.velocity.x = -150;
      player1.animations.play('left');
  }
  else if (cursors.right.isDown)
  {
      player1.body.velocity.x = 150;

      player1.animations.play('right');
  }
  else
  {
      player1.animations.stop();
      player1.frame = 4;
  }
  if (cursors.up.isDown && player1.body.touching.down)
  {
      player1.body.velocity.y = -350;
  }
  
} //update

///////////////////////////////////////////////////////
//        DETECTIVE COLLECTS MAGNIFYING GLASS       //
///////////////////////////////////////////////////////
function collectGlass(player, glass) {
  glass.kill();
} // collectGlass