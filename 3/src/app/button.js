var React = require('react');
require ('./3.css');

var BgButton = React.createClass ({
  render:function () {

    var buttonStyle = {
      backgroundColor:this.props.item
    }

    return (
      <div onClick={this.changeColor} className="btn" id={this.props.item} style={buttonStyle}>
        <p>{this.props.item}</p>
      </div>
    );
  },

  changeColor:function() {
    this.props.onColorChange(this.props.item);
  }
});

module.exports = BgButton;
