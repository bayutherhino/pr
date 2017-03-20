var fourA = function (arr) {
  var alterEgo = [];
  for (var i in arr) {
    var hero = arr[i];
    alterEgo.push (hero.alterEgo);
  }
  return alterEgo;
}

var fourB = function (arr) {
  var powers = [];
  for (var i in arr) {
    if (i < arr.length){
      powers = powers.concat(arr[i].powers);
    }
  }
  return powers.sort().unique();
}

var fourC = function (arr){
  var maleHeroes = [];
  for (var i in arr) {
    if (arr[i].gender === 'Male') maleHeroes.push(arr[i]);
  }
  return maleHeroes;
}

var fourD = function (arr){
  var gender = getGender(arr);
  var jsonArr = [];

  for (var i = 0; i < gender.length; i++){
    var json = {
      gender:'',
      heroes:[]
    }
    json.gender = gender[i];
    for(var j = 0; j < arr.length; j++) {
      if (gender[i] === arr[j].gender) {
        var hero = {
          name:arr[j].name,
          alterEgo:arr[j].alterEgo,
          powers:arr[j].powers
        }
        json.heroes.push(hero);
      }
    }
    jsonArr.push(json);
  }
return jsonArr;
}

function getGender (arr) {
  var genderArr = [];
  for (var i =0; i<arr.length; i++) {
    genderArr.push(arr[i].gender);
  }
  return genderArr.unique();
}

Array.prototype.unique = function()
{
	var n = [];
	for(var i = 0; i < this.length; i++)
	{
		if (n.indexOf(this[i]) == -1) n.push(this[i]);
	}
	return n;
}

module.exports = {
  fourA : fourA,
  fourB : fourB,
  fourC : fourC,
  fourD : fourD
}
