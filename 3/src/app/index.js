var React = require('react');
var ReactDOM = require('react-dom');
var styleInfo = require('./3.js');
var BgButton = require('./button.js');
require ('./3index.css');

var StyleComp = React.createClass ({

  getInitialState:function() {
      var backgroundColor = styleInfo.getPref()['background-color'];
      var fontSize = styleInfo.getPref()['font-size'];
      return {
        bgColor:backgroundColor,
        fontSize:fontSize,
        colorChoice:['lightblue','lightgreen', 'lightpink']
      };
  },

  render:function () {

    var colorChoice = this.state.colorChoice;
    var bgStyle = {
      backgroundColor:this.state.bgColor
    }
    var fontStyle = {
      fontSize:this.state.fontSize
    }

    colorChoice = colorChoice.map(function(item, index){
      return (
        <BgButton item = {item} key = {index} onColorChange={this.onColorChange}/>
      );
    }.bind(this));

    return (
      <div className="main-wrapper" style={bgStyle}>
        <div className="text-btn-wrapper">
          <h1 className="h1-text" style={fontStyle}>{this.state.bgColor} {this.state.fontSize}</h1>
          <div className="btn-wrapper">
            <div onClick={this.plus} className="pmBtn" id="plus"><p>+</p></div>
            <div onClick={this.minus} className="pmBtn" id="minus"><p>-</p></div>
          </div>
        </div>
        <div className="btn-color-wrapper">{colorChoice}</div>
      </div>
    );
  },

  plus:function (){
    var size = styleInfo.getPref()['font-size'];
    if (size < 50) size++;

    styleInfo.setPref(styleInfo.getPref()['background-color'],size);
    this.setState({
      fontSize:styleInfo.getPref()['font-size']
    });
  },

  minus:function(){
    var size = styleInfo.getPref()['font-size'];
    if (size > 1) size--;

    styleInfo.setPref(styleInfo.getPref()['background-color'],size);
    this.setState({
      fontSize:styleInfo.getPref()['font-size']
    });
  },

  onColorChange:function(color) {
    styleInfo.setPref(color, styleInfo.getPref()['font-size']);
    this.setState({
      bgColor:styleInfo.getPref()['background-color']
    });
  }
});

ReactDOM.render(<StyleComp />, document.getElementById('app-wrapper'));
