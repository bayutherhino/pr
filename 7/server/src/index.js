var express = require ('express');
var mongoose = require ('mongoose');
var db = require ('./model/db.js');
var Hero = require ('./model/hero.js');
var bodyParser = require ('body-parser');
var formidable = require('formidable');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/**
  Return array of all heroes in db or add gender query to return certain gender.
  Male heroes:
  127.0.0.1:9000/7/heroes?gender=Male
  Female heroes:
  127.0.0.1:9000/7/heroes?gender=female
  All heroes:
  127.0.0.1:9000/7/heroes
**/
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

/**
  return array of heroes with familiar name
  127.0.0.1:9000/7/name/wade
  return: [{name:wade wilson, alterEgo:Deadpool,...}]
  127.0.0.1:9000/7/name/wa
  return: [{name:wade wilson, alterEgo:deadpool,...},
          {name: wanda maximoff, alterEgo:scarlett witch,...}]
**/
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

/**
  return array of heroes with familiar alterEgo
  127.0.0.1:9000/7/alterEgo/pool
  return: [{name:wade wilson, alterEgo:Deadpool,...}]
  127.0.0.1:9000/7/alterEgo/man
  return: [{name:clark kent, alterEgo:Superman,...},
          {name:Diana Prince, alterEgo:Wonder Woman,...}]
**/
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

/**
  return array of heroes with familiar powers
  127.0.0.1:9000/7/powers/phasing
  return: [{name:Barry Allen, alterEgo:The Flash,...},]
  127.0.0.1:9000/7/powers/healing
  return: [{name:Wade Wilson, alterEgo:Deadpool,...},
          {name:Bruce Banner, alterEgo:Hulk,...}]
**/
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

app.get("/7/upload", function (req, res){
  res.send('<form action="/7/upload" method="post" enctype="multipart/form-data">'
    + '<p>Image: <input type="file" name="image" /></p>'
    + '<p><input type="submit" value="Upload" /></p>'
    + '</form>');
});

app.post('/7/upload', function (req, res){
  var form = new formidable.IncomingForm();
  console.log(form);
  form.uploadDir = __dirname+'/uploads';
  form.on('file', function(field, file) {
    console.log(file.path+'/'+file.name);
  });
  form.on('end', function() {
    res.end('success');
  });
  form.parse(req);
});

/**
  Will take both application/x-www-form-urlencoded or application/json
  send body like this:
  {
	 "name":"Logan",
	 "alterEgo":"Wolverine",
	 "gender":"Male",
	 "powers":"Super healing, Adamantium Claws, Super Str"
  }
  Name and alterEgo is a must or will return error.
  different power seperated by comma.

  Will return the created object back like this:
  {
  "data": {
    "__v": 0,
    "name": "Logan",
    "alterEgo": "Wolverine",
    "gender": "Male",
    "_id": "58cf8789c9e6bb5c2f610003",
    "powers": [
      {
        "power": "Super healing",
        "_id": "58cf8789c9e6bb5c2f610006"
      },
      {
        "power": " Adamantium Claws",
        "_id": "58cf8789c9e6bb5c2f610005"
      },
      {
        "power": " Super Str",
        "_id": "58cf8789c9e6bb5c2f610004"
      }]
    }
  }
**/
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
      res.send(err);
    });
  } else {
    res.send({error: "name or alterEgo was blank"});
  }
});

/**
  Will return back 1 Hero, search by id. works with both application/x-www-form-urlencoded
  and application/json
  send:
    {_id:58cf8789c9e6bb5c2f610003}

  return:
  {
  "_id": "58cf8789c9e6bb5c2f610003",
  "name": "Logan",
  "alterEgo": "Wolverine",
  "gender": "Male",
  "__v": 0,
  "powers": [
    {
      "power": "Super healing",
      "_id": "58cf8789c9e6bb5c2f610006"
    },
    {
      "power": " Adamantium Claws",
      "_id": "58cf8789c9e6bb5c2f610005"
    },
    {
      "power": " Super Str",
      "_id": "58cf8789c9e6bb5c2f610004"
    }
  ]
}
**/
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

/**
  delete 1 hero, search by id. works with both application/x-www-form-urlencoded
  and application/json. using DELETE
  send:
    {_id:58cf8789c9e6bb5c2f610003}

  return:
    {
      "delete": {
        "_id": "58cf8789c9e6bb5c2f610003",
        "name": "Logan",
        "alterEgo": "Wolverine",
        "gender": "Male",
        "__v": 0,
        "powers": [
          {
            "power": "Super healing",
            "_id": "58cf8789c9e6bb5c2f610006"
          },
          {
            "power": " Adamantium Claws",
            "_id": "58cf8789c9e6bb5c2f610005"
          },
          {
            "power": " Super Str",
            "_id": "58cf8789c9e6bb5c2f610004"
          }
        ]
      }
    }
**/

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


/**
  Update 1 hero, search by id. works with both application/x-www-form-urlencoded
  and application/json. using PUT

  ex: update Barry Allen to Wally West
  send:
  { "_id":58cf8563c9e6bb5c2f60ffea,
    "name":"Wally West",
    "alterEgo":"The Flash",
    "gender":"Male",
    "powers":"phasing, Flashpoint Paradox, Super Speed"}

  return:
  {
  "updated": {
    "_id": "58cf8563c9e6bb5c2f60ffea",
    "name": "Barry Allen",
    "alterEgo": "The Flash",
    "gender": "Male",
    "__v": 0,
    "powers": [
      {
        "power": "super speed",
        "_id": "58cf8563c9e6bb5c2f60ffee"
      },
      {
        "power": "phasing",
        "_id": "58cf8563c9e6bb5c2f60ffed"
      },
      {
        "power": "time travel",
        "_id": "58cf8563c9e6bb5c2f60ffec"
      },
      {
        "power": "dimensional travel",
        "_id": "58cf8563c9e6bb5c2f60ffeb"
      }
    ]
  }
}
**/
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
    {'upsert':false}
  ).exec()
  .then(function(hero){
    res.send({updated:hero});
  })
  .catch(function(err){
    res.send({error:err});
  });
});



app.listen(9000);
