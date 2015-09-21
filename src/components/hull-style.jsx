import React      from 'react';

/**
 * Style component
 * @param  {hash} settings
 * @return {React Component} A style tag
 */
var HullStyle = React.createClass({
  getStyle(){

    // Just Javascript™
    var props = this.props
    // Here's where you inject your user-configurable CSS.
    // ES6 template literals (http://updates.html5rocks.com/2015/01/ES6-Template-Strings) make this a fun moment.
    var style = `
      ${this.props.rootCssClass} a,
      ${this.props.rootCssClass} a.button.link,
      ${this.props.rootCssClass} a:hover.button.link{
        color: ${props.link_color};
      }
      ${this.props.rootCssClass} a.button.primary,
      ${this.props.rootCssClass} a.button.primary:hover{
        background-color: ${props.link_color};
      }

      ${this.props.rootCssClass} a.button.pill{
        -webkit-box-shadow: inset 0 0 0 2px ${props.link_color};
        -moz-box-shadow: inset 0 0 0 2px ${props.link_color};
        -o-box-shadow: inset 0 0 0 2px ${props.link_color};
        -ms-box-shadow: inset 0 0 0 2px ${props.link_color};
        box-shadow: inset 0 0 0 2px ${props.light_color};
      }

      ${this.props.rootCssClass} .light-text,
      ${this.props.rootCssClass} .comment-footer__list-item a,
      ${this.props.rootCssClass} .comment-footer__list-item a:hover,
      ${this.props.rootCssClass} .comment-footer__list-item a:active{
        color: ${props.light_color};
      }
    `
    return style
  },
  render() {
    // Insert any css you want here. Live updates FTW
    return <style type="text/css">{this.getStyle()}</style>;
  }

});

module.exports = HullStyle;

