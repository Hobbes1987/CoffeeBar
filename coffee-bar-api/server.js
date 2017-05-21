var express = require('express');
 bodyParser = require('body-parser'); 
 orders = require('./routes/orders');
 products = require('./routes/products');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// parse application/json
app.use(bodyParser.json())

app.get('/orders', orders.findAll);
//app.get('/deleteAllOrders', orders.deleteAll);
app.get('/orders/pending', orders.findPendingOrders);
app.get('/orders/:id', orders.findById);
app.post('/order', orders.add);
app.post('/order/:id', orders.update);
app.post('/order/delete/:id', orders.delete);

app.get('/products', products.findAll);
app.post('/product', products.add);
app.post('/product/:id', products.update);
app.post('/product/delete/:id', products.delete);

app.listen(3000,'0.0.0.0');
console.log('Listening on port 3000...');