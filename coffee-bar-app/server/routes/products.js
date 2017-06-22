var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('coffeebardb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'coffeebardb' database");
        db.collection('products', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'products' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving product: ' + id);
    db.collection('products', function(err, collection) {
        collection.findOne({'_id':new mongo.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('products', function(err, collection) {
        collection.find().sort({ Name:1}).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.add = function(req, res) {
    var product = req.body;
    console.log('Adding product: ' + JSON.stringify(product));
    db.collection('products', function(err, collection) {
        collection.insert(product, {safe:true}, function(err, result) {
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
    var product = req.body;
    if ( product._id && ( typeof(product._id) === 'string' ) ) {
        console.log('Fixing id');
        product._id = mongo.ObjectID.createFromHexString(product._id);
    }
    db.collection('products', function(err, collection) {
        collection.update({'_id':new mongo.ObjectID(id)}, product, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating product: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(product);
            }
        });
    });
}

exports.delete = function(req, res) {
    var id = req.params.id;
    var product = req.body;
    if ( product._id && ( typeof(product._id) === 'string' ) ) {
        console.log('Fixing id');
        product._id = mongo.ObjectID.createFromHexString(product._id);
    }
    db.collection('products', function(err, collection) {
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

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var products = [
    {
        Name: "Koffie",
        Price: 1.50,
        Category: "Dranken",
        ImageUrl: null,
    },
    {
        Name: "Verse munt thee",
        Price: 1.50,
        Category: "Dranken",
        ImageUrl: null,
    },
    {
        Name: "Brownie",
        Price: 2.50,
        Category: "Gebak",
        ImageUrl: null,
    }];

    db.collection('products', function(err, collection) {
        collection.insert(products, {safe:true}, function(err, result) {});
    });

};