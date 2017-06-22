var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('coffeebardb', server);

var sellingDay = 'testdag';

function reconnect(orderCollection){
    db.open(function(err, db) {
        if(!err) {
            console.log("Connected to 'coffeebardb' database");
            db.collection(orderCollection, {strict:true}, function(err, collection) {
                if (err) {
                    console.log("The '"+ orderCollection +"' collection doesn't exist. Creating it with sample data...");
                }
            });
        }
    });
}
reconnect(sellingDay);

exports.findPendingOrders = function(req, res) {
    db.collection(sellingDay, function(err, collection) {
        //pending, preparing, ready
        collection.find({'Status': { $in: [ 0,1,2] }}).toArray(function(err, item) {
            res.send(item);
        });
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving order: ' + id);
    db.collection(sellingDay, function(err, collection) {
        collection.findOne({'_id':new mongo.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection(sellingDay, function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.add = function(req, res) {
    var order = req.body;
    console.log('Adding order: ' + JSON.stringify(order));
    db.collection(sellingDay, function(err, collection) {
        collection.insert(order, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var order = req.body;
    if ( order._id && ( typeof(order._id) === 'string' ) ) {
        console.log('Fixing id');
        order._id = mongo.ObjectID.createFromHexString(order._id);
    }

    db.collection(sellingDay, function(err, collection) {
        collection.update({'_id':new mongo.ObjectID(id)}, order, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating order: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(order);
            }
        });
    });
}

exports.setSellingDay = function(req, res) {
    var id = req.params.id;
    sellingDay = id;
    console.log('Selling day set to:'+JSON.stringify(sellingDay));
    //reconnect(sellingDay);
    res.send();
}

exports.getSellingDay = function(req, res) {
    res.send(sellingDay);
}

exports.delete = function(req, res) {
    var id = req.params.id;
    console.log('Deleting order: ' + id);
    db.collection(sellingDay, function(err, collection) {
        collection.remove({'_id':new mongo.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

exports.deleteAll = function(req, res) {
    db.collection(sellingDay, function(err, collection) {
        collection.remove({}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}