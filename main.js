const S = 20;
let W, H;
let ctx;
const snake = [];
window.onload = init;


// Point オブジェクト
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

//init
function init() {
  const canvas = document.getElementById('field');
  W = canvas.clientHeight / S;
  H = canvas.clientHeight / S;
  ctx = canvas.getContext('2d');
  ctx.font = "20px Arial";
  
  // 蛇を初期化
  snake.push(new Point(W / 2, H / 2));
  paint(); // snakeを描画
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
  ctx.fillStyle = "rgb(255, 255, 255)"; // white
  snake.forEach(function (p) {
    ctx.fillText("*", p.x * S, (p.y + 1) * S);
  });
  
}

function keydown(event) {
}
