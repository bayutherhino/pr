var Axios = require ('axios');

var getAllHeroes = function () {
  Axios.get('http://localhost:9000/7/heroes')
  .then(function (res){
    return res.data;
  });
}

module.exports = {
  getAllHeroes:getAllHeroes
}
