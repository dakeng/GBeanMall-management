import mongodb from 'mongodb';
import assert from 'assert';

let MongoClient = mongodb.MongoClient;

let url = 'mongodb://localhost:27017/test';

let insertDocuments = function(db, callback){
    let collection = db.collection('documents');
    collection.insertMany([
        {a: 1}, {a: 2}, {a: 3}
    ],function(err, result){
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    })
};

let findDocuments = function(db, callback){
    let collection = db.collection('documents');
    collection.find({'a': 3}).toArray(function(err, docs){
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    })
};

let updateDocument = function(db, callback){
    let collection = db.collection('documents');
    collection.updateOne({a: 2}, {$set: {b: 1}}, function(err, result){
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Update the document with the field a equal to 2");
        callback(result);
    });
};

let removeDocument = function(db, callback){
    let collection = db.collection('documents');
    collection.deleteOne({a: 3}, function(err, result){
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removes the document with the field a equal to 3");
        callback(result);
    });
};

let indexCollection = function(db, callback){
    db.collection('documents').createIndex(
        {"a": 1},
        null,
        function(err, results){
            console.log(results);
            callback();
        }
    );
}

MongoClient.connect(url, function(err, database){
    const db = database.db('test');
    assert.equal(null, err);
    console.log("Connected successfully to server");

    insertDocuments(db, function(){
        indexCollection(db, function(){
            database.close();
        })
    });
});

export default MongoClient;