const __DBUSER = "bayudb";
const __DBPASS = "telat";
const __DRIVER = "mongodb://"+__DBUSER+":"+__DBPASS+"@ds133340.mlab.com:33340/heroes"

console.log(__DRIVER);

module.exports = {
  driver:__DRIVER};
