var foo = function () {
  return 'foo';
}

var bar = function() {
  return 'bar';
}

var stool = function () {
  return 'stool';
}

var def= function () {
  return 'default';
}

var cond = function (val) {
  var dict = {
    'foo':foo(),
    'bar':bar(),
    'stool':stool()
  }

  if (dict[val]) {
    return dict[val];
  } else return def();
}

module.exports = {
  cond:cond
}
