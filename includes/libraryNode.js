/* ======= CLASES ======= */
class Carton {
    constructor(serial){
        this.serial = serial,
        this.numeros = [],
        this.generarCarton;
    }
    get generarCarton(){
        let nroMaximo = 30;
        this.numeros = [];
        // generando los números del cartoon
        for (let i = 0; i < 15; i++) {
            // generar un número y agregarlo al carton
            let nroTemporal;
            do {
                nroTemporal = getRndInteger(1,nroMaximo);
            } while (this.numeros.includes(nroTemporal));
            this.numeros.push(nroTemporal);            
        }
        // ordenando los números del carton
        this.numeros.sort(function(a, b) {
            return a - b;
        });
    }
} 

class Cartones {

    constructor(){
        this.seriales = []
        this.cartones = [];
    }

    agregarCarton(){

        let tempSerial;
        // genero un nuevo serial
        do {
            tempSerial = getRndInteger(1,99999999);
        } while (this.seriales.includes(tempSerial));

        // agrego el serial a la pila
        this.seriales.push(tempSerial);
        // genero un nuevo carton con el serial obtenido
        const carton = new Carton(tempSerial);

        this.cartones.push(carton);

    }

    iniciar(){ 
        for (let i = 0; i < 5; i++) this.agregarCarton();
    }

    // devuelve una lista con todos los cartones
    get listarCartones(){ return this.cartones }  

}


/* ====== FUNCIONES ====== */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


// exportando los modulos
module.exports = {Carton, Cartones, getRndInteger}