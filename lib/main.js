'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var W = 20,
    H = 20,
    S = 20;
var snake = [],
    foods = [];
var keyCode = 0;
var point = 0;
var timer = void 0;
var speed = 200;
var ctx = void 0;

//Point Object

var Point = function Point(x, y) {
  _classCallCheck(this, Point);

  this.x = x;
  this.y = y;
};

/*
function Point(x, y) {
    this.x = x;
    this.y = y;
}
*/

//init


function init() {
  var canvas = document.getElementById('field');
  W = canvas.clientHeight / S;
  H = canvas.clientHeight / S;
  ctx = canvas.getContext('2d');
  ctx.font = "20px Arial";
  // snake init
  snake.push(new Point(W / 2, H / 2)); // starts in middle
  // snake food
  for (var i = 0; i < 30; i++) {
    addFood();
  }
  // speed = 200
  timer = setInterval("tick()", speed);
  window.onkeydown = keydown;
}

//add food
function addFood() {
  while (true) {
    var x = Math.floor(Math.random() * W);
    var y = Math.floor(Math.random() * H);
    if (isHit(foods, x, y) || isHit(snake, x, y)) {
      continue;
    }
    foods.push(new Point(x, y));
    break;
  }
}

// collision
function isHit(data, x, y) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].x === x && data[i].y === y) {
      return true;
    }
  }
  return false;
}

function moveFood(x, y) {
  foods = foods.filter(function (p) {
    return p.x !== x || p.y !== y;
  });
  addFood();
}

function tick() {
  var x = snake[0].x; // snake[0] is the head snake point
  var y = snake[0].y;
  switch (keyCode) {
    case 37:
      x--;
      break; // left
    case 38:
      y--;
      break; // up
    case 39:
      x++;
      break; // right
    case 40:
      y++;
      break; // down
    default:
      paint();
      return;
  }
  // you or wall collision?
  if (isHit(snake, x, y) || x < 0 || x >= W || y < 0 || y >= H) {
    clearInterval(timer); // timer is setInterval("tick()", speed) (*speed is 200)
    paint();
    ctx.fillStyle = "rgb(256,80,100)";
    ctx.fillText("GAME OVER", W / 2 * (S - 15), H / 2 * (S - 2));
    ctx.fillText("PUSH SPACE TO START AGAIN", W / 2 * (S - 15), H / 2 * (S + 1)); // write score
    return;
  }
  // add to head
  snake.unshift(new Point(x, y));
  if (isHit(foods, x, y)) {
    point += 10; // add to point
    moveFood(x, y); // move the eaten food to random pos
    if (speed >= 50) {
      speed -= 10;
      clearInterval(timer);
      timer = setInterval("tick()", speed);
    }
  } else {
    snake.pop(); // delete the last snake point
  }
  paint(); // clear canvas and point
}

function paint() {
  ctx.clearRect(0, 0, W * S, H * S); // clear screen

  ctx.font = 'normal 20px Arial';
  ctx.fillStyle = "rgb(256,150,150)"; // font color for points
  ctx.fillText("POINTS: " + point, S, S * 2); // write score

  ctx.fillStyle = "rgb(256,256,15)";
  ctx.fillText("SPEED: " + speed, S, S * 3);

  ctx.fillStyle = "rgb(256, 256, 256)"; // color for snake and food
  foods.forEach(function (p) {
    ctx.fillText("+", p.x * S, (p.y + 1) * S);
  });

  ctx.font = 'bold 30px Arial';
  ctx.fillStyle = "rgb(256, 200, 200)";
  snake.forEach(function (p) {
    ctx.fillText("*", p.x * S, (p.y + 1) * S + 10);
  });
}

function keydown(event) {
  keyCode = event.keyCode;
  if (keyCode == 32) {
    location.reload();
  }
}