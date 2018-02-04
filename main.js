const S = 20;
let W, H;
let ctx;
const snake = [];
const food = [];
let timer = NaN;
let keyCode = 0;
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
  const canvas = document.getElementById("field");
  W = canvas.clientHeight / S;
  H = canvas.clientHeight / S;
  ctx = canvas.getContext("2d");
  ctx.font = "20px Arial";

  // 蛇を初期化
  snake.push(new Point(W / 2, H / 2));

  // 餌の初期化
  for (let i = 0; i < 30; i++) {
    addFood();
  }

  timer = setInterval("tick()", 2000);
  window.onkeydown = keydown; // キーが押されたら keydown function を実行
}

//add food
function addFood() {
  let x = Math.floor(Math.random() * W);
  let y = Math.floor(Math.random() * H);
  food.push(new Point(x, y));
}

// collision
function isHit(data, x, y) {}

function moveFood(x, y) {}

// フレームごとに実行されるfunction
function tick() {
  console.log(keyCode);

  let x = snake[0].x;
  let y = snake[0].y;

  switch (keyCode) {
    case 37:
      x--;
      break; // 左
    case 38:
      y--;
      break; // 上
    case 39:
      x++;
      break; // 右
    case 40:
      y++;
      break; // 下
    default:
      paint();
      return;
  }
  snake.unshift(new Point(x, y));
  console.log(snake);

  snake.pop();
  console.log(snake);

  paint();
}

function paint() {
  ctx.clearRect(0, 0, W * S, H * S); // 画面を毎回クリアするため
  ctx.fillStyle = "rgb(255, 255, 255)"; // white
  snake.forEach(function(p) {
    ctx.fillText("*", p.x * S, (p.y + 1) * S);
  });

  ctx.fillStyle = "rgb(255, 100, 100)"; // white
  food.forEach(function(p) {
    ctx.fillText("*", p.x * S, (p.y + 1) * S);
  });
}

function keydown(event) {
  keyCode = event.keyCode;
}
