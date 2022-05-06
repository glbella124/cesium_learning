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
let z = 200;
var center = Cesium.Cartesian3.fromDegrees(x, y, z);
var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(center);

var meshVisualizer = new MeshVisualizer({
  modelMatrix: modelMatrix,
  // up: { y: 1,z:1000 },
  position: { x: 0, y: 0, z: 100 },
});
viewer.scene.primitives.add(meshVisualizer);
meshVisualizer.showReference = false; //显示坐标轴

// 根据所选的配色方案渲染体
// let options = {
//   colorMapId: 5,
//   minVal: 26.60369,
//   maxVal: 14688.243,
//   colormapLength: 256,
//   isReverse: false,
//   alpha: 1,
//   // 体的最大值，最小值
//   volMaxValue: 14688.243,
//   volMinValue: 26.60369,
//   scaleX: 317,
//   scaleY: 228,
//   scaleZ: 200,
//   maximumSizeX: 500,
//   maximumSizeY: 500,
//   maximumSizeZ: 500,
//   // 深度
//   zDepth1:0,
//   zDepth2:0,
//   maxDepth:15,
//   type:"volume"
// }

// 根据所选配色方案绘制切片
let options = {
  colorMapId: 5,
  minVal: 26.60369,
  maxVal: 14688.243,
  colormapLength: 256,
  isReverse: false,
  alpha: 1,
  // 体的最大值，最小值
  volMaxValue: 14688.243,
  volMinValue: 26.60369,
  scaleX: 317,
  scaleY: 228,
  scaleZ: 200,
  maximumSizeX: 500,
  maximumSizeY: 500,
  maximumSizeZ: 500,
  // 深度
  zDepth1: 0.7,
  zDepth2: 0.88,
  maxDepth: 15,
  type: "slice",
};

let currentPosition =
  ((options.maxVal - options.minVal) /
    (options.volMaxValue - options.volMinValue)) *
  255;
console.log(currentPosition, "currentPosition");

var guiControls = new (function () {
  this.model = "bonsai";
  this.steps = 256.0;
  this.alphaCorrection = options.alpha;
  this.color1 = "#f00";
  this.stepPos1 = 0.1;
  this.color2 = "#fff";
  this.stepPos2 = 0.9;
  this.color3 = "#fff";
  this.stepPos3 = 1.0;
})();

// dimensions = new Cesium.Cartesian3(options.scaleX, options.scaleY, options.scaleZ);
// var dimensions = new Cesium.Cartesian3(500, 500, 1);
var dimensions;
// 切片创建
if (options.type === "slice") {
  dimensions = new Cesium.Cartesian3(317, 228, 1);
}

// 体渲染
if (options.type === "volume") {
  dimensions = new Cesium.Cartesian3(317, 228, 200);
}
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
  // wireframe:true,
  uniforms: {
    dimensions: dimensions,
  },
});
var meshFirstPass = new Mesh(boxGeometry, materialFirstPass);
var rtTexture = new FramebufferTexture(meshFirstPass);

debugger;

function GetVolumeWinterColor() {
  debugger;
  var canvas = document.createElement("canvas");
  canvas.height = 17;
  canvas.width = 150;
  var ctx = canvas.getContext("2d");
  var grd = ctx.createLinearGradient(0, 0, canvas.width - 1, canvas.height - 1);
  var colorMapLength = 256;
  // var clrmapstr = "";
  var r = 255;
  var g = 0;
  var b = 0;
  var n = (3 * colorMapLength) / 8;
  for (var i = 0; i < colorMapLength; i++) {
    var temp = (1.0 * i) / (colorMapLength - 1);
    r = 0;
    g = parseInt(255 * temp);
    b = parseInt(255 * (1.0 - 0.5 * temp));
    let colorPos = colorRGBtoHex(`${r},${g},${b}`);
    grd.addColorStop(i / colorMapLength, colorPos);
  }

  // console.log(clrmapstr, "clrmapstr - 体渲染配色方案");

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width - 1, canvas.height - 1);
  return canvas;
}
// var transferTexture = GetVolumeWinterColor();
var transferTexture = getVolumeColorMap(options.colorMapId);
// 动态生成色卡，并且下载
// document.getElementById("colorMap").appendChild(transferTexture)
// document.getElementById("save").onclick = ()=>{
//   downLoad(saveAsPNG(transferTexture))
// }

var materialSecondPass;
if (options.type === "slice") {
  materialSecondPass = new MeshMaterial({
    vertexShader: document.getElementById("vertexShaderSecondPass").textContent,
    fragmentShader: document.getElementById("fragmentShaderSecondPass")
      .textContent,
    side: MeshMaterial.Sides.FRONT,
    uniforms: {
      alpha: 1,
      dimensions: dimensions,
      tex: rtTexture,
      cubeTex: "./texture/rfidw.png",
      transferTex: transferTexture,
      steps: guiControls.steps,
      alphaCorrection: guiControls.alphaCorrection,
      maxVal:
        (options.maxVal / (options.volMaxValue - options.volMinValue)) * 255,
      minVal:
        (options.minVal / (options.volMaxValue - options.volMinValue)) * 255,
      zDepth1: options.zDepth1 / options.maxDepth,
      zDepth2: options.zDepth2 / options.maxDepth,
    },
  });
}

if (options.type === "volume") {
  materialSecondPass = new MeshMaterial({
    vertexShader: document.getElementById("vertexShaderSecondPass").textContent,
    fragmentShader: document.getElementById("fragmentShaderSecondPassVolume")
      .textContent,
    side: MeshMaterial.Sides.FRONT,
    uniforms: {
      alpha: 1,
      dimensions: dimensions,
      tex: rtTexture,
      cubeTex: "./texture/rfidw.png",
      transferTex: transferTexture,
      steps: guiControls.steps,
      alphaCorrection: guiControls.alphaCorrection,
      maxVal:
        (options.maxVal / (options.volMaxValue - options.volMinValue)) * 255,
      minVal:
        (options.minVal / (options.volMaxValue - options.volMinValue)) * 255,
    },
  });
}

var meshSecondPass = new Mesh(boxGeometry, materialSecondPass);
meshVisualizer.add(meshSecondPass);

// Cesium.knockout.track(options);
// const toolbar = document.getElementById("attributePanel");
// console.log(toolbar, "toolbar");
// Cesium.knockout.applyBindings(options, toolbar);

// Cesium.knockout
//   .getObservable(options, "scaleWithMaximumSize")
//   .subscribe((newValue) => {
//     if (newValue) {
//       options.scaleX = options.maximumSizeX;
//       options.scaleY = options.maximumSizeY;
//       options.scaleZ = options.maximumSizeZ;
//     }
//   });

// Cesium.knockout.getObservable(options, "scaleX").subscribe((newValue) => {
//   const value = Number(newValue);
//   // console.log(meshVisualizer, "meshVisualizer");
//   // materialSecondPass.uniforms.dimensions.value.x = value
// });





