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
      a {
        color: ${props.link_color};
      }
      body {
        color: ${props.text_color};
        backround-color: ${props.background_color};
      }
      .top-bar-section ul li > a,
      .top-bar .name h1 a,
      .top-bar .name h2 a,
      .top-bar .name h3 a,
      .top-bar .name h4 a,
      .top-bar .name p a,
      .top-bar .name span a{
        color: ${props.link_color};
      }
      a:hover, a:active,
      .top-bar-section ul li:hover:not(.has-form) > a,
      .top-bar-section ul li > a:hover,
      .top-bar-section ul li > a:active,
      .top-bar .name h1 a:hover,
      .top-bar .name h1 a:active,
      .top-bar .name h2 a:hover,
      .top-bar .name h2 a:active,
      .top-bar .name h3 a:hover,
      .top-bar .name h3 a:active,
      .top-bar .name h4 a:hover,
      .top-bar .name h4 a:active,
      .top-bar .name p a:hover,
      .top-bar .name p a:active,
      .top-bar .name span a{
        color: ${Color(props.link_color).darken(.3).hslString()};
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

