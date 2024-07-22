// x軸の値を生成
function linspace(start, end, num) {
    const arr = new Array(num);
    const step = (end - start) / (num - 1);
    for (let i = 0; i < num; i++) {
        arr[i] = start + step * i;
    }
    return arr;
}

// 縦線を引く
var drawVerticalLine = function () {
    ctx.strokeStyle = 'black';

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.closePath();
    ctx.stroke();

};

// 横線を引く
var drawHorizontalLine = function () {
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(0, Y_ZERO);
    ctx.lineTo(canvas.width, Y_ZERO);
    ctx.closePath();
    ctx.stroke();
};

function add_ticks() {
    var context = canvas.getContext('2d');
    context.font = 'normal 8pt "メイリオ"';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(0, canvas.width / 2, Y_ZERO + 12);

    // xtickslabels
    for (let i = 1; i < X_MAX + 1; i++) {
        // TODO: 4個だけ出すようにする
        // 範囲を定めて出せるようにする
        ctx.fillText("|", canvas.width * (1 / 2 + i / 8), Y_ZERO);
        ctx.fillText(i, canvas.width * (1 / 2 + i / 8), Y_ZERO + 12);
        ctx.fillText("|", canvas.width * (1 / 2 - i / 8), Y_ZERO);
        ctx.fillText(-i, canvas.width * (1 / 2 - i / 8), Y_ZERO + 12);
    }
    // ytickslabels
    for (let i = 1; i < 6; i++) {
        ctx.fillText(i / 10, canvas.width * (1 / 2) - 12, Y_ZERO - i * 80);
        ctx.fillText("---", canvas.width * (1 / 2), Y_ZERO - i * 80);
    }

}

function draw_ruled_line() {
    drawVerticalLine();
    drawHorizontalLine();
    add_ticks();
    // TODO: X軸の描画範囲を示す
}
