var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('coffeebardb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'coffeebardb' database");
        db.collection('orders', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'orders' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findPendingOrders = function(req, res) {
    db.collection('orders', function(err, collection) {
        //pending, preparing, ready
        collection.find({'Status': { $in: [ 0,1,2] }}).toArray(function(err, item) {
            res.send(item);
        });
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving order: ' + id);
    db.collection('orders', function(err, collection) {
        collection.findOne({'_id':new mongo.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('orders', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.add = function(req, res) {
    var order = req.body;
    console.log('Adding order: ' + JSON.stringify(order));
    db.collection('orders', function(err, collection) {
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
    console.log('Updating order: ' + id);
    console.log(JSON.stringify(order));
    
    if ( order._id && ( typeof(order._id) === 'string' ) ) {
        console.log('Fixing id');
        order._id = mongo.ObjectID.createFromHexString(order._id);
    }

    db.collection('orders', function(err, collection) {
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

exports.delete = function(req, res) {
    var id = req.params.id;
    console.log('Deleting order: ' + id);
    db.collection('orders', function(err, collection) {
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
    db.collection('orders', function(err, collection) {
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

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var orders = [
    {
        name: "CHATEAU DE SAINT COSME",
        year: "2009",
        grapes: "Grenache / Syrah",
        country: "France",
        region: "Southern Rhone",
        description: "The aromas of fruit and spice...",
        picture: "saint_cosme.jpg"
    },
    {
        name: "LAN RIOJA CRIANZA",
        year: "2006",
        grapes: "Tempranillo",
        country: "Spain",
        region: "Rioja",
        description: "A resurgence of interest in boutique vineyards...",
        picture: "lan_rioja.jpg"
    }];

    db.collection('orders', function(err, collection) {
        collection.insert(orders, {safe:true}, function(err, result) {});
    });

};