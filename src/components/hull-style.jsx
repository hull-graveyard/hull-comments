import React      from 'react';
import Color      from 'color';

/**
 * Style component
 * @param  {hash} settings
 * @return {React Component} A style tag
 */
var HullStyle = React.createClass({
  getStyle: function(){

    // Just Javascript™
    var props = this.props
    // Here's where you inject your user-configurable CSS.
    // ES6 template literals (http://updates.html5rocks.com/2015/01/ES6-Template-Strings) make this a fun moment.
    var style = `
      body {
        color: ${props.text_color};
        backround-color: ${props.background_color};
      }
      a{
        color: ${props.light_color};
      }
      a:active, a:hover{
        color: ${Color(props.light_color).darken(.3)};
      }
      .light-text{
        color: ${props.light_color};
      }
    `
    return style
  },
  render: function() {
    // Insert any css you want here. Live updates FTW
    return <style type="text/css">{this.getStyle()}</style>;
  }

});

module.exports = HullStyle;

