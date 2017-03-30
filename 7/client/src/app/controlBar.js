var React = require('react');
var Axios = require ('axios');
require ('./css/controlBar.css');

var controlBar = React.createClass ({

  render:function(){
    return (
      <div className="control-bar">
        <select className="select-bar" onChange={this.handleChange}>
          <option value="default" selecte>Select</option>
          <optgroup label="Gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </optgroup>
          <optgroup label="Sort by">
            <option value="name">Name</option>
            <option value="alterEgo">Alter Ego</option>
          </optgroup>
        </select>
        <form className="search-form" onSubmit={this.onSubmit}>
          <input type="text" placeholder="Search..." ref="search" require/>
          <select ref="select">
            <option value="name" selected>Name</option>
            <option value="alterEgo">Alter Ego</option>
          </select>
          <input type="submit" value="Search"/>
        </form>
      </div>
    );
  },

  handleChange:function (event) {
    var heroes = this.props.heroList;
    var select = event.target.value;

    if (select === "male") {

      Axios.get("http://127.0.0.1:9000/7/heroes?gender=male")
      .then(function(response){
        this.props.handleSelect(response.data);
      }.bind(this))
      .catch(function(error){
        console.log(error);
      });

    } else if (select === "female") {

      Axios.get("http://127.0.0.1:9000/7/heroes?gender=female")
      .then(function(response){
        this.props.handleSelect(response.data);
      }.bind(this))
      .catch(function(error){
        console.log(error);
      });

    } else if (select === "name") {

      heroes.sort(function (a,b){
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

      this.props.handleSelect(heroes);

    } else if (select === "alterEgo") {

      heroes.sort(function (a,b){
        var nameA = a.alterEgo.toUpperCase();
        var nameB = b.alterEgo.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

      this.props.handleSelect(heroes);

    } else if (select === "default") {

      Axios.get("http://127.0.0.1:9000/7/heroes")
      .then(function(response){
        this.props.handleSelect(response.data);
      }.bind(this))
      .catch(function(error){
        console.log(error);
      });

    }
  },

  onSubmit:function (event) {
    event.preventDefault();
    var ref = this.refs;

    var category = ref.select.value;
    var search = ref.search.value;

    if (category === "name") {

      Axios.get("http://127.0.0.1:9000/7/name/"+search)
      .then(function(response){
        this.props.handleSelect(response.data);
      }.bind(this))
      .catch(function(error){
        console.log(error);
      });

    } else if (category === "alterEgo") {

      Axios.get("http://127.0.0.1:9000/7/alterEgo/"+search)
      .then(function(response){
        this.props.handleSelect(response.data);
      }.bind(this))
      .catch(function(error){
        console.log(error);
      });
    }
  }

});

module.exports = controlBar;
