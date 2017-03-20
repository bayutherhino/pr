const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const HeroSchema = new Schema ({
  name:String,
  alterEgo:String,
  gender:String,
  powers:[
    {power:String}
  ]
});

const Hero = mongoose.model('hero', HeroSchema);

module.exports = Hero;
