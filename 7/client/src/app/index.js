var React = require('react');
var ReactDOM = require('react-dom');
var Axios = require ('axios');
var HeroCard = require ('./heroCard.js');
var AddButton = require ('./buttonCard.js');
var ControlBar = require ('./controlBar.js');
require ('./css/index.css');

var IndexTest = React.createClass ({
  getInitialState:function() {
    return {
      heroes:[],
      isLoading:true
    };
  },
  componentDidMount:function() {
    Axios.get('http://localhost:9000/7/heroes')
    .then(function (res){
      this.setState({
        isLoading:false,
        heroes:res.data
      });
    }.bind(this));
  },
  render:function (){

    var heroes = this.state.heroes;
    var list = heroes.map(function(item, index) {

      return (
          <HeroCard item={item} key={index} onDeleteHero={this.onDeleteHero} onEditHero={this.onEditHero} />
        );

      }.bind(this));

    list.push(
      <AddButton onAddHero={this.onAddHero} />
    );

    if (this.state.isLoading){
      return (
        <h1>Its Loading...</h1>
      );
    } else {
      return (
        <div>
          <h1 className="title">Hero Registration Act</h1>
          <ControlBar handleSelect={this.handleSelect} heroList={heroes}/>
          <div>{list}</div>
        </div>
      );
    }
  },

  onDeleteHero:function(response){
    var deleteHero = response;
    var heroes = this.state.heroes;

    for(var i in heroes) {
      if (heroes[i]._id === deleteHero._id){
        heroes.splice(i,1);
      }
    }
    this.setState({
      heroes:heroes
    });
  },

  onAddHero:function(response) {
    var heroes = this.state.heroes;
    var newHero = response.data;

    heroes.push(newHero.data);
    this.setState ({
      heroes:heroes
    });
  },

  onEditHero:function(response){
    var heroes = this.state.heroes;
    var oldHero = response.data.updated;

    Axios.post("http://localhost:9000/7/heroes", {"_id":oldHero._id})
    .then(function(res){
      var newHero = res.data;
      for (var i in heroes) {
        if (heroes[i]._id === newHero._id){
          heroes[i] = newHero;
          console.log(heroes[i]);
        }
      }
      this.setState({
        heroes:heroes
      });
    }.bind(this))
    .catch(function(error){
      console.log(error);
    });
  },

  handleSelect:function(response) {
    this.setState({
      heroes:response
    });
  }

});

ReactDOM.render(<IndexTest />, document.getElementById('app-wrapper'));
