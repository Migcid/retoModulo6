document.addEventListener('DOMContentLoaded',() => {
    cargarTickets();
});

function cargarTickets() {
    
    let url = 'http://127.0.0.1:8081/'

    document.querySelector('#tickets').innerHTML = '';

    fetch(url)
    .then(response => response.json())
    .then(data => {
        
        data.forEach(carton => {

            const divCarton = imprimirCarton(carton);
            
            document.querySelector('#tickets').appendChild(divCarton);
        
        });

    });  
}

function reiniciarTickets() {

    url = 'http://127.0.0.1:8081/?reiniciar=true';

    document.querySelector('#mostrar_nuevo').innerHTML = '<h1 class="restart mensaje visible">Reiniciando, Generando 5 Nuevos Cartones</h1>';

    fetch(url)
    .then(response => response.json())
    .then(data => {
        
        data.forEach(carton => {

            const divCarton = imprimirCarton(carton);
            
            document.querySelector('#tickets').appendChild(divCarton);
        
        });

    });



}

function nuevoTicket() {

    url = 'http://127.0.0.1:8081/?reiniciar=true';

    document.querySelector('#mostrar_nuevo').innerHTML = '<h1 class="exito mensaje visible">Generando un nuevo carton</h1>';

    fetch(url,{method:'POST'})
    .then(response => response.json())
    .then(data => {
        
        data.forEach(carton => {

            const divCarton = imprimirCarton(carton);
            
            document.querySelector('#mostrar_nuevo').appendChild(divCarton);
        
        });

    });

    setTimeout(() => {
        
    }, 3000);


}


function imprimirCarton(carton) {

    const divCarton = document.createElement('div');
    
    divCarton.classList.add('col','card'); 

    const divTop = document.createElement('div');
    divTop.classList.add('row','top');
    divTop.innerHTML = `<div class="col-8 mt-2">
                            <h4 class="text-warning"><span class="text-muted">serial: <br></span>${carton.serial}</h4> 
                        </div>
                        <div class="col-2">
                            <img src="./img/logo.png" alt="" height="70" style="margin-left: -80px;">
                        </div>`;
    
    divCarton.appendChild(divTop);
          
    const divNumeros = document.createElement('div');
    divNumeros.classList.add('row', 'text-center', 'pt-4', 'pb-5', 'ticket');

    console.log(divCarton)

    for (let i = 0; i < carton.numeros.length; i++) {
        const divNum = document.createElement('div');
        divNum.classList.add('number'); 
        divNum.innerHTML = carton.numeros[i];
        divNumeros.appendChild(divNum);  
    }
    
    divCarton.appendChild(divNumeros);
    console.log(divNumeros);

    divCarton.innerHTML += `<div class="bottom"></div>`;
    
    return divCarton;
}