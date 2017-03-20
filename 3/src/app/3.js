var backgroundColor = 'lightblue' ;
var fontSize = 35;

var setPref = function (bgColor, size) {
  backgroundColor = bgColor;
  fontSize = size;
}

var getPref = function (){
  var pref = {
    'background-color':backgroundColor,
    'font-size':fontSize
  };

  return pref;
};

module.exports = {
  getPref:getPref,
  setPref:setPref
}
