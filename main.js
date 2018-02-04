const S = 20;
let W, H;
let ctx;
const snake = [];
const food = [];
let timer = NaN;
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
  
  timer = setInterval("tick()", 200);
  
}

//add food
function addFood() {
  let x = Math.floor(Math.random() * W);
  let y = Math.floor(Math.random() * H);
  food.push(new Point(x, y));
}

// collision
function isHit(data, x, y) {
  
}


function moveFood(x, y) {
}

// フレームごとに実行されるfunction
function tick() {
  addFood();
  paint();
}

function paint() {
  ctx.fillStyle = "rgb(255, 255, 255)"; // white
  snake.forEach(function (p) {
    ctx.fillText("*", p.x * S, (p.y + 1) * S);
  });
  
  ctx.fillStyle = "rgb(255, 100, 100)"; // white
  food.forEach(function (p) {
    ctx.fillText("*", p.x * S, (p.y + 1) * S);
  });
}


function keydown(event) {
}
