# ProyectoFinal-CVI
Proyecto final del curso Computación Visual Interactiva

A continuación se explica lo que hace cada archivo.

### Index.html:

- Se configura las variables para los programas de vertex y fragment shaders.
- Se configura el espacio del canvas en donde se renderiza la escena.
- Se configura la tabla para ver los datos de las localidades. 
- Se cargan los archivos js que se usan para la creación de las primitivas y su posterior dibujo. También, se usan para cargar los datos necesarios para el dibujo de la escena.
- Se hace el llamado a la función `WebGLStart()` en línea de código 32 para iniciar llamado al resto de funciones que cargarán los buffers y configuraran los shaders para el renderizado final.

### estilos.css

- Se configura la página web con el fondo oscuro y  se configura el posicionamiento del canvas, la tabla, los botones y demás elementos. Igualmente, se configura el tamaño de letra y su color.

### main.js:
- La función `WebGLStart();` se ejecuta a partir de la línea de código 196.
- Se inicia el contexto WebGL con la función `initGL(canvas);`.
- Se configuran los shaders con la función `initShaders();`.
- Se cargan los buffers con la función `initBuffers();`, la cual está en el archivo **buffers.js**.
- Se llama a la `función animar();`. Esta función se ejecuta en la línea de código 129.
- Se llenan los datos de la tabla en la página web con la función `llenarTabla();`, la cual está en el archivo **llenarTabla.js** 
- Se ejecuta la función `requestAnimFrame(animar);` para que el renderizado de la escena se ejecute constantemente, esta función se encuentra en el archivo **webgl-utils.js**.
- Se ejecuta la función `handleKeys();`, la cual configura las teclas que se usaran para girar y aumentar tamaño de los objetos de la escena en las líneas de código 137 a 193.
- Se ejecuta la función `drawScene();`, la cual dibuja la escena. Esta se encuentra en el archivo **draw.js**.
- Se ejecuta la función `animate();`, la cual permite cambio en el tiempo para la animación de la escena.
- Se configuran las funciones `mvPushMatrix()` y `mvPopMatrix()` que se usan para transformar cada cada primitiva en la escena sin que se afecten las otras primitivas al hacer uso de la transformada de matrices.

### buffers.js

- Se cargan vertices e indices para dos primitivas, un cubo (barra en la escena) y una esfera.
- Se cargan 20 buffers de colores por primitiva. Me fue necesario configurar todos estos buffers para distinguir los colores de los objetos en la escena.

### draw.js

En este programa se selecciona la manera en que se dibujará la escena, en cuadrícula o en circunferencia. También, se selecciona la primitiva que se dibujará en la escena, barra o esfera. Funciona de la siguiente manera:

- Si la variable primitivaSel es 0, entonces corresponde a dibujar barras; si es 1, corresponde a esferas.
- Si la variable graficoSel es 0,  entonces corresponde a la disposición de cuadrícula; si es 1, corresponde a circunferencia.
- Se utilizan las transformaciones de matrices en las líneas de código 18 al 23, 72 - 76, y 99 - 103 para programar el giro y modificación de tamaño de los objetos en la escena. 
- La matriz de transformación de translación en la línea 10 se usa para acercar o alejar la vista sobre los objetos.
- Los ciclos `for` se utilizan para configurar la disposición de cuadrícula y de circunferencia. Esto, para posicionar las primitivas en los lugares correspondientes.
- Las transformaciones de `mat4.scale` se usan para ajustar el tamaño de las primitivas según los datos que se están visualizando. Estos datos se toman del arreglo correspondiente: `poblacion[datos]` para barras y `espacioPublico[datos]` para esferas.
- Las funciones `drawCube()` y `drawSphere()` permiten unir los buffers con los programas shaders para dibujar las primitivas. 

### datos.js

- Contiene los datos de las localidades de Bogotá.

### llenarTabla.js

- Este programa llena la tabla de la página web con los datos de las localidades de Bogotá.

### glMatrix.js

- Este programa se usa para los cálculos de las transformaciones de las matrices.

### webgl-utils.js

- Este programa se usa para utilizar la función `requestAnimFrame()` que permite la animación en la escena.
