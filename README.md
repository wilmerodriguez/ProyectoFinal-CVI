# ProyectoFinal-CVI
Proyecto final del curso Computación Visual Interactiva

A continuación se explica lo que hace cada archivo.

### Index.html:

- Se configura las variables para los programas de vertex y fragment shaders.
- Se configura el espacio del canvas en donde se renderiza la escena.
- Se configura la tabla para ver los datos de las localidades. 
- Se cargan las librerías js que se usan para la creación de las primitivas y su posterior dibujo.

### estilos.css

- Se configura la página web con el fondo oscuro y  se configura el posicionamiento del canvas, la tabla, los botones y demás elementos. Igualmente, se configura el tamaño de letra y su color.

### main.js:

- Se carga el contexto para WebGL y se configuran los programas de los shaders.
-  Se configuran las teclas que se usaran para girar los objetos en la escena.

### buffers.js

- Se cargan vertices e indices para dos primitivas, un cubo (barra en la escena) y una esfera.
- Se cargan 20 buffers de colores por primitiva. Me fue necesario configurar todos estos buffers para distinguir los colores de los objetos en la escena.

### draw.js

En este programa se selecciona la manera en que se dibujará la escena, en cuadrícula o en circunferencia. También, se selecciona la primitiva que se dibujará en la escena, barra o esfera. Funciona de la siguiente manera:

- Si la variable primitivaSel es 0, entonces corresponde a dibujar barras; si es 1, corresponde a esferas.
- Si la variable graficoSel es 0,  entonces corresponde a la disposición de cuadrícula; si es 1, corresponde a circunferencia.
- Se utilizan las transformaciones de matrices en las líneas de código 18 al 23, 72 - 76, y 99 - 103 para programar el giro y modificación de tamaño de los objetos en la escena. 
- Los ciclos for se utilizan para configurar la disposición de cuadrícula y de circunferencia para posicionar las primitivas en los lugares correspondientes.
- Las transformaciones de mat4.scale se usan para ajustar el tamaño de las primitivas según los datos que se están visualizando.
- Las funciones `drawCube()` y `drawSphere()` permiten unir los buffers con los programas shaders para dibujar las primitivas. 

### datos.js

- Contiene los datos de las localidades de Bogotá.

### llenarTabla.js

- Este programa llena la tabla de la página web con los datos de las localidades de Bogotá.
