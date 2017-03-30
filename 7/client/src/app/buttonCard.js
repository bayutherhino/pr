var React = require('react');
var Axios = require ('axios');
require ('./css/AddButton.css')

var ButtonCard = React.createClass ({

  render:function (){
    return (
      <div className="button-card">
        <h1>Add Hero</h1>
        <form onSubmit={this.addHero} className="add-hero-form">
          <input type="text" placeholder="Name" ref="name" require/><br/>
          <input type="text" placeholder="Alter Ego" ref="alterEgo" require/><br/>
          <input type="text" placeholder="Gender" ref="gender" /><br/>
          <input type="text" placeholder="Powers(,)" ref="powers" /><br/>
          <input type="Submit" value="Add Hero"/>
        </form>
      </div>
    );
  },

  addHero:function(event){
    event.preventDefault();
    var ref = this.refs;
    var hero = {
      "name":ref.name.value,
      "alterEgo":ref.alterEgo.value,
      "gender":ref.gender.value,
      "powers":ref.powers.value
    }
    Axios.post("http://localhost:9000/7/register", hero)
    .then(function(response){
      console.log(response.data);
      this.props.onAddHero(response);
    }.bind(this))
    .catch(function(error){
      console.log(error);
    });
  }

});

module.exports = ButtonCard;
