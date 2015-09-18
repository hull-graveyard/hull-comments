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
      ${this.props.rootCssClass} a {
        color: ${props.link_color};
      }
      ${this.props.rootCssClass} .top-bar-section ul li > a,
      ${this.props.rootCssClass} .top-bar .name h1 a,
      ${this.props.rootCssClass} .top-bar .name h2 a,
      ${this.props.rootCssClass} .top-bar .name h3 a,
      ${this.props.rootCssClass} .top-bar .name h4 a,
      ${this.props.rootCssClass} .top-bar .name p a,
      ${this.props.rootCssClass} .top-bar .name span a{
        color: ${props.light_color};
      }
      ${this.props.rootCssClass} a:hover,
      ${this.props.rootCssClass} a:active,
      ${this.props.rootCssClass} .top-bar-section ul li:hover:not(.has-form) > a,
      ${this.props.rootCssClass} .top-bar-section ul li > a:hover,
      ${this.props.rootCssClass} .top-bar-section ul li > a:active,
      ${this.props.rootCssClass} .top-bar .name h1 a:hover,
      ${this.props.rootCssClass} .top-bar .name h1 a:active,
      ${this.props.rootCssClass} .top-bar .name h2 a:hover,
      ${this.props.rootCssClass} .top-bar .name h2 a:active,
      ${this.props.rootCssClass} .top-bar .name h3 a:hover,
      ${this.props.rootCssClass} .top-bar .name h3 a:active,
      ${this.props.rootCssClass} .top-bar .name h4 a:hover,
      ${this.props.rootCssClass} .top-bar .name h4 a:active,
      ${this.props.rootCssClass} .top-bar .name p a:hover,
      ${this.props.rootCssClass} .top-bar .name p a:active,
      ${this.props.rootCssClass} .top-bar .name span a{
        color: ${Color(props.link_color).darken(.3).hslString()};
      }
      ${this.props.rootCssClass} .light-text{
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

