const S = 20;
let W, H;
let ctx;
const snake = [];
let foods = [];
let point = 0;
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

//initialize
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

  timer = setInterval("tick()", 200); // フレームレート 200ms ごとに tick() functionを実行
  window.onkeydown = keydown; // キーが押されたら keydown function を実行
}

//add food
function addFood() {
  while (true) {
    let x = Math.floor(Math.random() * W);
    let y = Math.floor(Math.random() * H);

    if (isHit(foods, x, y) || isHit(snake, x, y)) {
      continue; // もしfood / snakeがすでにある場合、pushせずにwhileの先頭に移動
    }

    foods.push(new Point(x, y));

    break;
  }
}

// collision
// data = snake　か food の配列
// x, y = 衝突を確認したい xとyの座標
function isHit(data, x, y) {
  for (let i = 0; i < data.length; i++) {
    // もしsnake/food一つの場所が、xとyの座標と同じだったら
    if (data[i].x == x && data[i].y == y) {
      return true;
    }
  }
  return false;
}

//snakeがfoodを食べたら、そのfoodを別の場所に移動
function moveFood(x, y) {
  // filter  =  配列の要素が条件と合う場合残す。それ以外は排除
  foods = foods.filter(function(p) {
    return p.x != x || p.y != y;
  });
  addFood();
}

// フレームごとに実行されるfunction
function tick() {
  console.log(keyCode);

  let x = snake[0].x; // snake の先頭x座標
  let y = snake[0].y; // snake の先頭y座標

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

  // 自分 or 壁 に衝突？
  if (isHit(snake, x, y) || x < 0 || x >= W || y < 0 || y >= H) {
    clearInterval(timer); // ゲームをストップ
    paint();
    return;
  }

  snake.unshift(new Point(x, y)); // 新しい場所にsnake先頭を描画

  if (isHit(foods, x, y)) {
    point += 10; // foodをたべた
    moveFood(x, y); // あらたな場所にfood を移動
  } else {
    snake.pop(); // 蛇の尻尾を消す
  }

  paint();
}

function paint() {
  ctx.clearRect(0, 0, W * S, H * S); // 画面を毎回クリアするため
  ctx.fillStyle = "rgb(255, 255, 255)"; // white
  snake.forEach(function(p) {
    ctx.fillText("*", p.x * S, (p.y + 1) * S); // S は一つのセルの大きさ
  });

  ctx.fillStyle = "rgb(255, 100, 100)"; // white
  foods.forEach(function(p) {
    ctx.fillText("*", p.x * S, (p.y + 1) * S);
  });
}

function keydown(event) {
  keyCode = event.keyCode;
}
