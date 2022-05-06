Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NDY0ZDJmNi1lNDQ0LTRlYTMtYjkyMy1iYmM0ODczOTcwYzIiLCJpZCI6MzI3MjQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTczOTA5MTd9.mVPY1HXH9oFLZGnn2HiSz-1oAgEy7LfaqK9kc-9-oig";

const viewer = new Cesium.Viewer("cesiumContainer", {
  infoBox: false,
  selectionIndicator: false,
  shadows: true,
  shouldAnimate: true,
});

function createModel(url, height) {
  viewer.entities.removeAll();

  const position = Cesium.Cartesian3.fromDegrees(
    113.2521201,
    23.08408667,
    height
  );
  const heading = Cesium.Math.toRadians(135);
  const pitch = 0;
  const roll = 0;
  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(
    position,
    hpr
  );

  const entity = viewer.entities.add({
    name: url,
    position: position,
    orientation: orientation,
    model: {
      uri: url,
      minimumPixelSize: 128,
      maximumScale: 20000,
    },
  });
  viewer.trackedEntity = entity;
}

createModel("./SampleData/models/geology/newlayer2.gltf", 5000.0)

// const options = [
//   {
//     text: "Aircraft",
//     onselect: function () {
//       createModel("./SampleData/models/CesiumAir/Cesium_Air.glb", 5000.0);
//     },
//   },
//   {
//     text: "Drone",
//     onselect: function () {
//       createModel("../../SampleData/models/CesiumDrone/CesiumDrone.glb", 150.0);
//     },
//   },
//   {
//     text: "Ground Vehicle",
//     onselect: function () {
//       createModel("../../SampleData/models/GroundVehicle/GroundVehicle.glb", 0);
//     },
//   },
//   {
//     text: "Hot Air Balloon",
//     onselect: function () {
//       createModel(
//         "../../SampleData/models/CesiumBalloon/CesiumBalloon.glb",
//         1000.0
//       );
//     },
//   },
//   {
//     text: "Milk Truck",
//     onselect: function () {
//       createModel(
//         "../../SampleData/models/CesiumMilkTruck/CesiumMilkTruck.glb",
//         0
//       );
//     },
//   },
//   {
//     text: "Skinned Character",
//     onselect: function () {
//       createModel("../../SampleData/models/CesiumMan/Cesium_Man.glb", 0);
//     },
//   },
//   {
//     text: "Draco Compressed Model",
//     onselect: function () {
//       createModel(
//         "../../SampleData/models/DracoCompressed/CesiumMilkTruck.gltf",
//         0
//       );
//     },
//   },
//   {
//     text: "KTX2 Compressed Balloon",
//     onselect: function () {
//       if (!Cesium.FeatureDetection.supportsBasis(viewer.scene)) {
//         window.alert(
//           "This browser does not support Basis Universal compressed textures"
//         );
//       }
//       createModel(
//         "../../SampleData/models/CesiumBalloonKTX2/CesiumBalloonKTX2.glb",
//         1000.0
//       );
//     },
//   },
// ];

//   Sandcastle.addToolbarMenu(options);
