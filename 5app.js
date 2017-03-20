var express = require ('express');
var five = require ('./5.js');
var fiveRef = require ('./5ref.js');

var app = express();

app.get('/5/:val', function (req, res){
  var condition = req.params.val;

  switch (condition) {
		case 'foo':
		  res.send(five.foo());
		break;

		case 'bar':
		  res.send(five.bar());
		break;

		case 'stool':
		  res.send(five.stool());
		break;

		default:
		  res.send(five.def());
		break;
    }
});

app.get('/5/ref/:val', function(req, res){
  /*
  The code might be slightly longer, but in terms of readability and maintainability its better.
  */
  var condition = req.params.val;
  res.send (fiveRef.cond(condition));
});


app.listen(9000);
