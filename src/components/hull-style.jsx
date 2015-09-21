import React      from 'react';

/**
 * Style component
 * @param  {hash} settings
 * @return {React Component} A style tag
 */
var HullStyle = React.createClass({
  getStyle(){

    // Just Javascript™
    let { rootCssClass, link_color, light_color, text_color, background_color } = this.props; 
    // Here's where you inject your user-configurable CSS.
    // ES6 template literals (http://updates.html5rocks.com/2015/01/ES6-Template-Strings) make this a fun moment.
    var style = `
      ${rootCssClass}{
        background-color: ${background_color};
        color: ${text_color};
      }

      ${rootCssClass} a:not(.button),
      ${rootCssClass} a.button.link,
      ${rootCssClass} a:hover.button.link{
        color: ${link_color};
      }

      ${rootCssClass} a.button.primary,
      ${rootCssClass} a.button.primary:hover{
        background-color: ${link_color};
      }

      ${rootCssClass} .light-text,
      ${rootCssClass} .comment-footer__list-item a,
      ${rootCssClass} .comment-footer__list-item a:hover,
      ${rootCssClass} .comment-footer__list-item a:active,
      ${rootCssClass} .placeholder >.textarea:before {
        color: ${light_color};
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

