var express = require ('express');
var mongoose = require ('mongoose');
var db = require ('./model/db.js');
var Hero = require ('./model/hero.js');
var bodyParser = require ('body-parser');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get("/7/heroes", function(req, res){
  var gender = req.query.gender;
  var regex = new RegExp("^"+gender+"$","i");

  if(gender) {
    Hero.find({"gender":regex}).exec()
    .then((heroes) => {
      res.send(JSON.stringify(heroes, undefined, 4));
    })
    .catch((err) => {
      res.send(err);
    })
  } else {
    Hero.find({}).exec()
    .then((heroes) =>{
      res.send(JSON.stringify(heroes, undefined, 4));
    })
    .catch((err) =>{
      res.send(err);
    });
  }
});

app.get("/7/name/:name", function(req, res) {
  var name = req.params.name;
  var regex = new RegExp("^"+name,"i");
  Hero.find({"name":regex}).exec()
  .then((heroes) =>{
    res.send(JSON.stringify(heroes, undefined, 4));
  })
  .catch((err) =>{
    res.send(err);
  });
});

app.get("/7/alterEgo/:alterEgo", function(req, res) {
  var alterEgo = req.params.alterEgo;
  var regex = new RegExp(alterEgo,"i");
  Hero.find({"alterEgo":regex}).exec()
  .then((heroes) =>{
    res.send(JSON.stringify(heroes, undefined, 4));
  })
  .catch((err) =>{
    res.send(err);
  });
});

app.get('/7/powers/:power', function(req, res) {
  var power = req.params.power;
  var regex = new RegExp(power,"i");
  Hero.find({"powers.power":regex}).exec()
  .then(function(hero) {
    res.send(hero);
  })
  .catch(function(err) {
    res.send({error:err});
  });
});

app.post('/7/register', function(req, res){

  if (req.body.name&&req.body.alterEgo) {
    var heroModel = new Hero ({
      name:req.body.name,
      alterEgo:req.body.alterEgo,
      gender:req.body.gender
    });
    if (req.body.powers){
      var powers = req.body.powers.split(',');
    }
    var jsonArr = [];
    for (var i in powers) {
      var json = { power:powers[i] };
      jsonArr.push(json);
    }
    heroModel.powers = jsonArr;

    heroModel.save()
    .then(function(doc){
      console.log("success "+doc.name);
      res.send({data: doc});
    })
    .catch(function(err){
      console.log(err);
    });
  } else {
    res.send({error: "name or alterEgo was blank"});
  }
});

app.post('/7/heroes', function(req, res){

  Hero.findOne({
    '_id':req.body._id
  }).exec()
  .then(function (hero){
    res.send(hero);
  })
  .catch(function (err){
    res.send({error:err});
  })
});

app.delete('/7/heroes', function(req, res){

  Hero.findOneAndRemove ({
    '_id':req.body._id
  }).exec()
  .then(function(hero) {
    res.send({delete:hero});
  })
  .catch(function(err){
    res.send({error:err});
  });
});

app.put('/7/heroes', function(req, res){

  if (req.body.powers) {
    var powers = req.body.powers.split(',');
  }
  var jsonArr = [];
  for (var i in powers) {
    var json = { power:powers[i] };
    jsonArr.push(json);
  }

  Hero.findOneAndUpdate (
    {'_id':req.body._id},
    {'name':req.body.name,
    'alterEgo':req.body.alterEgo,
    'gender':req.body.gender,
    'powers':jsonArr},
    {'upsert':true}
  ).exec()
  .then(function(hero){
    res.send({updated:hero});
  })
  .catch(function(err){
    res.send({error:err});
  });
});

app.listen(9000);
