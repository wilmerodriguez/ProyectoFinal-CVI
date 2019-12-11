
// En este archivo se crean todos los buffers de vértices, colores e índices para
// las primitivas de la escena.

// Variables para guardar los buffers
var cubeVertexPositionBuffer;
var cubeVertexIndexBuffer;
var sphereVertexPositionBuffer;
var sphereVertexIndexBuffer;
var sphereVertexColorBuffer0;
var sphereVertexColorBuffer1;
var sphereVertexColorBuffer2;
var sphereVertexColorBuffer3;
var sphereVertexColorBuffer4;
var sphereVertexColorBuffer5;
var sphereVertexColorBuffer6;
var sphereVertexColorBuffer7;
var sphereVertexColorBuffer8;
var sphereVertexColorBuffer9;
var sphereVertexColorBuffer10;
var sphereVertexColorBuffer11;
var sphereVertexColorBuffer12;
var sphereVertexColorBuffer13;
var sphereVertexColorBuffer14;
var sphereVertexColorBuffer15;
var sphereVertexColorBuffer16;
var sphereVertexColorBuffer17;
var sphereVertexColorBuffer18;
var sphereVertexColorBuffer19;
var cubeVertexColorBuffer0;
var cubeVertexColorBuffer1;
var cubeVertexColorBuffer2;
var cubeVertexColorBuffer3;
var cubeVertexColorBuffer4;
var cubeVertexColorBuffer5;
var cubeVertexColorBuffer6;
var cubeVertexColorBuffer7;
var cubeVertexColorBuffer8;
var cubeVertexColorBuffer9;
var cubeVertexColorBuffer10;
var cubeVertexColorBuffer11;
var cubeVertexColorBuffer12;
var cubeVertexColorBuffer13;
var cubeVertexColorBuffer14;
var cubeVertexColorBuffer15;
var cubeVertexColorBuffer16;
var cubeVertexColorBuffer17;
var cubeVertexColorBuffer18;
var cubeVertexColorBuffer19;

// Configuración de buffers
function initBuffers() {

  //-------------- Vertices para las barras--------------------------
  cubeVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
  vertices = [
    // Front face
    -1.0, -1.0,  1.0,
    1.0, -1.0,  1.0,
    1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,
    // Back face
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
    1.0,  1.0, -1.0,
    1.0, -1.0, -1.0,
    // Top face
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
    1.0,  1.0,  1.0,
    1.0,  1.0, -1.0,
    // Bottom face
    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,
    // Right face
    1.0, -1.0, -1.0,
    1.0,  1.0, -1.0,
    1.0,  1.0,  1.0,
    1.0, -1.0,  1.0,
    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  cubeVertexPositionBuffer.itemSize = 3;
  cubeVertexPositionBuffer.numItems = 24;


  cubeVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
  var cubeVertexIndices = [
    0, 1, 2,      0, 2, 3,    // Front face
    4, 5, 6,      4, 6, 7,    // Back face
    8, 9, 10,     8, 10, 11,  // Top face
    12, 13, 14,   12, 14, 15, // Bottom face
    16, 17, 18,   16, 18, 19, // Right face
    20, 21, 22,   20, 22, 23  // Left face
  ];
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
  cubeVertexIndexBuffer.itemSize = 1;
  cubeVertexIndexBuffer.numItems = 36;


  //-----------------Vertices para las esferas--------------------

  var latitudeBands = 30;
  var longitudeBands = 30;
  var radius = 1;
  var vertexPositionData = [];
  var normalData = [];
  var textureCoordData = [];
  for (var latNumber=0; latNumber <= latitudeBands; latNumber++) {
    var theta = latNumber * Math.PI / latitudeBands;
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    for (var longNumber=0; longNumber <= longitudeBands; longNumber++) {
      var phi = longNumber * 2 * Math.PI / longitudeBands;
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);
      var x = cosPhi * sinTheta;
      var y = cosTheta;
      var z = sinPhi * sinTheta;
      var u = 1 - (longNumber / longitudeBands);
      var v = 1 - (latNumber / latitudeBands);
      normalData.push(x);
      normalData.push(y);
      normalData.push(z);
      textureCoordData.push(u);
      textureCoordData.push(v);
      vertexPositionData.push(radius * x);
      vertexPositionData.push(radius * y);
      vertexPositionData.push(radius * z);
    }
  }

  sphereVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
  sphereVertexPositionBuffer.itemSize = 3;
  sphereVertexPositionBuffer.numItems = vertexPositionData.length / 3;


  var indexData = [];
  for (var latNumber=0; latNumber < latitudeBands; latNumber++) {
    for (var longNumber=0; longNumber < longitudeBands; longNumber++) {
      var first = (latNumber * (longitudeBands + 1)) + longNumber;
      var second = first + longitudeBands + 1;
      indexData.push(first);
      indexData.push(second);
      indexData.push(first + 1);
      indexData.push(second);
      indexData.push(second + 1);
      indexData.push(first + 1);
    }
  }

  sphereVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereVertexIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
  sphereVertexIndexBuffer.itemSize = 1;
  sphereVertexIndexBuffer.numItems = indexData.length;


  // -------------- PRIMER COLOR (ESFERAS) -----------------------------
  var colorsSphere = [];
  var cs = [0.5,  0.0,  0.0,  1.0];

  for (var i = 0; i < vertexPositionData.length / 3; i++){
    colorsSphere = colorsSphere.concat(cs);
  }

  sphereVertexColorBuffer0 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer0);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsSphere), gl.STATIC_DRAW);
  sphereVertexColorBuffer0.itemSize = 4;
  sphereVertexColorBuffer0.numItems = 4;

  // -------------- SEGUNDO COLOR (ESFERAS)-----------------------------
  colorsSphere = [];
  cs = [0.666, 1.0, 0.764, 1.0];

  for (var i = 0; i < vertexPositionData.length / 3; i++){
    colorsSphere = colorsSphere.concat(cs);
  }

  sphereVertexColorBuffer1 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer1);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsSphere), gl.STATIC_DRAW);
  sphereVertexColorBuffer1.itemSize = 4;
  sphereVertexColorBuffer1.numItems = 4;

  // -------------- TERCER COLOR (ESFERAS) -----------------------------
  colorsSphere = [];
  cs = [1.0, 0.843, 0.705, 1.0];

  for (var i = 0; i < vertexPositionData.length / 3; i++){
    colorsSphere = colorsSphere.concat(cs);
  }

  sphereVertexColorBuffer2 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer2);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsSphere), gl.STATIC_DRAW);
  sphereVertexColorBuffer2.itemSize = 4;
  sphereVertexColorBuffer2.numItems = 4;

  // -------------- CUARTO COLOR (ESFERAS)-----------------------------
  colorsSphere = [];
  cs = [0.0, 0.5, 0.5, 1.0];

  for (var i = 0; i < vertexPositionData.length / 3; i++){
    colorsSphere = colorsSphere.concat(cs);
  }

  sphereVertexColorBuffer3 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer3);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsSphere), gl.STATIC_DRAW);
  sphereVertexColorBuffer3.itemSize = 4;
  sphereVertexColorBuffer3.numItems = 4;

  // -------------- QUINTO COLOR (ESFERAS)-----------------------------
  colorsSphere = [];
  cs = [0.0, 0.0, 0.5, 1.0];

  for (var i = 0; i < vertexPositionData.length / 3; i++){
    colorsSphere = colorsSphere.concat(cs);
  }

  sphereVertexColorBuffer4 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer4);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsSphere), gl.STATIC_DRAW);
  sphereVertexColorBuffer4.itemSize = 4;
  sphereVertexColorBuffer4.numItems = 4;

  // -------------- SEXTO COLOR (ESFERAS)-----------------------------
  colorsSphere = [];
  cs = [1.0, 1.0, 0.768, 1.0];

  for (var i = 0; i < vertexPositionData.length / 3; i++){
    colorsSphere = colorsSphere.concat(cs);
  }

  sphereVertexColorBuffer5 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer5);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsSphere), gl.STATIC_DRAW);
  sphereVertexColorBuffer5.itemSize = 4;
  sphereVertexColorBuffer5.numItems = 4;

  // -------------- SEPTIMO COLOR (ESFERAS)-----------------------------
  colorsSphere = [];
  cs = [0.941, 0.196, 0.901, 1.0];

  for (var i = 0; i < vertexPositionData.length / 3; i++){
    colorsSphere = colorsSphere.concat(cs);
  }

  sphereVertexColorBuffer6 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer6);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsSphere), gl.STATIC_DRAW);
  sphereVertexColorBuffer6.itemSize = 4;
  sphereVertexColorBuffer6.numItems = 4;

  // -------------- OCTAVO COLOR (ESFERAS)-----------------------------
  colorsSphere = [];
  cs = [0.0, 0.509, 0.784, 1.0];

  for (var i = 0; i < vertexPositionData.length / 3; i++){
    colorsSphere = colorsSphere.concat(cs);
  }

  sphereVertexColorBuffer7 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer7);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsSphere), gl.STATIC_DRAW);
  sphereVertexColorBuffer7.itemSize = 4;
  sphereVertexColorBuffer7.numItems = 4;

  // -------------- NOVENO COLOR (ESFERAS)-----------------------------
  colorsSphere = [];
  cs = [0.901, 0.745, 1.0, 1.0];

  for (var i = 0; i < vertexPositionData.length / 3; i++){
    colorsSphere = colorsSphere.concat(cs);
  }

  sphereVertexColorBuffer8 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer8);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsSphere), gl.STATIC_DRAW);
  sphereVertexColorBuffer8.itemSize = 4;
  sphereVertexColorBuffer8.numItems = 4;

  // -------------- DECIMO COLOR (ESFERAS)-----------------------------
  colorsSphere = [];
  cs = [0.235, 0.705, 0.294, 1.0];

  for (var i = 0; i < vertexPositionData.length / 3; i++){
    colorsSphere = colorsSphere.concat(cs);
  }

  sphereVertexColorBuffer9 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer9);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsSphere), gl.STATIC_DRAW);
  sphereVertexColorBuffer9.itemSize = 4;
  sphereVertexColorBuffer9.numItems = 4;

  // -------------- UNDECIMO COLOR (ESFERAS)-----------------------------
  colorsSphere = [];
  cs = [0.274, 0.941, 0.941, 1.0];

  for (var i = 0; i < vertexPositionData.length / 3; i++){
    colorsSphere = colorsSphere.concat(cs);
  }

  sphereVertexColorBuffer10 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer10);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsSphere), gl.STATIC_DRAW);
  sphereVertexColorBuffer10.itemSize = 4;
  sphereVertexColorBuffer10.numItems = 4;

  // -------------- DECIMOSEGUNDO COLOR (ESFERAS)-----------------------------
  colorsSphere = [];
  cs = [0.960, 0.509, 0.188, 1.0];

  for (var i = 0; i < vertexPositionData.length / 3; i++){
    colorsSphere = colorsSphere.concat(cs);
  }

  sphereVertexColorBuffer11 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer11);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsSphere), gl.STATIC_DRAW);
  sphereVertexColorBuffer11.itemSize = 4;
  sphereVertexColorBuffer11.numItems = 4;

  // -------------- DECIMOTERCERO COLOR (ESFERAS)-----------------------------
  colorsSphere = [];
  cs = [0.568, 0.117, 0.705, 1.0];

  for (var i = 0; i < vertexPositionData.length / 3; i++){
    colorsSphere = colorsSphere.concat(cs);
  }

  sphereVertexColorBuffer12 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer12);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsSphere), gl.STATIC_DRAW);
  sphereVertexColorBuffer12.itemSize = 4;
  sphereVertexColorBuffer12.numItems = 4;

  // -------------- DECIMOCUARTO COLOR (ESFERAS)-----------------------------
  colorsSphere = [];
  cs = [1.0, 1.0, 0.098, 1.0];

  for (var i = 0; i < vertexPositionData.length / 3; i++){
    colorsSphere = colorsSphere.concat(cs);
  }

  sphereVertexColorBuffer13 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer13);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsSphere), gl.STATIC_DRAW);
  sphereVertexColorBuffer13.itemSize = 4;
  sphereVertexColorBuffer13.numItems = 4;

  // -------------- DECIMOQUINTO COLOR (ESFERAS)-----------------------------
  colorsSphere = [];
  cs = [0.901, 0.098, 0.294, 1.0];

  for (var i = 0; i < vertexPositionData.length / 3; i++){
    colorsSphere = colorsSphere.concat(cs);
  }

  sphereVertexColorBuffer14 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer14);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsSphere), gl.STATIC_DRAW);
  sphereVertexColorBuffer14.itemSize = 4;
  sphereVertexColorBuffer14.numItems = 4;

  // -------------- DECIMOSEXTO COLOR (ESFERAS)-----------------------------
  colorsSphere = [];
  cs = [0.980, 0.645, 0.745, 1.0];

  for (var i = 0; i < vertexPositionData.length / 3; i++){
    colorsSphere = colorsSphere.concat(cs);
  }

  sphereVertexColorBuffer15 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer15);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsSphere), gl.STATIC_DRAW);
  sphereVertexColorBuffer15.itemSize = 4;
  sphereVertexColorBuffer15.numItems = 4;

  // -------------- DECIMOSEPTIMO COLOR (ESFERAS)-----------------------------
  colorsSphere = [];
  cs = [0.5, 0.5, 0.0, 1.0];

  for (var i = 0; i < vertexPositionData.length / 3; i++){
    colorsSphere = colorsSphere.concat(cs);
  }

  sphereVertexColorBuffer16 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer16);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsSphere), gl.STATIC_DRAW);
  sphereVertexColorBuffer16.itemSize = 4;
  sphereVertexColorBuffer16.numItems = 4;

  // -------------- DECIMOOCTAVO COLOR (ESFERAS)-----------------------------
  colorsSphere = [];
  cs = [0.0, 0.0, 1.0, 1.0];

  for (var i = 0; i < vertexPositionData.length / 3; i++){
    colorsSphere = colorsSphere.concat(cs);
  }

  sphereVertexColorBuffer17 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer17);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsSphere), gl.STATIC_DRAW);
  sphereVertexColorBuffer17.itemSize = 4;
  sphereVertexColorBuffer17.numItems = 4;

  // -------------- DECIMONOVENO COLOR (ESFERAS)-----------------------------
  colorsSphere = [];
  cs = [0.666, 0.431, 0.156, 1.0];

  for (var i = 0; i < vertexPositionData.length / 3; i++){
    colorsSphere = colorsSphere.concat(cs);
  }

  sphereVertexColorBuffer18 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer18);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsSphere), gl.STATIC_DRAW);
  sphereVertexColorBuffer18.itemSize = 4;
  sphereVertexColorBuffer18.numItems = 4;

  // -------------- VIGESIMO COLOR (ESFERAS)-----------------------------
  colorsSphere = [];
  cs = [0.0, 1.0, 0.0, 1.0];

  for (var i = 0; i < vertexPositionData.length / 3; i++){
    colorsSphere = colorsSphere.concat(cs);
  }

  sphereVertexColorBuffer19 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer19);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsSphere), gl.STATIC_DRAW);
  sphereVertexColorBuffer19.itemSize = 4;
  sphereVertexColorBuffer19.numItems = 4;

  // -------------- PRIMER COLOR (BARRAS)-----------------------------
  cubeVertexColorBuffer0 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer0);
  colors = [
    [0.5, 0.0, 0.0, 1.0], // Front face
    [0.5, 0.0, 0.0, 1.0], // Back face
    [0.5, 0.0, 0.0, 1.0], // Top face
    [0.5, 0.0, 0.0, 1.0], // Bottom face
    [0.5, 0.0, 0.0, 1.0], // Right face
    [0.5, 0.0, 0.0, 1.0]  // Left face
  ];
  var colores = [];
  for (var i in colors) {
    var color = colors[i];
    for (var j=0; j < 4; j++) {
      colores = colores.concat(color);
    }
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colores), gl.STATIC_DRAW);
  cubeVertexColorBuffer0.itemSize = 4;
  cubeVertexColorBuffer0.numItems = 24;

  // -------------- SEGUNDO COLOR (BARRAS)------------------
  cubeVertexColorBuffer1 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer1);
  colors = [
    [0.666, 1.0, 0.764, 1.0], // Front face
    [0.666, 1.0, 0.764, 1.0], // Back face
    [0.666, 1.0, 0.764, 1.0], // Top face
    [0.666, 1.0, 0.764, 1.0], // Bottom face
    [0.666, 1.0, 0.764, 1.0], // Right face
    [0.666, 1.0, 0.764, 1.0]  // Left face
  ];
  colores = [];
  for (var i in colors) {
    var color = colors[i];
    for (var j=0; j < 4; j++) {
      colores = colores.concat(color);
    }
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colores), gl.STATIC_DRAW);
  cubeVertexColorBuffer1.itemSize = 4;
  cubeVertexColorBuffer1.numItems = 24;

  // -------------- TERCER COLOR (BARRAS) ------------------
  cubeVertexColorBuffer2 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer2);
  colors = [
    [1.0, 0.843, 0.705, 1.0], // Front face
    [1.0, 0.843, 0.705, 1.0], // Back face
    [1.0, 0.843, 0.705, 1.0], // Top face
    [1.0, 0.843, 0.705, 1.0], // Bottom face
    [1.0, 0.843, 0.705, 1.0], // Right face
    [1.0, 0.843, 0.705, 1.0]  // Left face
  ];
  colores = [];
  for (var i in colors) {
    var color = colors[i];
    for (var j=0; j < 4; j++) {
      colores = colores.concat(color);
    }
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colores), gl.STATIC_DRAW);
  cubeVertexColorBuffer2.itemSize = 4;
  cubeVertexColorBuffer2.numItems = 24;

  // -------------- CUARTO COLOR (BARRAS) ------------------
  cubeVertexColorBuffer3 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer3);
  colors = [
    [0.0, 0.5, 0.5, 1.0], // Front face
    [0.0, 0.5, 0.5, 1.0], // Back face
    [0.0, 0.5, 0.5, 1.0], // Top face
    [0.0, 0.5, 0.5, 1.0], // Bottom face
    [0.0, 0.5, 0.5, 1.0], // Right face
    [0.0, 0.5, 0.5, 1.0]  // Left face
  ];
  colores = [];
  for (var i in colors) {
    var color = colors[i];
    for (var j=0; j < 4; j++) {
      colores = colores.concat(color);
    }
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colores), gl.STATIC_DRAW);
  cubeVertexColorBuffer3.itemSize = 4;
  cubeVertexColorBuffer3.numItems = 24;

  // -------------- QUINTO COLOR (BARRAS) ------------------
  cubeVertexColorBuffer4 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer4);
  colors = [
    [0.0, 0.0, 0.5, 1.0], // Front face
    [0.0, 0.0, 0.5, 1.0], // Back face
    [0.0, 0.0, 0.5, 1.0], // Top face
    [0.0, 0.0, 0.5, 1.0], // Bottom face
    [0.0, 0.0, 0.5, 1.0], // Right face
    [0.0, 0.0, 0.5, 1.0]  // Left face
  ];
  colores = [];
  for (var i in colors) {
    var color = colors[i];
    for (var j=0; j < 4; j++) {
      colores = colores.concat(color);
    }
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colores), gl.STATIC_DRAW);
  cubeVertexColorBuffer4.itemSize = 4;
  cubeVertexColorBuffer4.numItems = 24;

  // -------------- SEXTO COLOR (BARRAS)------------------
  cubeVertexColorBuffer5 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer5);
  colors = [
    [1.0, 1.0, 0.768, 1.0], // Front face
    [1.0, 1.0, 0.768, 1.0], // Back face
    [1.0, 1.0, 0.768, 1.0], // Top face
    [1.0, 1.0, 0.768, 1.0], // Bottom face
    [1.0, 1.0, 0.768, 1.0], // Right face
    [1.0, 1.0, 0.768, 1.0]  // Left face
  ];
  colores = [];
  for (var i in colors) {
    var color = colors[i];
    for (var j=0; j < 4; j++) {
      colores = colores.concat(color);
    }
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colores), gl.STATIC_DRAW);
  cubeVertexColorBuffer5.itemSize = 4;
  cubeVertexColorBuffer5.numItems = 24;

  // -------------- SEPTIMO COLOR (BARRAS) ------------------
  cubeVertexColorBuffer6 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer6);
  colors = [
    [0.941, 0.196, 0.901, 1.0], // Front face
    [0.941, 0.196, 0.901, 1.0], // Back face
    [0.941, 0.196, 0.901, 1.0], // Top face
    [0.941, 0.196, 0.901, 1.0], // Bottom face
    [0.941, 0.196, 0.901, 1.0], // Right face
    [0.941, 0.196, 0.901, 1.0]  // Left face
  ];
  colores = [];
  for (var i in colors) {
    var color = colors[i];
    for (var j=0; j < 4; j++) {
      colores = colores.concat(color);
    }
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colores), gl.STATIC_DRAW);
  cubeVertexColorBuffer6.itemSize = 4;
  cubeVertexColorBuffer6.numItems = 24;

  // -------------- OCTAVO COLOR (BARRAS) ------------------
  cubeVertexColorBuffer7 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer7);
  colors = [
    [0.0, 0.509, 0.784, 1.0], // Front face
    [0.0, 0.509, 0.784, 1.0], // Back face
    [0.0, 0.509, 0.784, 1.0], // Top face
    [0.0, 0.509, 0.784, 1.0], // Bottom face
    [0.0, 0.509, 0.784, 1.0], // Right face
    [0.0, 0.509, 0.784, 1.0]  // Left face
  ];
  colores = [];
  for (var i in colors) {
    var color = colors[i];
    for (var j=0; j < 4; j++) {
      colores = colores.concat(color);
    }
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colores), gl.STATIC_DRAW);
  cubeVertexColorBuffer7.itemSize = 4;
  cubeVertexColorBuffer7.numItems = 24;

  // -------------- NOVENO COLOR (BARRAS) ------------------
  cubeVertexColorBuffer8 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer8);
  colors = [
    [0.901, 0.745, 1.0, 1.0], // Front face
    [0.901, 0.745, 1.0, 1.0], // Back face
    [0.901, 0.745, 1.0, 1.0], // Top face
    [0.901, 0.745, 1.0, 1.0], // Bottom face
    [0.901, 0.745, 1.0, 1.0], // Right face
    [0.901, 0.745, 1.0, 1.0]  // Left face
  ];
  colores = [];
  for (var i in colors) {
    var color = colors[i];
    for (var j=0; j < 4; j++) {
      colores = colores.concat(color);
    }
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colores), gl.STATIC_DRAW);
  cubeVertexColorBuffer8.itemSize = 4;
  cubeVertexColorBuffer8.numItems = 24;

  // -------------- DECIMO COLOR (BARRAS) ------------------
  cubeVertexColorBuffer9 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer9);
  colors = [
    [0.235, 0.705, 0.294, 1.0], // Front face
    [0.235, 0.705, 0.294, 1.0], // Back face
    [0.235, 0.705, 0.294, 1.0], // Top face
    [0.235, 0.705, 0.294, 1.0], // Bottom face
    [0.235, 0.705, 0.294, 1.0], // Right face
    [0.235, 0.705, 0.294, 1.0]  // Left face
  ];
  colores = [];
  for (var i in colors) {
    var color = colors[i];
    for (var j=0; j < 4; j++) {
      colores = colores.concat(color);
    }
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colores), gl.STATIC_DRAW);
  cubeVertexColorBuffer9.itemSize = 4;
  cubeVertexColorBuffer9.numItems = 24;

  // -------------- UNDECIMO COLOR (BARRAS) ------------------
  cubeVertexColorBuffer10 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer10);
  colors = [
    [0.274, 0.941, 0.941, 1.0], // Front face
    [0.274, 0.941, 0.941, 1.0], // Back face
    [0.274, 0.941, 0.941, 1.0], // Top face
    [0.274, 0.941, 0.941, 1.0], // Bottom face
    [0.274, 0.941, 0.941, 1.0], // Right face
    [0.274, 0.941, 0.941, 1.0]  // Left face
  ];
  colores = [];
  for (var i in colors) {
    var color = colors[i];
    for (var j=0; j < 4; j++) {
      colores = colores.concat(color);
    }
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colores), gl.STATIC_DRAW);
  cubeVertexColorBuffer10.itemSize = 4;
  cubeVertexColorBuffer10.numItems = 24;

  // -------------- DECIMOSEGUNDO COLOR (BARRAS) ------------------
  cubeVertexColorBuffer11 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer11);
  colors = [
    [0.960, 0.509, 0.188, 1.0], // Front face
    [0.960, 0.509, 0.188, 1.0], // Back face
    [0.960, 0.509, 0.188, 1.0], // Top face
    [0.960, 0.509, 0.188, 1.0], // Bottom face
    [0.960, 0.509, 0.188, 1.0], // Right face
    [0.960, 0.509, 0.188, 1.0]  // Left face
  ];
  colores = [];
  for (var i in colors) {
    var color = colors[i];
    for (var j=0; j < 4; j++) {
      colores = colores.concat(color);
    }
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colores), gl.STATIC_DRAW);
  cubeVertexColorBuffer11.itemSize = 4;
  cubeVertexColorBuffer11.numItems = 24;

  // -------------- DECIMOTERCERO COLOR (BARRAS) ------------------
  cubeVertexColorBuffer12 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer12);
  colors = [
    [0.568, 0.117, 0.705, 1.0], // Front face
    [0.568, 0.117, 0.705, 1.0], // Back face
    [0.568, 0.117, 0.705, 1.0], // Top face
    [0.568, 0.117, 0.705, 1.0], // Bottom face
    [0.568, 0.117, 0.705, 1.0], // Right face
    [0.568, 0.117, 0.705, 1.0]  // Left face
  ];
  colores = [];
  for (var i in colors) {
    var color = colors[i];
    for (var j=0; j < 4; j++) {
      colores = colores.concat(color);
    }
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colores), gl.STATIC_DRAW);
  cubeVertexColorBuffer12.itemSize = 4;
  cubeVertexColorBuffer12.numItems = 24;

  // -------------- DECIMOCUARTO COLOR (BARRAS) ------------------
  cubeVertexColorBuffer13 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer13);
  colors = [
    [1.0, 1.0, 0.098, 1.0], // Front face
    [1.0, 1.0, 0.098, 1.0], // Back face
    [1.0, 1.0, 0.098, 1.0], // Top face
    [1.0, 1.0, 0.098, 1.0], // Bottom face
    [1.0, 1.0, 0.098, 1.0], // Right face
    [1.0, 1.0, 0.091, 1.0]  // Left face
  ];
  colores = [];
  for (var i in colors) {
    var color = colors[i];
    for (var j=0; j < 4; j++) {
      colores = colores.concat(color);
    }
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colores), gl.STATIC_DRAW);
  cubeVertexColorBuffer13.itemSize = 4;
  cubeVertexColorBuffer13.numItems = 24;

  // -------------- DECIMOQUINTO COLOR (BARRAS) ------------------
  cubeVertexColorBuffer14 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer14);
  colors = [
    [0.901, 0.098, 0.294, 1.0], // Front face
    [0.901, 0.098, 0.294, 1.0], // Back face
    [0.901, 0.098, 0.294, 1.0], // Top face
    [0.901, 0.098, 0.294, 1.0], // Bottom face
    [0.901, 0.098, 0.294, 1.0], // Right face
    [0.901, 0.098, 0.294, 1.0]  // Left face
  ];
  colores = [];
  for (var i in colors) {
    var color = colors[i];
    for (var j=0; j < 4; j++) {
      colores = colores.concat(color);
    }
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colores), gl.STATIC_DRAW);
  cubeVertexColorBuffer14.itemSize = 4;
  cubeVertexColorBuffer14.numItems = 24;

  // -------------- DECIMOSEXTO COLOR (BARRAS) ------------------
  cubeVertexColorBuffer15 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer15);
  colors = [
    [0.980, 0.645, 0.745, 1.0], // Front face
    [0.980, 0.645, 0.745, 1.0], // Back face
    [0.980, 0.645, 0.745, 1.0], // Top face
    [0.980, 0.645, 0.745, 1.0], // Bottom face
    [0.980, 0.645, 0.745, 1.0], // Right face
    [0.980, 0.645, 0.745, 1.0]  // Left face
  ];
  colores = [];
  for (var i in colors) {
    var color = colors[i];
    for (var j=0; j < 4; j++) {
      colores = colores.concat(color);
    }
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colores), gl.STATIC_DRAW);
  cubeVertexColorBuffer15.itemSize = 4;
  cubeVertexColorBuffer15.numItems = 24;

  // -------------- DECIMOSEPTIMO COLOR (BARRAS)------------------
  cubeVertexColorBuffer16 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer16);
  colors = [
    [0.5, 0.5, 0.0, 1.0], // Front face
    [0.5, 0.5, 0.0, 1.0], // Back face
    [0.5, 0.5, 0.0, 1.0], // Top face
    [0.5, 0.5, 0.0, 1.0], // Bottom face
    [0.5, 0.5, 0.0, 1.0], // Right face
    [0.5, 0.5, 0.0, 1.0]  // Left face
  ];
  colores = [];
  for (var i in colors) {
    var color = colors[i];
    for (var j=0; j < 4; j++) {
      colores = colores.concat(color);
    }
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colores), gl.STATIC_DRAW);
  cubeVertexColorBuffer16.itemSize = 4;
  cubeVertexColorBuffer16.numItems = 24;

  // -------------- DECIMOOCTAVO COLOR (BARRAS) ------------------
  cubeVertexColorBuffer17 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer17);
  colors = [
    [0.0, 0.0, 1.0, 1.0], // Front face
    [0.0, 0.0, 1.0, 1.0], // Back face
    [0.0, 0.0, 1.0, 1.0], // Top face
    [0.0, 0.0, 1.0, 1.0], // Bottom face
    [0.0, 0.0, 1.0, 1.0], // Right face
    [0.0, 0.0, 1.0, 1.0]  // Left face
  ];
  colores = [];
  for (var i in colors) {
    var color = colors[i];
    for (var j=0; j < 4; j++) {
      colores = colores.concat(color);
    }
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colores), gl.STATIC_DRAW);
  cubeVertexColorBuffer17.itemSize = 4;
  cubeVertexColorBuffer17.numItems = 24;

  // -------------- DECIMONOVENO COLOR (BARRAS) ------------------
  cubeVertexColorBuffer18 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer18);
  colors = [
    [0.666, 0.431, 0.156, 1.0], // Front face
    [0.666, 0.431, 0.156, 1.0], // Back face
    [0.666, 0.431, 0.156, 1.0], // Top face
    [0.666, 0.431, 0.156, 1.0], // Bottom face
    [0.666, 0.431, 0.156, 1.0], // Right face
    [0.666, 0.431, 0.156, 1.0]  // Left face
  ];
  colores = [];
  for (var i in colors) {
    var color = colors[i];
    for (var j=0; j < 4; j++) {
      colores = colores.concat(color);
    }
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colores), gl.STATIC_DRAW);
  cubeVertexColorBuffer18.itemSize = 4;
  cubeVertexColorBuffer18.numItems = 24;

  // -------------- VIGESIMO COLOR (BARRAS) ------------------
  cubeVertexColorBuffer19 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer19);
  colors = [
    [0.0, 1.0, 0.0, 1.0], // Front face
    [0.0, 1.0, 0.0, 1.0], // Back face
    [0.0, 1.0, 0.0, 1.0], // Top face
    [0.0, 1.0, 0.0, 1.0], // Bottom face
    [0.0, 1.0, 0.0, 1.0], // Right face
    [0.0, 1.0, 0.0, 1.0]  // Left face
  ];
  colores = [];
  for (var i in colors) {
    var color = colors[i];
    for (var j=0; j < 4; j++) {
      colores = colores.concat(color);
    }
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colores), gl.STATIC_DRAW);
  cubeVertexColorBuffer19.itemSize = 4;
  cubeVertexColorBuffer19.numItems = 24;

}
