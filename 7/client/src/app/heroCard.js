var React = require('react');
var Axios = require ('axios');
require ('./css/HeroCard.css');

var HeroCard = React.createClass({

  getInitialState:function(){
    return {
      isEdit:false
    };
  },

  render:function() {

    var hero = this.props.item;
    var powers = hero.powers.map(function(item, index) {
      return item.power;
    });

    if (this.state.isEdit){
      return (
      <div className='hero-card'>
        <div className="delete-button" onClick={this.toggleEdit}><p className="delete-icon">X</p></div>
        <form onSubmit={this.editHero} className="edit-form">
          <input type="text" placeholder="Name" defaultValue={hero.name} ref="name" require/><br/>
          <input type="text" placeholder="Alter Ego" defaultValue={hero.alterEgo} ref="alterEgo" require/><br/>
          <input type="text" placeholder="Gender" defaultValue={hero.gender} ref="gender" /><br/>
          <input type="text" placeholder="Powers(,)" defaultValue={powers.toString()} ref="powers" /><br/>
          <input type="Submit" value="Edit Hero"/>
        </form>
      </div>);
    } else {
    return (
        <div className='hero-card'>
          <div className="delete-button" onClick={this.deleteHero}><p className="delete-icon">X</p></div>
          <img src="app/asset/deafault.jpg"/>
          <h1 onClick={this.toggleEdit}>{hero.alterEgo}</h1>
          <h2>{hero.name}<br/><i>({hero.gender})</i></h2>
          <div className="power-list"><p>{powers.toString()}</p></div>
        </div>);
    }
  },

  deleteHero:function () {
    Axios.delete("http://localhost:9000/7/heroes", {data: { "_id":this.props.item._id }})
    .then(function (response) {
      this.props.onDeleteHero(this.props.item);
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  },

  toggleEdit:function () {
    console.log(this.state.isEdit);
    this.setState ({
      isEdit:!this.state.isEdit
    });
  },

  editHero:function(event) {
    event.preventDefault();
    var hero = {
      "_id":this.props.item._id,
      "name":this.refs.name.value,
      "alterEgo":this.refs.alterEgo.value,
      "gender":this.refs.gender.value,
      "powers":this.refs.powers.value
    }

    Axios.put("http://localhost:9000/7/heroes", hero)
    .then(function (response){
      this.setState ({
        isEdit:!this.state.isEdit
      });
      this.props.onEditHero(response);
    }.bind(this))
    .catch(function (error){
      console.log(error);
    });
  }
});

module.exports = HeroCard;
