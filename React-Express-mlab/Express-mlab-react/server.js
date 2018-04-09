const express           = require('express');
const app               = express();
const MongoClient       = require('mongodb').MongoClient;
const url               = 'mongodb://karyawanexmlab:faikar127@ds215388.mlab.com:15388/karyawan';
const cors              = require('cors');
const bodyParser        = require('body-parser');
const port              = 3210;

app.use(cors());
app.use(bodyParser.json());

MongoClient.connect(url, (err, db) => {
    console.log("terhubung ke mongodb");
});

// # # # # # # create route here # # # # # #
app.get('/data', (req, res) => {
    MongoClient.connect(url, (err, db) => {
        var collection = db.collection('karyawanexmlab');
        collection.find({}).toArray((err, docs) => {
            console.log(docs);
            res.send(docs);
        });
    });
})
app.post('/data', (req, res) => {
    MongoClient.connect(url, (err, db) => {
        var data = { nama: req.body.nama, usia: req.body.usia };
        var collection = db.collection('karyawanexmlab');
        collection.insert(data, (err, result) => {
            console.log(result);
            res.send(result);
        });
    });
})

app.listen(port, () => {
    console.log(`Server aktif di ${port}`)
});
