import {cargarMonedas} from './monedas.js';
cargarMonedas();

let boton = document.getElementById("btn");
let divImprimir = document.getElementById("contenedor");
const monedas = JSON.parse(localStorage.getItem('arregloMonedas'));
//if(monedas.length == 0) {location.reload()}
const listaDeNombres = monedas.map(money => money.name);


myOnLoad();

//http://tabulator.info/docs/5.2/install
var table = new Tabulator("#example-table", {
    height:205, // establecer la altura de la tabla (en CSS o aquí), esto habilita el DOM virtual y mejora drásticamente la velocidad de procesamiento (puede ser cualquier valor de altura CSS válido)
    data:monedas, //asignar datos a la tabla
    layout:"fitColumns", //ajustar columnas al ancho de la tabla (opcional)
    columns:[ //Definir columnas de tabla
        {title:"#", field:"market_cap_rank", width:50},
        {title:"Moneda", field:"name"},
        {title:"Precio", field:"current_price"},
        {title:"Volumen en 24 h", field:"market_cap_change_24h"},
        {title:"Cap. de mercado", field:"market_cap"},
    ],
});

//activar un mensaje de alerta cuando se hace clic en la fila
table.on("rowClick", function(e, row){ 
    alert("Row " + row.getData().id + " Clicked!!!!");
});

function mostrar(monto,moneda,operacion){
    let cotizacion = precio(moneda,operacion);
    if (monto > 0){ 
        divImprimir.innerHTML = `Usted desea ${operacion} ${monto}  ${moneda} a un precio de 
        $ ${cotizacion} pesos por un total en pesos de\n                                       $  ${monto * cotizacion}`
    }
    else{
        divImprimir.innerHTML = `El monto debe ser un numero positivo`
    }
}

function precio(moneda,operacion){
    const coin = monedas.find(busqueda => busqueda.name === moneda);
    console.log(coin)
    return (operacion=="comprar" ? coin.current_price : coin.current_price)
}

//Codigo a Ejecutar al Cargar la Pagina
function myOnLoad() {
    addOptions("list2", listaDeNombres);
}

// Rutina para agregar opciones a un <select>
function addOptions(domElement, json) {
    var select = document.getElementsByName(domElement)[0];

    Object.values(json).forEach(function(elm) {
    var option = document.createElement("option");
    option.text = elm;
    select.add(option);
    })
}

boton.addEventListener("click", ()=>{

    var operacion = document.getElementById("list").value;
    var moneda = document.getElementById("list2").value;
    console.log (moneda)
    var monto = document.getElementById("input1").value;
    mostrar(monto,moneda,operacion)
})