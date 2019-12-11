// Programa principal donde se configuran los vertex y fragment shaders.
// Igualmente, se configuran las teclas y botones de interacción en la escena.
// También, se llama al resto de funciones para renderizar la escena.

// Variables que se utilizan luego en el dibujo de la escena y en la seleccióno
// de las gráficas
var xRot = 0, yRot = 0, zRot = 0;
var factorAumento = 1;
var z = 0, zAug = z;
var graficoSel = 0;
var primitivaSel = 0;

// Funciones para determinar el tipo de gráfico y las primitivas a usar.
// Estos valores se usan en draw.js
function cuadricula(){
  graficoSel = 0;
}
function circunferencia(){
  graficoSel = 1;
}
function estrella(){
  graficoSel = 2;
}

function barras(){
  primitivaSel = 0;
}
function esferas(){
  primitivaSel = 1;
}

    var gl;
    function initGL(canvas) {
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }
    function getShader(gl, id) {
        var shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }
        var str = "";
        var k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }
        var shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }
        gl.shaderSource(shader, str);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }
    var shaderProgram;
    function initShaders() {
        var fragmentShader = getShader(gl, "shader-fs");
        var vertexShader = getShader(gl, "shader-vs");
        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }
        gl.useProgram(shaderProgram);
        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
        shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    }
    var mvMatrix = mat4.create();
    var mvMatrixStack = [];
    var pMatrix = mat4.create();

    // Funciones para que las transformaciones de matrices solo afecten
    // cada primitiva sin afectar el resto.
    function mvPushMatrix() {
        var copy = mat4.create();
        mat4.set(mvMatrix, copy);
        mvMatrixStack.push(copy);
    }
    function mvPopMatrix() {
        if (mvMatrixStack.length == 0) {
            throw "Invalid popMatrix!";
        }
        mvMatrix = mvMatrixStack.pop();
    }
    function setMatrixUniforms() {
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    }

    function degToRad(degrees) {
        return degrees * Math.PI / 180;
    }

    var lastTime = 0;
    // Función que permite la animación en la escena.
    function animate() {
        var timeNow = new Date().getTime();
        if (lastTime != 0) {
            var elapsed = timeNow - lastTime;
        }
        lastTime = timeNow;
    }

    function animar() {
        llenarTabla();
        requestAnimFrame(animar);
        handleKeys();
        drawScene();
        animate();

    }

// Se configuran las teclas para girar y modificar el tamaño
// de los objetos en la escena.
var currentlyPressedKeys = {};

function handleKeyDown(event) {
        currentlyPressedKeys[event.keyCode] = true;
    }

function handleKeyUp(event) {
        currentlyPressedKeys[event.keyCode] = false;
    }


function handleKeys() {
        if (currentlyPressedKeys[33]) {
            // Page Up
            zAug -= 0.3;
        }
        if (currentlyPressedKeys[34]) {
            // Page Down
            zAug += 0.3;
        }
        if (currentlyPressedKeys[37]) {
            // Left cursor key
            yRot -= 3;
        }
        if (currentlyPressedKeys[39]) {
            // Right cursor key
            yRot += 3;
        }
        if (currentlyPressedKeys[38]) {
            // Up cursor key
            xRot -= 3;
        }
        if (currentlyPressedKeys[40]) {
            // Down cursor key
            xRot += 3;
        }
        if (currentlyPressedKeys[65]) {
            // Up cursor key
            zRot -= 3;
        }
        if (currentlyPressedKeys[68]) {
            // Down cursor key
            zRot += 3;
        }
        if (currentlyPressedKeys[87]) {
            // Up cursor key
            factorAumento += 0.1;
        }
        if (currentlyPressedKeys[83]) {
            // Up cursor key
            factorAumento -= 0.1;
        }

    }


    function webGLStart() {
        var canvas = document.getElementById("canvas");
        initGL(canvas);
        initShaders();
        initBuffers();

        gl.clearColor(0.7, 0.7, 0.7, 1.0);
        gl.enable(gl.DEPTH_TEST);

        document.onkeydown = handleKeyDown;
        document.onkeyup = handleKeyUp;

        animar();
    }
