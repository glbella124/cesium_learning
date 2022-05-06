Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NDY0ZDJmNi1lNDQ0LTRlYTMtYjkyMy1iYmM0ODczOTcwYzIiLCJpZCI6MzI3MjQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTczOTA5MTd9.mVPY1HXH9oFLZGnn2HiSz-1oAgEy7LfaqK9kc-9-oig";

const viewer = new Cesium.Viewer("cesiumContainer", {
  infoBox: false,
  selectionIndicator: false,
  shadows: true,
  shouldAnimate: true,
});

//方法1 -  基础底图
let autoMap = Cesium.GeoJsonDataSource.load("./test.json", {
  clampToGround: false,
  stroke: Cesium.Color.BLACK,
  fill: Cesium.Color.BLACK.withAlpha(0.5),
  strokeWidth: 1,
});

viewer.flyTo(autoMap);
viewer.dataSources.add(autoMap);

// 方法二 - 自定义底图
// const promise = Cesium.GeoJsonDataSource.load("./test.json");
// promise
//   .then((dataSource) => {
//     viewer.dataSources.add(dataSource);
//     viewer.flyTo(dataSource)
//     const entities = dataSource.entities.values;
//     debugger
//     const colorHash = {};
//     for (let i = 0; i < entities.length; i++) {
//       const entity = entities[i];
//       const name = entity.name;
//       let color = colorHash[name];
//       if (!color) {
//         color = Cesium.Color.fromRandom({
//           alpha: 1.0,
//         });
//         colorHash[name] = color;
//       }

//       //Set the polygon material to our random color.
//       entity.polyline.material = color;
//       //Remove the outlines.
//       entity.polyline.outline = false;


//     }
//   })
//   .catch((error) => {
//     window.alert(error);
//   });

function removeAutocad() {
  viewer.dataSources.removeAll();
}

function removeBasemap() {
  viewer.imageryLayers.removeAll();
}
