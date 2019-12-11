
// Función para llenar la tabla. Se convierte a string cada valor de i en la
// iteración para modificar las celdas de la tabla que tengan el mismo valor
// de tipo string.
function llenarTabla(){
if (primitivaSel === 0){
for(var i = 0; i < 39; i+=2){
  document.getElementById(i.toString()).innerHTML = poblacion[i];
}
var p = {};
var total = 0;
for(var j = 1; j < 40; j+=2){
  p[j] = Math.round(poblacion[j] * 100000);
  total = total + p[j];
 document.getElementById(j.toString()).innerHTML = p[j].toString();
}
document.getElementById("datos").innerHTML = "Num. Habitantes";
document.getElementById("total").innerHTML = "TOTAL";
document.getElementById("totalNum").innerHTML = total;
}else if (primitivaSel === 1){
  for(var i = 0; i < 39; i+=2){
    document.getElementById(i.toString()).innerHTML = espacioPublico[i];
  }
  var p = {};
  var total = 0;
  for(var j = 1; j < 40; j+=2){
    p[j] = espacioPublico[j];
    total = total + p[j];
   document.getElementById(j.toString()).innerHTML = p[j].toString();
  }
  var exp = "2".sup();
  document.getElementById("datos").innerHTML = " Espacio público efectivo" + "<br>" + "(m" + exp + "/ hab)";
  document.getElementById("total").innerHTML = "TOTAL";
  document.getElementById("totalNum").innerHTML = Math.round(total);
}
}
