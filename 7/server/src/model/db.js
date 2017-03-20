var mongoose = require ('mongoose');
var DBCONSTANT = require ('./const.js');
var data = require ('./data.js');
var Hero = require ('./hero.js');

//connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect(DBCONSTANT.driver);

mongoose.connection.on("connected", function(){
  console.log ("Connection Success");

  //drop Database
  mongoose.connection.db.dropDatabase(function(err){
    if(err) console.log('error : '+ err);
    else console.log('Collection Droped');
  });

  //save data to db
  var arr = data.arr;
  for (var i in arr) {
    var heroModel = new Hero ({
      name:arr[i].name,
      alterEgo:arr[i].alterEgo,
      gender:arr[i].gender
    });
    heroModel.powers = data.power(i);

    heroModel.save()
    .then(function(doc){
      console.log("success "+doc.name);
    })
    .catch(function(err){
      console.log(err);
    });
  }
});

mongoose.connection.on("error", function(){
  console.log ("Connection Error");
});
