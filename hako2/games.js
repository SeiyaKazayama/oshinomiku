let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let dWidth = 35,
    dHeight = 35;
let iCurLevel = 0; //当前关卡+1
let currenMap = [],
    userMap = [];
let msg = document.getElementById('msg');
let block = document.getElementById('block');
let wall = document.getElementById('wall');
let box = document.getElementById('box');
let down = document.getElementById('down');
let left = document.getElementById('left');
let right = document.getElementById('right');
let up = document.getElementById('up');
let ball = document.getElementById('ball');
let curMan = down; //小人面向
// 复制二维数组
function copyArray(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        newArr[i] = arr[i].concat();
    }
    return newArr;
}
// 初始化
function init() {
    currenMap = copyArray(levels[iCurLevel]) // 原地图
    userMap = copyArray(levels[iCurLevel]) // 当前地图
    curMan = down; // 初始化miku
    drawBlock() // 地板
    drawMap(currenMap) // 画关卡地图
}

// 画草地
function drawBlock() {
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
            ctx.drawImage(block, i * dWidth, j * dHeight, dWidth, dHeight);

        }
    }
}
// 画miku位置
function Point(x, y) {
    this.x = x;
    this.y = y;
}

let per_position = new Point(5, 5);
// 画关卡地图
function drawMap(level) {
    for (let i = 0; i < level.length; i++) {
        for (let j = 0; j < level[i].length; j++) {
            let pic = block;
            switch (level[i][j]) {
                case 0:
                    pic = block;
                    break;
                case 1:
                    pic = wall;
                    break;
                case 2:
                    pic = ball;
                    break;
                case 3:
                    pic = box;
                    break;
                case 4:
                    pic = curMan;
                    per_position.x = i;
                    per_position.y = j;
                    break;
                case 5:
                    pic = box;
                    break;
            }
            ctx.drawImage(pic, j * dWidth - (pic.width - dWidth) / 2, i * dHeight - (pic.height - dHeight), pic.width, pic.height);
        }
    }
}

// 切换关卡
function level(next) {
    iCurLevel += next
    if (iCurLevel < 0) {
        alert('当前第一关');
        return;
    }
    if (iCurLevel > levels.length - 1) {
        alert('当前最后一关');
        return;
    }
    init();
}

//按键后判断移动
document.onkeydown = function curManUp(event) {
    let keyCode = event.keyCode;
    let p1 = {
        x: 0,
        y: 0
    }
    let p2 = {
        x: 0,
        y: 0
    }
    switch (keyCode) {
        case 38:
        case 87:
            curMan = up;
            p1.x = per_position.x - 1;
            p1.y = per_position.y;
            p2.x = per_position.x - 2;
            p2.y = per_position.y;
            break;
        case 68:
        case 39:
            curMan = right;
            p1.x = per_position.x;
            p1.y = per_position.y + 1;
            p2.x = per_position.x;
            p2.y = per_position.y + 2;
            break;
        case 83:
        case 40:
            curMan = down;
            p1.x = per_position.x + 1;
            p1.y = per_position.y;
            p2.x = per_position.x + 2;
            p2.y = per_position.y;
            break;
        case 65:
        case 37:
            curMan = left;
            p1.x = per_position.x;
            p1.y = per_position.y - 1;
            p2.x = per_position.x;
            p2.y = per_position.y - 2;
            break;
    }
    // 判断移动条件
    if (userMap[p1.x][p1.y] == 1) {
        return false;
    }
    if (userMap[p1.x][p1.y] == 3 && (userMap[p2.x][p2.y] == 1 || userMap[p2.x][p2.y] == 3 || userMap[p2.x][p2.y] == 5)) {
        return false;
    }
    if (userMap[p1.x][p1.y] == 5 && (userMap[p2.x][p2.y] == 1 || userMap[p2.x][p2.y] == 3 || userMap[p2.x][p2.y] == 5)) {
        return false;
    }
    if (userMap[p1.x][p1.y] == 0) {
        userMap[per_position.x][per_position.y] = 0;
        userMap[p1.x][p1.y] = 4;
    }
    if (userMap[p1.x][p1.y] == 3 && userMap[p2.x][p2.y] == 0) {
        userMap[per_position.x][per_position.y] = 0;
        userMap[p1.x][p1.y] = 4;
        userMap[p2.x][p2.y] = 3
    }
    if (userMap[p1.x][p1.y] == 3 && userMap[p2.x][p2.y] == 2) {
        userMap[per_position.x][per_position.y] = 0;
        userMap[p1.x][p1.y] = 4;
        userMap[p2.x][p2.y] = 5
    }
    if (userMap[p1.x][p1.y] == 2) {
        userMap[per_position.x][per_position.y] = 0;
        userMap[p1.x][p1.y] = 4;
    }
    if (userMap[p1.x][p1.y] == 5 && userMap[p2.x][p2.y] == 0) {
        userMap[per_position.x][per_position.y] = 0;
        userMap[p1.x][p1.y] = 4;
        userMap[p2.x][p2.y] = 3
    }
    if (userMap[p1.x][p1.y] == 5 && userMap[p2.x][p2.y] == 2) {
        userMap[per_position.x][per_position.y] = 0;
        userMap[p1.x][p1.y] = 4;
        userMap[p2.x][p2.y] = 5
    }
    if (currenMap[per_position.x][per_position.y] == 2 || currenMap[per_position.x][per_position.y] == 5) {
        userMap[per_position.x][per_position.y] = 2;
    }
    drawBlock();
    drawMap(userMap);
    if (win()) {
        level(1);
    }
}

// 判断是否结束
function win() {
    for (var i = 0; i < currenMap.length; i++) {
        for (var j = 0; j < currenMap[i].length; j++) {
            if (currenMap[i][j] == 2 && userMap[i][j] !== 5 || currenMap[i][j] == 5 && userMap[i][j] !== 5) {
                return false;
            }
        }
    }
    return true;
}

// 初始化
init()