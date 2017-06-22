const express = require('express');
const router = express.Router();
 orders = require('./orders');
 products = require('./products');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/orders', orders.findAll);
//app.get('/deleteAllOrders', orders.deleteAll);
router.get('/orders/pending', orders.findPendingOrders);
router.get('/orders/:id', orders.findById);
router.post('/order', orders.add);
router.post('/order/:id', orders.update);
router.post('/order/delete/:id', orders.delete);
router.get('/setsellingday/:id', orders.setSellingDay);
router.get('/getsellingday', orders.getSellingDay);

router.get('/products', products.findAll);
router.post('/product', products.add);
router.post('/product/:id', products.update);
router.post('/product/delete/:id', products.delete);

module.exports = router;