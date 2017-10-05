const express = require('express');

const query = require('query-parser');

const bodyParser = require('body-parser');

var app = express();

const MongoClient = require('mongodb').MongoClient;

// app.get('/allBranches', (req, res) => {
//   var x = req.query.name;
//   //console.log(x);

//   MongoClient.connect('mongodb://localhost:27017/bank_info', (err, db) => {
//     if (err) {
//       console.log('Unable to connect to server');
//     }
//     console.log('Connected to server');

//     db.collection('branches_info').find({}).toArray().then((docs) => {

//       res.json(docs)

//       //console.log(JSON.stringify(docs,undefined,2));
//     }, (err) => {
//       console.log('Unable to fetch bank details', err);
//     })

//     //db.close();

//   });

// });

const port = process.env.PORT || 3009;

app.get('/ifsc/:id', (req, res) => {
  var id = req.params.id;
  MongoClient.connect('mongodb://localhost:27017/bank_info', (err, db) => {
    if (err) {
      console.log('Unable to connect to server');
    }
    console.log('Connected to server');
    db.collection('branches_info').find({ifsc:id}).toArray().then((docs) => {
      res.json(docs);
    }, (err) => {
      console.log('unable to fetch data',err);
    });

  });

});

app.get('/byname/:bank_name/:city', (req, res) => {
  var bank_name = req.params.bank_name;
  var city = req.params.city;
  MongoClient.connect('mongodb://localhost:27017/bank_info', (err, db) => {
    if(err){
      console.log('Unable to connect to server');
    }
    console.log('Connected to server');
    db.collection('branches_info').find({bank_name:bank_name,city:city}).toArray().then((docs) => {
      res.json(docs);
    }, (err) => {
      console.log('unable to fetch data', err)
    });
  });
});

app.listen(port);
