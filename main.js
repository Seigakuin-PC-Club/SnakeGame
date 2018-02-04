const S = 20;
let W, H;
let ctx;
window.onload = init;


//init
function init() {
  const canvas = document.getElementById('field');
  W = canvas.clientHeight / S;
  H = canvas.clientHeight / S;
  ctx = canvas.getContext('2d');
  ctx.font = "20px Arial";
}

//add food
function addFood() {
}

// collision
function isHit(data, x, y) {

}


function moveFood(x, y) {
}

function tick() {
}

function paint() {

}

function keydown(event) {
}
