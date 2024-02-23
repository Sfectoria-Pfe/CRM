const http = require('http');
const port = 4005;
const host = "127.0.0.1"; // localhost is 127.0.0.1

// Liste des noms soumis par les utilisateurs
let products = require("./data/data.json");

function handleRequest(request, response) {
    if (request.method === "GET" && request.url === "/products") {
        response.writeHead(200, { "Content-Type": 'application/json' });
        response.end(JSON.stringify(products))
            // <!DOCTYPE html>
            // <html lang="en">
            // <head>
            //     <meta charset="UTF-8">
            //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
            //     <title>Form</title>
            // </head>
            // <body>
            //     <h1>Enter your name:</h1>
            //     <form action="/submit" method="post">
            //         <input type="text" name="name" placeholder="votre nom">
            //         <input type="text" name="prenom" placeholder="votre prenom">
            //         <button type="submit">Submit</button>
            //     </form>
            //     <h2>Names List:</h2>
            //     <ul>
            //         ${names.map(name => `<li>${name}</li>`).join('')}
            //     </ul>
            // </body>
            // </html>
        ;
    } else if (request.method === "POST" && request.url === "/submit") {
        response.writeHead(201,{"Content-Type":"application/json"})
        let body = "";
        request.on('data', chunk => {
    
            body += chunk; // convert Buffer to string
        });
        request.on('end', () => {
            products.push(JSON.parse(body))
            response.end(JSON.stringify(products))
            // Parse the form data
            // const formData = new URLSearchParams(body);
            // const name = formData.get('name');
            // const prenom = formData.get('prenom');
            // if (name && prenom) {
            //     // If a name is provided, add it to the list
            //     names.push(`${name} ${prenom}`);
            //     console.log("Name submitted:", name," ",prenom);
            //     response.writeHead(201, { "Content-Type": "application/json" });
            //     response.end("Nom et prenom submitted successfully.");
            // } else {
            //     // If no name is provided, send an error response
            //     response.writeHead(400, { "Content-Type": "text/plain" });
            //     response.end("Name or prenom is required.");
            // }
        });
    } else if (request.method === "DELETE" && request.url.includes("delete")) {
        const id=request.url.split('/')[2];
        let newProducts = products.filter(item => item.id !== id);
        console.log(newProducts);
        if(products.length===newproducts.length){
            response.writeHead(400,{"content-Type":"application/json"})
            response.end({"message":"id not found"})
        }
            
        }
     else {
        // For any other URL, respond with 404 Not Found
        response.writeHead(404, { "Content-Type": 'text/plain' });
        response.end("404 Not Found!");
    }
}

const server = http.createServer(handleRequest);
console.log(`Listening on http://${host}:${port}`);
server.listen(port, host);
