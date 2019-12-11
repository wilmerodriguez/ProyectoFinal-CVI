// Este programa renderiza la escena.

function drawScene() {
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 400.0, pMatrix);
  mat4.identity(mvMatrix);


  mat4.translate(mvMatrix, [-0.0, 0.0, zAug]); // Para Zoom

  var numColor = 0; // indica el numero de Color a dibujar
  var datos = 1;  // Se usa para seleccionar solo los valores numéricos de los datos.

  // Selección de gráfico con barras
  if( primitivaSel === 0){
    z = -40;
    mat4.translate(mvMatrix, [-0.0, 0.0, z]);
    mat4.rotate(mvMatrix, degToRad(xRot), [1, 0, 0]);
    mat4.rotate(mvMatrix, degToRad(yRot), [0, 1, 0]);
    mat4.rotate(mvMatrix, degToRad(zRot), [0, 0, 1]);
    mat4.scale(mvMatrix, [1, factorAumento, 1]);

    // Selección de cuadrícula para barras
    if( graficoSel === 0 ){
      var ix = -10.0; // posicion inicial en X para primer barra
      var iz = 10.0; // posicion inicial en Z para primer barra

      // Se dibujan los 20 objetos
      for (var j = 0; j < 4; j++){
        for (var i = 0; i < 5; i++){
          mvPushMatrix();
          mat4.translate(mvMatrix, [ix, 0.0, iz]);
          mat4.scale(mvMatrix, [1, poblacion[datos], 1]);
          drawCube(numColor);
          mvPopMatrix();
          ix = ix + 5;
          numColor++;
          datos += 2;
        }
        iz = iz - 5;
        ix = -10.0;
      }
      // Selección de circunferencia para barras
    } else if(graficoSel === 1){

      var xDeg ={};
      var zDeg ={};
      var valor = 0;

      //Lugares en donde se dibujan los objetos en la circunferencia
      for(var n = 0; n < 20; n++){
        xDeg[n] = 12 * Math.cos(degToRad(valor));
        zDeg[n]= 12 * Math.sin(degToRad(valor));
        valor += 18;
      }

      // Se dibujan los 20 objetos
      for (var i = 0; i < 20; i++){
        mvPushMatrix();
        mat4.translate(mvMatrix, [xDeg[i], 0.0, zDeg[i]]);
        mat4.scale(mvMatrix, [1, poblacion[datos], 1]);
        drawCube(numColor);
        mvPopMatrix();
        numColor++;
        datos += 2;
      }
    }
    // Selección de esferas
  }else if(primitivaSel === 1){
    // Selección de cuadrícula para esferas
    if( graficoSel === 0 ){
      z = -120;
      mat4.translate(mvMatrix, [-0.0, 0.0, z]);
      mat4.rotate(mvMatrix, degToRad(xRot), [1, 0, 0]);
      mat4.rotate(mvMatrix, degToRad(yRot), [0, 1, 0]);
      mat4.rotate(mvMatrix, degToRad(zRot), [0, 0, 1]);
      mat4.scale(mvMatrix, [factorAumento, factorAumento, factorAumento]);

      var ix = -40.0; // posicion inicial en X para primer esfera
      var iz = 40.0; // posicion inicial en Z para primer esfera

      // Se dibujan los 20 objetos
      for (var j = 0; j < 4; j++){
        for (var i = 0; i < 5; i++){
          mvPushMatrix();
          mat4.translate(mvMatrix, [ix, 0.0, iz]);
          mat4.scale(mvMatrix, [espacioPublico[datos], espacioPublico[datos], espacioPublico[datos]]);
          drawSphere(numColor);
          mvPopMatrix();
          ix = ix + 20;
          numColor++;
          datos += 2;
        }
        iz = iz - 20.0;
        ix = -40.0;
      }
      // Selección de circunferencia para esferas
    } else if(graficoSel === 1){
      z = -200;
      mat4.translate(mvMatrix, [-0.0, 0.0, z]);
      mat4.rotate(mvMatrix, degToRad(xRot), [1, 0, 0]);
      mat4.rotate(mvMatrix, degToRad(yRot), [0, 1, 0]);
      mat4.rotate(mvMatrix, degToRad(zRot), [0, 0, 1]);
      mat4.scale(mvMatrix, [factorAumento, factorAumento, factorAumento]);
      var xDeg ={};
      var zDeg ={};
      var valor = 0;

      //Lugares en donde se dibujan los objetos en la circunferencia
      for(var n = 0; n < 20; n++){
        xDeg[n] = 70 * Math.cos(degToRad(valor));
        zDeg[n]= 70 * Math.sin(degToRad(valor));
        valor += 18;
      }

      // Se dibujan los 20 objetos
      for (var i = 0; i < 20; i++){
        mvPushMatrix();
        mat4.translate(mvMatrix, [xDeg[i], 0.0, zDeg[i]]);  
        mat4.scale(mvMatrix, [espacioPublico[datos], espacioPublico[datos], espacioPublico[datos]]);
        drawSphere(numColor);
        mvPopMatrix();
        numColor++;
        datos += 2;
      }
    }
  }

  function drawCube(selection){
    var currentColor = eval("cubeVertexColorBuffer" + selection);
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, currentColor);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, currentColor.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    setMatrixUniforms();
    gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
  }

  function drawSphere(selection){
    var currentColor = eval("sphereVertexColorBuffer" + selection);
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,         sphereVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, currentColor);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, currentColor.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereVertexIndexBuffer);
    setMatrixUniforms();
    gl.drawElements(gl.TRIANGLES, sphereVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
  }
}
