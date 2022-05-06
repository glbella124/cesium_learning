// <reference path="../common.js" />
// <reference path="../../../dist/CesiumMeshVisualizer.js" />

//requirejs([
//       "../../../requirejs.config.js",
//       "../../../appconfig.js",
//       '../../../Source/Main',
//       '../common.js'
//], function (
//       config,
//       appconfig,
//       Cesium,
//       common
//       ) {

MeshVisualizer = Cesium.MeshVisualizer;
Mesh = Cesium.Mesh;
MeshMaterial = Cesium.MeshMaterial;
FramebufferTexture = Cesium.FramebufferTexture;
GeometryUtils = Cesium.GeometryUtils;
LOD = Cesium.LOD;

init();

let x = 113.2535935;
let y = 23.085009;
let z = 20;
var center = Cesium.Cartesian3.fromDegrees(x, y, z);
var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(center);

var meshVisualizer = new MeshVisualizer({
  modelMatrix: modelMatrix,
  up: { y: 1 },
  // position: { x: 0, y: 0, z: 10 }
});
viewer.scene.primitives.add(meshVisualizer);
meshVisualizer.showReference = true; //显示坐标轴

// var guiControls = new function () {
//     this.model = 'bonsai';
//     this.steps = 256.0;
//     this.alphaCorrection = 1.0;
//     this.color1 = "#00FA58";
//     this.stepPos1 = 0.1;
//     this.color2 = "#CC6600";
//     this.stepPos2 = 0.7;
//     this.color3 = "#F2F200";
//     this.stepPos3 = 1.0;
// };

var guiControls = new (function () {
  this.model = "bonsai";
  this.steps = 256.0;
  this.alphaCorrection = 1.0;
  this.color1 = "#f00";
  this.stepPos1 = 0.1;
  this.color2 = "#fff";
  this.stepPos2 = 0.9;
  this.color3 = "#fff";
  this.stepPos3 = 1.0;
})();
function colorRGBtoHex(color) {
  var rgb = color.split(",");
  var r = parseInt(rgb[0].split("(")[1]);
  var g = parseInt(rgb[1]);
  var b = parseInt(rgb[2].split(")")[0]);
  var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return hex;
}

// 保存成png格式的图片
function saveAsPNG(canvas) {
  return canvas.toDataURL("image/png")
}

function downLoad(url) {
  var oA = document.createElement("a");
  oA.download = '';// 设置下载的文件名，默认是'下载'
  oA.href = url;
  document.body.appendChild(oA);
  oA.click();
  oA.remove(); // 下载之后把创建的元素删除
}

// GetBlueColor 7
function updateTransferFunction() {
  var canvas = document.createElement("canvas");
  canvas.height = 17;
  canvas.width = 150;
  var ctx = canvas.getContext("2d");
  var grd = ctx.createLinearGradient(0, 0, canvas.width - 1, canvas.height - 1);
  // 默认配色方案
  // var colormapLength = 256;
  // var r = 255;
  // var g = 0;
  // var b = 0;
  // for (var i = 0; i < colormapLength; i++) {
  //     r = 255;
  //     g = 255 - parseInt(255 * (1.0 * i / (colormapLength - 1)));
  //     b = 255 - g;
  //     let colorPos = colorRGBtoHex(`${r},${g},${b}`)
  //     grd.addColorStop(i/colormapLength, colorPos);
  // }

  // GetSummerColor - 1
  // var colormapLength00 = 256;
  // var clrmapstr = "";
  // var r = 255;
  // var g = 0;
  // var b = 0;
  // var n = (3 * colormapLength00) / 8;
  // for (var i = 0; i < colormapLength00; i++) {
  //   var temp = 1 - (1.0 * i) / (colormapLength00 - 1);

  //   r = parseInt(255 * temp);
  //   g = parseInt(255 * 0.5 * (1 + temp));
  //   b = parseInt(255 * 0.4);
  //   let colorPos = colorRGBtoHex(`${r},${g},${b}`);
  //   grd.addColorStop(i / colormapLength00, colorPos);
  //   if (i > 0) clrmapstr += "\n";
  //   clrmapstr += parseInt(r) + " " + parseInt(g) + " " + parseInt(b);
  // }

  // GetSpringColor


  //GetBlueColor - 7
  // var colormapLength = 256;
  // var clrmapstr = "";
  // var r = 255;
  // var g = 0;
  // var b = 0;
  // var n = (3 * colormapLength) / 8;
  // for (var i = 0; i < colormapLength; i++) {
  //   if (i < n) r = (1.0 * (i + 1)) / n;
  //   else r = 1.0;
  //   if (i < n) g = 0;
  //   else if (i >= n && i < 2 * n) g = (1.0 * (i + 1 - n)) / n;
  //   else g = 1;
  //   if (i < 2 * n) b = 0;
  //   else b = (1.0 * (i + 1 - 2 * n)) / (colormapLength - 2 * n);

  //   {
  //     r = 255 - parseInt(255 * r);
  //     g = 255 - parseInt(255 * g);
  //     b = 255 - parseInt(255 * b);
  //     let colorPos = colorRGBtoHex(`${r},${g},${b}`);
  //     grd.addColorStop(i / colormapLength, colorPos);
  //   }

  //   if (i > 0) clrmapstr += "\n";
  //   clrmapstr += parseInt(r) + " " + parseInt(g) + " " + parseInt(b);
  // }

  

  // GetWinterColor - 4
  var colormapLength = 256;
  // var clrmapstr = "";
  var r = 255;
  var g = 0;
  var b = 0;
  var n = 3 * colormapLength / 8;
  for (var i = 0; i < colormapLength; i++) {
    var temp = 1.0 * i / (colormapLength - 1);
    r = 0;
    g = parseInt(255 * temp);
    b = parseInt(255 * (1.0 - 0.5 * temp));
    let colorPos = colorRGBtoHex(`${r},${g},${b}`);
    grd.addColorStop(i / colormapLength, colorPos);
    // if (i > 0)
    //   clrmapstr += "\n";
    // clrmapstr += parseInt(r) + " " + parseInt(g) + " " + parseInt(b);
  }



  // console.log(clrmapstr, "clrmapstr - 体渲染配色方案");

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width - 1, canvas.height - 1);
  document.getElementById("colorMap").appendChild(canvas);
  // document.getElementById("save").onclick = function () {
  //   downLoad(saveAsPNG(canvas))
  // }
  //   document.getElementById("creditContainer").appendChild(canvas);

  return canvas;
}

var dimensions = new Cesium.Cartesian3(500, 500, 500);
var boxGeometry = Cesium.BoxGeometry.createGeometry(
  Cesium.BoxGeometry.fromDimensions({
    dimensions: dimensions,
    vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
  })
);

var materialFirstPass = new MeshMaterial({
  vertexShader: document.getElementById("vertexShaderFirstPass").textContent,
  fragmentShader: document.getElementById("fragmentShaderFirstPass")
    .textContent,
  side: MeshMaterial.Sides.BACK,
  depthTest: false,
  uniforms: {
    dimensions: dimensions,
  },
});
var meshFirstPass = new Mesh(boxGeometry, materialFirstPass);
var rtTexture = new FramebufferTexture(meshFirstPass);
var transferTexture = updateTransferFunction();
var materialSecondPass = new MeshMaterial({
  vertexShader: document.getElementById("vertexShaderSecondPass").textContent,
  fragmentShader: document.getElementById("fragmentShaderSecondPass")
    .textContent,
  side: MeshMaterial.Sides.FRONT,
  uniforms: {
    alpha: 1,
    dimensions: dimensions,
    tex: rtTexture,
    cubeTex: "./teapot.raw.png",
    transferTex: transferTexture,
    steps: guiControls.steps,
    alphaCorrection: guiControls.alphaCorrection,
  },
});

var meshSecondPass = new Mesh(boxGeometry, materialSecondPass);
meshVisualizer.add(meshSecondPass);
//});
