/* 
    Pizaan Maheriyar Tadiwala
    tadiwala@sheridancollege.ca
    14/07/2023
    Description: Houses all the logic for the application
*/


import { Line } from "./Line.js";

// global object
const go = {};

// constants
const DIM = 10; // virtual screen dimension, -10 ~ +10


///////////////////////////////////////////////////////////////////////////////
// main entry point
document.addEventListener("DOMContentLoaded", () => {
    log("Page is loaded");

    // get canvas element and remember it
    go.canvas = document.getElementById("canvasView");

    // init controls
    initControls();

    // register resize event
    window.addEventListener("resize", handleResize);
    handleResize(); // initial call
});


///////////////////////////////////////////////////////////////////////////////
function initControls() {
    // P1 
    let labelX1 = document.getElementById("labelX1");
    let rangeX1 = document.getElementById("rangeX1");
    labelX1.innerText = rangeX1.value;    // must init because browser will cache the value
    go.x1 = parseFloat(rangeX1.value);
    rangeX1.addEventListener("input", () => {
        labelX1.innerText = rangeX1.value;
        go.x1 = parseFloat(rangeX1.value);    // must convert to numeric
        draw(); // redraw whenever slider changed
    });

    let labelY1 = document.getElementById("labelY1");
    let rangeY1 = document.getElementById("rangeY1");
    labelY1.innerText = rangeY1.value;    // must init because browser will cache the value
    go.y1 = parseFloat(rangeY1.value);
    rangeY1.addEventListener("input", () => {
        labelY1.innerText = rangeY1.value;
        go.y1 = parseFloat(rangeY1.value);    // must convert to numeric
        draw(); // redraw whenever slider changed
    });



    // P2
    let labelX2 = document.getElementById("labelX2");
    let rangeX2 = document.getElementById("rangeX2");
    labelX2.innerText = rangeX2.value;    // must init because browser will cache the value
    go.x2 = parseFloat(rangeX2.value);
    rangeX2.addEventListener("input", () => {
        labelX2.innerText = rangeX2.value;
        go.x2 = parseFloat(rangeX2.value);    // must convert to numeric
        draw(); // redraw whenever slider changed
    });

    let labelY2 = document.getElementById("labelY2");
    let rangeY2 = document.getElementById("rangeY2");
    labelY2.innerText = rangeY2.value;    // must init because browser will cache the value
    go.y2 = parseFloat(rangeY2.value);
    rangeY2.addEventListener("input", () => {
        labelY2.innerText = rangeY2.value;
        go.y2 = parseFloat(rangeY2.value);    // must convert to numeric
        draw(); // redraw whenever slider changed
    });


    // P3
    let labelX3 = document.getElementById("labelX3");
    let rangeX3 = document.getElementById("rangeX3");
    labelX3.innerText = rangeX3.value;    // must init because browser will cache the value
    go.x3 = parseFloat(rangeX3.value);
    rangeX3.addEventListener("input", () => {
        labelX3.innerText = rangeX3.value;
        go.x3 = parseFloat(rangeX3.value);    // must convert to numeric
        draw(); // redraw whenever slider changed
    });

    let labelY3 = document.getElementById("labelY3");
    let rangeY3 = document.getElementById("rangeY3");
    labelY3.innerText = rangeY3.value;    // must init because browser will cache the value
    go.y3 = parseFloat(rangeY3.value);
    rangeY3.addEventListener("input", () => {
        labelY3.innerText = rangeY3.value;
        go.y3 = parseFloat(rangeY3.value);    // must convert to numeric
        draw(); // redraw whenever slider changed
    });


    // P4
    let labelX4 = document.getElementById("labelX4");
    let rangeX4 = document.getElementById("rangeX4");
    labelX4.innerText = rangeX4.value;    // must init because browser will cache the value
    go.x4 = parseFloat(rangeX4.value);
    rangeX4.addEventListener("input", () => {
        labelX4.innerText = rangeX4.value;
        go.x4 = parseFloat(rangeX4.value);    // must convert to numeric
        draw(); // redraw whenever slider changed
    });

    let labelY4 = document.getElementById("labelY4");
    let rangeY4 = document.getElementById("rangeY4");
    labelY4.innerText = rangeY4.value;    // must init because browser will cache the value
    go.y4 = parseFloat(rangeY4.value);
    rangeY4.addEventListener("input", () => {
        labelY4.innerText = rangeY4.value;
        go.y4 = parseFloat(rangeY4.value);    // must convert to numeric
        draw(); // redraw whenever slider changed
    });
}



///////////////////////////////////////////////////////////////////////////////
function handleResize() {
    // resize canvas dimension
    go.canvas.height = window.innerHeight;
    go.canvas.width = window.innerWidth;
    log("Canvas Resized: " + go.canvas.width + " x " + go.canvas.height);
    if (go.canvas.width == 0 || go.canvas.height == 0)
        return;

    // compute conversion scale from virtual dimension to actual dimension
    go.aspectRatio = go.canvas.width / go.canvas.height;   // w/h
    if (go.aspectRatio > 1) {
        go.dimScale = go.canvas.height / (DIM * 2);
        go.dimTransX = DIM * go.aspectRatio;
        go.dimTransY = DIM;
    }
    else {
        go.dimScale = go.canvas.width / (DIM * 2);
        go.dimTransX = DIM;
        go.dimTransY = DIM / go.aspectRatio;
    }

    // redraw whenever resized
    draw();
}


///////////////////////////////////////////////////////////////////////////////
function draw() {
    // get 2D Rendering Context (RC) from canvas
    // all drawing calls go through this
    let ctx = go.canvas.getContext("2d");

    // clear full screen
    ctx.clearRect(0, 0, go.canvas.width, go.canvas.height);

    // push current state
    ctx.save();

    // transform virtual dimension to actual dimension
    // then move the origin to center
    ctx.scale(go.dimScale, -go.dimScale);       // flip vertically
    ctx.translate(go.dimTransX, -go.dimTransY);

    // from now, draw graphics in virtual coordinates; -DIM ~ +DIM
    // draw grid lines
    drawGrid(ctx);
    drawAxis(ctx);

    // draw points
    drawPoints(ctx);

    // draw line between P1 and P2
    drawLine(ctx, go.x1, go.y1, go.x2, go.y2, "red");

    // draw line between P3 and P4
    drawLine(ctx, go.x3, go.y3, go.x4, go.y4, "blue");

    // Update line1Eqn with the parametric equation
    updateParametricEquation("line1Eqn", go.x1, go.y1, go.x2, go.y2);

    // Update line1Eqn with the parametric equation
    updateParametricEquation("line2Eqn", go.x3, go.y3, go.x4, go.y4);

    // draw intersection point
    drawIntersection(ctx, go.x1, go.y1, go.x2, go.y2, go.x3, go.y3, go.x4, go.y4);

    // draw text at last
    drawText(ctx);

    // pop the state
    ctx.restore();
}


///////////////////////////////////////////////////////////////////////////////
function drawGrid(ctx) {
    // compute max x/y ranges
    const MAX_X = Math.ceil(go.dimTransX);
    const MAX_Y = Math.ceil(go.dimTransY);
    ctx.lineWidth = 0.5 / go.dimScale;

    // horizontal lines
    for (let y = -MAX_Y; y <= MAX_Y; ++y) {
        ctx.beginPath();
        if (y % 5 == 0)
            ctx.strokeStyle = "#000000";
        else
            ctx.strokeStyle = "#888888";
        ctx.moveTo(-MAX_X, y);
        ctx.lineTo(MAX_X, y);
        ctx.stroke();
    }
    // vertical lines
    for (let x = -MAX_X; x <= MAX_X; ++x) {
        ctx.beginPath();
        if (x % 5 == 0)
            ctx.strokeStyle = "#000000";
        else
            ctx.strokeStyle = "#888888";
        ctx.moveTo(x, -MAX_Y);
        ctx.lineTo(x, MAX_Y);
        ctx.stroke();
    }
}


///////////////////////////////////////////////////////////////////////////////
function drawAxis(ctx) {
    // compute max x/y
    const X = go.dimTransX;
    const Y = go.dimTransY;

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2 / go.dimScale;
    ctx.moveTo(-X, 0);    // horizontal line
    ctx.lineTo(X, 0);
    // arrow
    ctx.moveTo(X - 0.3, -0.2);
    ctx.lineTo(X, 0);
    ctx.lineTo(X - 0.3, 0.2);
    ctx.stroke();
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.moveTo(0, Y);    // vertical line
    ctx.lineTo(0, -Y);
    // arrow
    ctx.moveTo(-0.2, Y - 0.3);
    ctx.lineTo(0, Y);
    ctx.lineTo(0.2, Y - 0.3);
    ctx.stroke();
}


///////////////////////////////////////////////////////////////////////////////
function drawText(ctx) {
    ctx.save();

    ctx.scale(1, -1);   // flip vertically
    ctx.font = "0.8px sans-serif";
    ctx.fillStyle = "#000000";
    ctx.fillText("0", 0.2, 0.8);
    ctx.fillText("x", go.dimTransX - 0.5, 0.8);
    ctx.fillText("y", 0.2, -go.dimTransY + 0.6);

    ctx.restore();
}


///////////////////////////////////////////////////////////////////////////////
function drawPoints(ctx) {
    // draw P1
    const R = 0.3;  // radius
    ctx.beginPath();
    ctx.fillStyle = "#ff0000"; // red
    ctx.arc(go.x1, go.y1, R, 0, Math.PI * 2);
    ctx.fill();


    // draw P2
    ctx.beginPath();
    ctx.fillStyle = "#ff0000";
    ctx.arc(go.x2, go.y2, R, 0, Math.PI * 2);
    ctx.fill();

    // draw P3
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.arc(go.x3, go.y3, R, 0, Math.PI * 2);
    ctx.fill();

    // draw P4
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.arc(go.x4, go.y4, R, 0, Math.PI * 2);
    ctx.fill();

}

///////////////////////////////////////////////////////////////////////////////
function drawLine(ctx, x1, y1, x2, y2, color = "black") {
    // Calculate the slope of the line
    const slope = (y2 - y1) / (x2 - x1);

    // Calculate the canvas boundaries
    const canvasWidth = go.canvas.width / go.dimScale;
    const canvasHeight = go.canvas.height / go.dimScale;

    // Check if the line is vertical or horizontal
    if (Math.abs(slope) === Infinity) {
        // Vertical line
        const lineY1 = slope > 0 ? -canvasHeight : canvasHeight;
        const lineY2 = slope > 0 ? canvasHeight : -canvasHeight;

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2 / go.dimScale;
        ctx.moveTo(x1, lineY1);
        ctx.lineTo(x2, lineY2);
        ctx.stroke();
    } else if (slope === 0) {
        // Horizontal line
        const lineX1 = x1 < x2 ? -canvasWidth : canvasWidth;
        const lineX2 = x1 < x2 ? canvasWidth : -canvasWidth;

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2 / go.dimScale;
        ctx.moveTo(lineX1, y1);
        ctx.lineTo(lineX2, y2);
        ctx.stroke();
    } else {
        // Diagonal line
        const lineX1 = -canvasWidth;
        const lineX2 = canvasWidth;
        const lineY1 = y1 + (lineX1 - x1) * slope;
        const lineY2 = y2 + (lineX2 - x2) * slope;

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2 / go.dimScale;
        ctx.moveTo(lineX1, lineY1);
        ctx.lineTo(lineX2, lineY2);
        ctx.stroke();
    }
}


///////////////////////////////////////////////////////////////////////////////
function drawIntersection(ctx, x1, y1, x2, y2, x3, y3, x4, y4) {
    const line1 = new Line(x1, y1, x2, y2);
    const line2 = new Line(x3, y3, x4, y4);


    if (line1.isIntersect(line2)) {
        const intersection = line1.intersect(line2);
        const pointSize = 0.3;

        document.getElementById("intersection").innerText =  "(" + intersection.x + ", " + intersection.y + ")";
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.arc(intersection.x, intersection.y, pointSize, 0, Math.PI * 2);
        ctx.fill();

        
    } else {
        console.log("No intersection");
    }
}



///////////////////////////////////////////////////////////////////////////////
const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", function () {
    go.x1 = -8;
    document.getElementById("rangeX1").value = -8;
    document.getElementById("labelX1").innerText = -8;

    go.y1 = -4;
    document.getElementById("rangeY1").value = -4;
    document.getElementById("labelY1").innerText = -4;

    go.x2 = 7;
    document.getElementById("rangeX2").value = 7;
    document.getElementById("rangeX2").value = 7;

    go.y2 = 6;
    document.getElementById("rangeY2").value = 6;
    document.getElementById("labelY2").innerText = 6;

    go.x3 = -2;
    document.getElementById("rangeX3").value = -2;
    document.getElementById("labelX3").innerText = -2;

    go.y3 = 8;
    document.getElementById("rangeY3").value = 8;
    document.getElementById("labelY3").innerText = 8;

    go.x4 = 6;
    document.getElementById("rangeX4").value = 6;
    document.getElementById("labelX4").innerText = 6;

    go.y4 = -8;
    document.getElementById("rangeY4").value = -8;
    document.getElementById("labelY4").innerText = -8;

    draw();
});


function updateParametricEquation(elementId, x1, y1, x2, y2) {
    const element = document.getElementById(elementId);

    const dx = Math.round((x2 - x1) * 100) / 100;
    const dy = Math.round((y2 - y1) * 100) / 100;

    element.textContent = `Parametric Form: (${x1}, ${y1}) + t(${dx}, ${dy})`;
}