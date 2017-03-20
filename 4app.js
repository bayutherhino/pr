var express = require ('express');
var four = require ('./4.js');

var app = express();

const arr = [
	  {
	    name: 'Clark Kent',
	    alterEgo: 'Superman',
	    gender: 'Male',
	    powers: ['super human strength', 'flight', 'x-ray vision', 'heat vision']
	  },
	  {
	    name: 'Barry Allen',
	    alterEgo: 'The Flash',
	    gender: 'Male',
	    powers: ['super speed', 'phasing', 'time travel', 'dimensional travel']
	  },
	  {
	    name: 'Diana Prince',
	    alterEgo: 'Wonder Woman',
	    gender: 'Female',
	    powers: ['super human strength', 'super human reflexes', 'super human agility', 'flight']
	  },
	  {
	    name: 'Bruce Banner',
	    alterEgo: 'The Hulk',
	    gender: 'Male',
	    powers: ['super human strength', 'thunder clap', 'super healing factor']
	  },
	  {
	    name: 'Wade Wilson',
	    alterEgo: 'Deadpool',
	    gender: 'Male',
	    powers: ['super healing factor', 'super human agility']
	  },
	  {
	    name: 'Jean Grey',
	    alterEgo: 'Phoenix',
	    gender: 'Female',
	    powers: ['telepathy', 'telekinesis', 'rearrange matter at will']
	  },
	  {
	    name: 'Wanda Maximoff',
	    alterEgo: 'Scarlet Witch',
	    gender: 'Female',
	    powers: ['reality manipulation', 'astral projection', 'psionic']
	  }
	];


app.get ('/4a', function(req,res){
  var alterEgo = four.fourA(arr);
  res.send (JSON.stringify(alterEgo, null, 2));
});

app.get ('/4b', function(req, res){
  var powers = four.fourB(arr);
  res.send (JSON.stringify(powers, null, 2));
});

app.get ('/4c', function(req, res){
  var maleHeroes = four.fourC(arr);
  res.send (JSON.stringify(maleHeroes, null, 2));
});

app.get ('/4d', function (req, res){
  var genderSort = four.fourD(arr);
  res.send (JSON.stringify(genderSort, null, 2));
});

app.listen(9000);
