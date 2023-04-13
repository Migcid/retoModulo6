/* ======= CLASES ======= */
class Carton {
    constructor(){
        this.serial,
        this.nroMaximo = 30,
        this.numeros = [],
        this.generarCarton;
    }
    get generarCarton(){
        // generando los números del cartoon
        for (let i = 0; i < 15; i++) {
            // generar un número y agregarlo al carton
            let ntemporal;
            do {
                ntemporal = getRndInteger(1,this.nroMaximo);
            } while (this.numeros.includes(ntemporal));
            this.numeros.push(ntemporal);            
        }
        // ordenando los números del carton
        this.numeros.sort(function(a, b) {
            return a - b;
        });
    }
} 

/* ====== FUNCIONES ====== */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

module.exports = { getRndInteger, Carton}