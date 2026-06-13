// ===============================
// 1. VARIABLES
// ===============================

// Player (the VR camera)
const player = document.querySelector("#player");

// List of all enemies
let enemies = [];

// Starting enemy speed
let speed = 0.03;

// How often enemies spawn (in ms)
let spawnRate = 2000;


// ===============================
// 2. FUNCTION: CREATE A NEW ENEMY
// ===============================
function spawnEnemy() {
  // Create a new VR entity
  let e = document.createElement("a-entity");

  // Make it a sharp cone
  e.setAttribute("geometry", "primitive: cone; radiusBottom: 0.2; radiusTop: 0; height: 0.5");
  e.setAttribute("material", "color: red");

  // Random horizontal spawn, always in front of player
  let x = (Math.random() - 0.5) * 4;
  e.setAttribute("position", `${x} 1.6 -6`);

  // Add to scene
  document.querySelector("a-scene").appendChild(e);

  // Store in enemy list
  enemies.push(e);
}


// ===============================
// 3. SPAWN ENEMIES OVER TIME
// ===============================
setInterval(() => {
  spawnEnemy();

  // Make enemies spawn faster over time
  if (spawnRate > 500) {
    spawnRate -= 100;
  }

}, spawnRate);


// ===============================
// 4. INCREASE SPEED OVER TIME
// ===============================
setInterval(() => {
  speed += 0.01;
}, 3000);


// ===============================
// 5. MAIN GAME LOOP (A-FRAME TICK)
// ===============================
AFRAME.registerComponent("enemy-mover", {
  tick: function () {
    let playerPos = player.object3D.position;

    enemies.forEach((enemy) => {
      let pos = enemy.object3D.position;

      // Move enemy toward player
      pos.z += speed;

      // Reset enemy if it passes the player
      if (pos.z > 0.5) {
        pos.z = -6;
        pos.x = (Math.random() - 0.5) * 4;
      }

      // Collision detection (distance between enemy + player)
      let dx = pos.x - playerPos.x;
      let dy = pos.y - playerPos.y;
      let dz = pos.z - playerPos.z;

      let distance = Math.sqrt(dx*dx + dy*dy + dz*dz);

      // If enemy is close enough, game over
      if (distance < 0.5) {
        alert("You got hit! Game over.");
        location.reload();
      }
    });
  }
});