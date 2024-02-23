const express = require("express");
const app = express();
const port = 3100;
const cors = require('cors');
let products = require("./data/data.json");
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get('/test', (request, response) => {
  response.send('Hello World!');
});
app.get('/products',(request,response)=>{
 response.send(products);
});

app.post("/search", (req, res) => {
  const { text } = req.body;
  res
    .status(200)
    .send(
      products.filter(
        (elem) =>
          elem.title.toUpperCase().includes(text.toUpperCase()) ||
          elem.text.toUpperCase().includes(text.toUpperCase())
      )
    );
});
app.post('/product',(request,response)=>{
  products.push(request.body);
  response.status(201).send(products);

});
app.delete("/delete/:id", (req, res) => {
  let id = +req.params.id;
  let newProducts = products.filter(e => e.id !== id);
  if (JSON.stringify(newProducts) !== JSON.stringify(products)) {
      products = newProducts;
      res.status(202).send(products);
  } else {
      res.status(400).send("id not found");
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
