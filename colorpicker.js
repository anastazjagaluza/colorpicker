"use strict";
let originalImg = new Image();
let canvasOriginal = document.querySelector("#imageCanvas").getContext("2d");
let canvasSmall = document.querySelector("#zoomCanvas").getContext("2d");
let originalBox = document.querySelector("#original");
let originalImgData;
let smallImgData;
originalImg.addEventListener("load", function() {
  canvasOriginal.drawImage(originalImg, 0, 0);
  getImgData();
});
originalImg.src = "cat.jpg";
originalBox.addEventListener("mousemove", registerCoords);
function registerCoords(event) {
  let x = event.clientX;
  let y = event.clientY;

  canvasOriginal.putImageData(originalImgData, 0, 0);
  smallImgData = canvasOriginal.getImageData(x - 5, y + 5, 10, 10);
  canvasSmall.putImageData(smallImgData, 0, 0);
  let i = (x + y * 500) * 4;
  let r = originalImgData.data[i];
  let g = originalImgData.data[i + 1];
  let b = originalImgData.data[i + 2];
  let a = originalImgData.data[i + 3];
  let rgb = { r, g, b };
  showColorInfo(rgb);
  drawRect(x, y);
}
function getImgData() {
  originalImgData = canvasOriginal.getImageData(
    0,
    0,
    canvasOriginal.canvas.width,
    canvasOriginal.canvas.height
  );
}

function drawRect(x, y) {
  canvasOriginal.beginPath();
  canvasOriginal.lineWidth = "4";
  canvasOriginal.strokeStyle = "green";
  canvasOriginal.rect(x - 10, y + 10, 20, 20);
  canvasOriginal.stroke();
}

// 🎁 Here you go! 🎁
function showColorInfo(rgb) {
  document.querySelector("#r").textContent = rgb.r;
  document.querySelector("#g").textContent = rgb.g;
  document.querySelector("#b").textContent = rgb.b;

  const hex =
    "#" +
    rgb.r.toString(16).padStart(2, "0") +
    rgb.g.toString(16).padStart(2, "0") +
    rgb.b.toString(16).padStart(2, "0");

  document.querySelector("#hex").textContent = hex;

  document.querySelector("#colorbox").style.backgroundColor = hex;
}
