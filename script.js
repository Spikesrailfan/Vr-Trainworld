let score = 0;

let cube = document.querySelector("#cube");
let scoreText = document.querySelector("#scoreText");
let clickSound = document.querySelector("#clickSound");

function moveCube() {
  let x = (Math.random() * 4) - 2;   // random between -2 and 2
  let y = (Math.random() * 2) + 1;   // random between 1 and 3
  let z = -3;                        // keep cube in front of player

  cube.setAttribute("position", `${x} ${y} ${z}`);
}

cube.addEventListener("click", () => {
  score++;
  scoreText.setAttribute("text", `value: Score: ${score}`);
  moveCube();
  clickSound.components.sound.playSound();
});