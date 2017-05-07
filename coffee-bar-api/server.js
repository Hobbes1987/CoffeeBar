var express = require('express');
 bodyParser = require('body-parser'); 
 orders = require('./routes/orders');
 products = require('./routes/products');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/orders', orders.findAll);
app.get('/orders/:id', orders.findById);
app.post('/order', orders.add);
app.put('/order/:id', orders.update);
app.delete('/order/:id', orders.delete);

//app.get('/products', products.findAll);
//app.get('/products/:id', products.findById);
//app.post('/wines', products.add);
//app.put('/wines/:id', products.update);
//app.delete('/wines/:id', products.delete);

app.listen(3000);
console.log('Listening on port 3000...');