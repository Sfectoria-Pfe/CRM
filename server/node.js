const http = require('http');
const port = 4000;
const host = "127.0.0.1";
let products = require("./data.json")
    
function handleRequest(request, response) {
    if (request.method === "GET" && request.url === "/products") {
        response.writeHead(200, { "content-type": 'application/json' });
        return response.end(JSON.stringify(products ));
    }

    if (request.method === "POST" && request.url === "/products") {
        let body = '';

        request.on('data', (chunk) => {
            body += chunk.toString();
            
        })

         .on('end', () => {
            try {
                const product = JSON.parse(body);
                products.push(product);
                console.log('Added product:', product); 

                // Réponse en cas de succès
                response.writeHead(201, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(products ));
            } catch (error) {
                // Réponse en cas d'erreur de format JSON
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ message: 'Invalid JSON format' }));
            }
        });
        
    }
   else if (request.method === "DELETE" && request.url === "/products/:id") {

const id=request.url.split('/')[2]
newproducts=products.filter((item)=>(item.id !== Number(id)))
if (products.length===newproducts.length){
 response.writeHead(202,{"content-type":"application/json"})
response.end({"message":"not found"})
    
  
}
else {
    response.writeHead(202,{"content-type":"application/json"})

products=newproducts
response.end(JSON.stringify(products))


}


    }
    
    else if (request.method === "GET" && request.url === "/test") {
        response.writeHead(200, { "Content-Type": 'text/html' });
        return response.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <title>Node</title>
            </head>
            <body>
                <h1>Welcome</h1>
                <form method="POST" action="/products">
                    <input type="text" name="nom" placeholder="Entrer votre nom"/>
                    <input type="text" name="prenom" placeholder="Entrer votre prenom"/>
                    <button>Envoyer</button>
                </form>
            </body>
            </html>
        `);
    }
    else {
        response.writeHead(404, { "Content-Type": 'text/plain' });
        return response.end("404 not found");
    }
}

const server = http.createServer(handleRequest);
console.log(`start server on http://${host}:${port}`);
server.listen(port, host);
