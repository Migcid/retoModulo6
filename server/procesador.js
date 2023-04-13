var lotery = require('../includes/lotery.js'); 
var fs = require('fs'); 
var url = require('url');


module.exports = {

    get:function (req,res) {
        
        if(req.method === 'GET'){

            // res.writeHead(200, {'Content-Type': 'text/plain'});
            res.writeHead(200, {'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'});

            // obteniendo la url y sus parametros
            const baseURL = 'http://' + req.headers.host + '/';
            const reqUrl = new URL(req.url,baseURL);

            // si en la direccion existe reiniciar=true se vacia el archivo de texto
            if (reqUrl.searchParams.get('reiniciar')) {
                fs.writeFileSync('./files/cartones.txt','','utf-8');
            }

            // Recupero la informacion almacenada en el archivo
            let dataCartones = fs.readFileSync('./files/cartones.txt','utf-8');

            if (dataCartones.length === 0){
                // si no hay información en el archivo iniciar info para 5 cartones
                
                const loteria = new lotery.Cartones();
                loteria.iniciar(); // genera los primeros 5 cartones
                
                // convierto el json en una cadena para almacenarlo en archivo local
                dataCartones = JSON.stringify(loteria.listarCartones);

                
                // almaceno los cartones en el archivo
                fs.writeFileSync('./files/cartones.txt',dataCartones,'utf-8');

                json = loteria.listarCartones;
            
            }else{

                // si hay información guardada, enviar la información almacenada
                json = JSON.parse(dataCartones);

            }

            // console.log(JSON.stringify(json));

            res.end(JSON.stringify(json))


        }else if(req.method === 'POST'){

            // res.writeHead(200, {'Content-Type': 'text/plain'});
            res.writeHead(200, {'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'});
            
            
            let loteria = new lotery.Cartones();
            
            // Recupero la informacion almacenada en el archivo
            let dataCartones = fs.readFileSync('./files/cartones.txt','utf-8');
            
            // transformo la data en un arreglo para poder manipularla
            let cartones = JSON.parse(dataCartones);
            
            // recorro el arreglo de cartones obtenido del archivo local
            cartones.forEach(carton => {
                
                // loteria.seriales.push(carton.serial);
                loteria.cartones.push(carton);

            });

            // agrego un nuevo carton al arreglo de loteria y lo almaceno para devolverlo
            const nuevoCarton = loteria.agregarCarton();
            
            // convierto el json en una cadena para almacenarlo en archivo local
            dataCartones = JSON.stringify(loteria.listarCartones);
            
            setTimeout(() => {
                
                // almaceno los cartones en el archivo
                fs.writeFileSync('./files/cartones.txt',dataCartones,'utf-8');
            
                // enviar el nuevo carton generado
                json = JSON.stringify(nuevoCarton);
            
                res.end(json)
            }, 2000);
            
        }

    }


}