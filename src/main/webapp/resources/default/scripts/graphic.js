const canvas = document.getElementById("graphic");
const ctx = canvas.getContext("2d");
const scale = (Math.min(canvas.width, canvas.height) / 3);
const xCenter = canvas.width / 2;
const yCenter = canvas.height / 2;
console.log(ctx);
canvas.addEventListener("click", function (event) {
    let graphicForm = document.getElementById("graph-form");
    let r = getR();
    console.log(r);
    let curr_x = event.offsetX;
    let curr_y = event.offsetY;
    curr_x -= xCenter;
    curr_y -= yCenter;
    curr_x /= scale;
    curr_y /= scale;
    curr_x = curr_x * r;
    curr_y = -curr_y * r;
    let inp_x = document.getElementById("graph-form:graph-x");
    let inp_y = document.getElementById("graph-form:graph-y");
    inp_x.value=curr_x;
    inp_y.value=curr_y;
    jsf.ajax.request("graph-form:graph-button", null, {
        execute: '@form',
        render: '@all',
    });
});
jsf.ajax.addOnEvent(function(data) {
    if (data.status === 'success') {
        drawGraphic();
    }
});

drawGraphic();

function getR(){
    let r_element = document.getElementById("main-form:r-output");
    return parseFloat(r_element.innerText);
}

function drawGraphic(){
    console.log("drawing graphic")
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = "2";

    ctx.moveTo(canvas.width - 10, yCenter - 5);
    ctx.lineTo(canvas.width, yCenter);
    ctx.lineTo(canvas.width - 10, yCenter + 5);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    ctx.moveTo(xCenter - 5, 10);
    ctx.lineTo(xCenter, 0);
    ctx.lineTo(xCenter + 5, 10);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(xCenter, yCenter, scale, -Math.PI, -Math.PI / 2, false);
    ctx.lineTo(xCenter, yCenter);
    ctx.closePath();

    ctx.fillStyle = "lightblue"
    ctx.fill();

    ctx.fillRect(xCenter - scale, yCenter, scale, scale / 2);

    ctx.beginPath();
    ctx.moveTo(xCenter, yCenter);
    ctx.lineTo(xCenter + scale / 2, yCenter);
    ctx.lineTo(xCenter, yCenter + scale);
    ctx.closePath();

    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, yCenter);
    ctx.lineTo(canvas.width, yCenter);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xCenter, 0);
    ctx.lineTo(xCenter, canvas.height);
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx.font = "14px Arial";

    let r = getR();
    ctx.fillText(-r, xCenter + 7, yCenter + scale);
    ctx.fillText(r, xCenter + 7, yCenter - scale);
    ctx.fillText(-r / 2, xCenter + 7, yCenter + scale / 2);
    ctx.fillText(r / 2, xCenter + 7, yCenter - scale / 2);

    ctx.fillText(-r, xCenter - scale, yCenter + 10);
    ctx.fillText(r, xCenter + scale, yCenter + 10);
    ctx.fillText(-r / 2, xCenter - scale / 2, yCenter + 10);
    ctx.fillText(r / 2, xCenter + scale / 2, yCenter + 10);

    let points = document.getElementById("j_idt16:j_idt17_body").getElementsByTagName("tr");
    console.log(points);
    for (let point of points){
        let xTable = point.querySelectorAll(".x-table")[0].innerText;
        let yTable = point.querySelectorAll(".y-table")[0].innerText;
        let hittingTable = point.querySelectorAll(".hitting-table")[0].innerText;
        if (hittingTable === "true") {
            drawPoint(ctx, parseFloat(xTable), parseFloat(yTable), r, "green");
        } else {
            drawPoint(ctx, parseFloat(xTable), parseFloat(yTable), r, "red");
        }
    }
}

function drawPoint(ctx, x, y, r, color){
    ctx.fillStyle = color;
    let scaleX = xCenter + (x / r) * scale;
    let scaleY = yCenter - (y / r) * scale;
    console.log(scaleX, scaleY);
    ctx.beginPath();
    ctx.arc(scaleX, scaleY, 5, 0, Math.PI * 2);
    ctx.fill();
}