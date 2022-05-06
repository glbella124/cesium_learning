var appConfig = {
  BaseURL: "../../../",
};
// window.CESIUM_BASE_URL = appConfig.BaseURL + "ThirdParty/Cesium/";
//准备
var homePosition = [113.2535935, 23.085009, 700]; //初始位置
var viewer = null;
var home = Cesium.Cartesian3.fromDegrees(
  homePosition[0],
  homePosition[1],
  homePosition[2]
);

//初始化
function init() {
  debugger;
  if (viewer) {
    return;
  }
  Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NDY0ZDJmNi1lNDQ0LTRlYTMtYjkyMy1iYmM0ODczOTcwYzIiLCJpZCI6MzI3MjQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTczOTA5MTd9.mVPY1HXH9oFLZGnn2HiSz-1oAgEy7LfaqK9kc-9-oig";

  viewer = new Cesium.Viewer("cesiumContainer", {
    animation: false,
    timeline: false,
    creditContainer: "creditContainer",
    // terrainProvider: new Cesium.ArcGISTiledElevationTerrainProvider({
    //     url:
    //         "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
    //     requestWaterMask: true,
    // }),
  });
  if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
    //移动设备上禁掉以下几个选项，可以相对更加流畅
    viewer.scene.fog.enable = false;
    viewer.scene.skyAtmosphere.show = false;
    viewer.scene.fxaa = false;
  }
  viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (
    evt
  ) {
    look(homePosition[0], homePosition[1], homePosition[2]);
    evt.cancel = true;
  });

  viewer.scene.globe.baseColor = Cesium.Color.GREY.withAlpha(0.1);
  viewer.scene.skyAtmosphere.show = false;
  viewer.scene.skyBox.show = false;
  viewer.scene.backgroundColor = Cesium.Color.WHITE;

  // 添加地形
  // let configUrl = "http://122.112.231.165/data/dem"
  // let configUrl =
  // "https://www.supermapol.com/realspace/services/3D-stk_terrain/rest/realspace/datas/info/data/path";
  let configUrl =
    "http://47.119.187.14:9002/dt-api/ProjectPath/1417437301540413442/1417437436236292098/1405431307315449999/cd40928f53e14bbf83fc185bd6ce9815/cd40928f53e14bbf83fc185bd6ce9816";
  viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
    url: configUrl,
    requestWaterMask: true,
    requestVertexNormals: true,
    // isSct: false,
  });

  // 地下模式
  // viewer.scene.globe.translucency.frontFaceAlphaByDistance =
  // new Cesium.NearFarScalar(400.0, 0.0, 800.0, 1.0);
  // viewer.scene.screenSpaceCameraController.enableCollisionDetection = false;
  // viewer.scene.globe.translucency.enabled = true;
  // viewer.scene.globe.translucency.frontFaceAlphaByDistance.nearValue = 0.6;
  // viewer.scene.globe.translucency.frontFaceAlphaByDistance.farValue = 0.8;

  navigationHelpButtonLang();
  //设置操作习惯
  viewer.scene.screenSpaceCameraController.zoomEventTypes = [
    Cesium.CameraEventType.WHEEL,
    Cesium.CameraEventType.PINCH,
  ];
  viewer.scene.screenSpaceCameraController.tiltEventTypes = [
    Cesium.CameraEventType.PINCH,
    Cesium.CameraEventType.RIGHT_DRAG,
  ];

  look(homePosition[0], homePosition[1], homePosition[2]);

  var imageryProviderViewModels =
    viewer.baseLayerPicker.viewModel.imageryProviderViewModels;
  viewer.baseLayerPicker.viewModel.selectedImagery =
    imageryProviderViewModels[3];
  viewer.extend(Cesium.viewerCesiumInspectorMixin);
  viewer.cesiumInspector.container.style.display = "none";
  viewer.scene.debugShowFramesPerSecond = true;
  document.addEventListener("keydown", function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e) {
      switch (e.keyCode) {
        case 82: //R键查看地形三角网
          if (viewer.cesiumInspector) {
            viewer.cesiumInspector.viewModel.wireframe =
              !viewer.cesiumInspector.viewModel.wireframe;
          }
          break;
        case 70: //F键查看帧率
          viewer.scene.debugShowFramesPerSecond =
            !viewer.scene.debugShowFramesPerSecond;
          break;
        default:
      }
    }
  });
}
//汉化帮助按钮
function navigationHelpButtonLang() {
  var viewer = this.viewer;
  if (viewer.navigationHelpButton) {
    viewer.navigationHelpButton.viewModel.tooltip = "操作指南";

    var clickHelper =
      viewer.navigationHelpButton.container.getElementsByClassName(
        "cesium-click-navigation-help"
      )[0];
    var touchHelper =
      viewer.navigationHelpButton.container.getElementsByClassName(
        "cesium-touch-navigation-help"
      )[0];

    var button = viewer.navigationHelpButton.container.getElementsByClassName(
      "cesium-navigation-button-right"
    )[0];
    button.innerHTML = button.innerHTML.replace(">Touch", ">手势");
    button = viewer.navigationHelpButton.container.getElementsByClassName(
      "cesium-navigation-button-left"
    )[0];
    button.innerHTML = button.innerHTML.replace(">Mouse", ">鼠标");

    var click_help_pan = clickHelper.getElementsByClassName(
      "cesium-navigation-help-pan"
    )[0];
    click_help_pan.innerHTML = "平移";
    var click_help_pan_details =
      click_help_pan.parentNode.getElementsByClassName(
        "cesium-navigation-help-details"
      )[0];
    click_help_pan_details.innerHTML = "按下左键 + 拖动";

    var click_help_zoom = clickHelper.getElementsByClassName(
      "cesium-navigation-help-zoom"
    )[0];
    click_help_zoom.innerHTML = "旋转";
    click_help_zoom.parentNode.getElementsByClassName(
      "cesium-navigation-help-details"
    )[0].innerHTML = "按下右键+拖动";
    click_help_zoom.parentNode.getElementsByClassName(
      "cesium-navigation-help-details"
    )[1].innerHTML = "";

    var click_help_rotate = clickHelper.getElementsByClassName(
      "cesium-navigation-help-rotate"
    )[0];
    click_help_rotate.innerHTML = "缩放";
    click_help_rotate.parentNode.getElementsByClassName(
      "cesium-navigation-help-details"
    )[0].innerHTML = "滚动鼠标滚轮";
    click_help_rotate.parentNode.getElementsByClassName(
      "cesium-navigation-help-details"
    )[1].innerHTML = "";

    //触屏操作
    var touch_help_pan = touchHelper.getElementsByClassName(
      "cesium-navigation-help-pan"
    )[0];
    touch_help_pan.innerHTML = "平移";
    touch_help_pan.parentNode.getElementsByClassName(
      "cesium-navigation-help-details"
    )[0].innerHTML = "单指拖动";

    var touch_help_zoom = touchHelper.getElementsByClassName(
      "cesium-navigation-help-zoom"
    )[0];
    touch_help_zoom.innerHTML = "缩放";
    touch_help_zoom.parentNode.getElementsByClassName(
      "cesium-navigation-help-details"
    )[0].innerHTML = "双指捏合";

    var touch_help_tilt = touchHelper.getElementsByClassName(
      "cesium-navigation-help-rotate"
    )[0];
    touch_help_tilt.innerHTML = "俯仰";
    touch_help_tilt.parentNode.getElementsByClassName(
      "cesium-navigation-help-details"
    )[0].innerHTML = "双指同向拖动";

    var touch_help_rotate = touchHelper.getElementsByClassName(
      "cesium-navigation-help-tilt"
    )[0];
    touch_help_rotate.innerHTML = "旋转";
    touch_help_rotate.parentNode.getElementsByClassName(
      "cesium-navigation-help-details"
    )[0].innerHTML = "双指反向拖动";
  }
}
function look(lon, lat, offset) {
  if (!viewer) {
    return;
  }
  var center = Cesium.Cartesian3.fromDegrees(lon, lat);
  var transform = Cesium.Transforms.eastNorthUpToFixedFrame(center);

  // View in east-north-up frame
  var camera = viewer.camera;
  camera.constrainedAxis = Cesium.Cartesian3.UNIT_Z;
  camera.lookAtTransform(
    transform,
    new Cesium.Cartesian3(-offset, -offset, offset)
  );
  setTimeout(function () {
    camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
  }, 100);
}
