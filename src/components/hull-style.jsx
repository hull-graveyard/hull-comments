import React from 'react';
import Colr from 'colr';

/**
 * Style component
 * @param  {hash} settings
 * @return {React Component} A style tag
 */
export default class HullStyle extends React.Component {

  static propTypes = {
    rootClass: React.PropTypes.string.isRequired,
    link_color: React.PropTypes.string.isRequired,
    light_color: React.PropTypes.string.isRequired,
    text_color: React.PropTypes.string.isRequired,
    background_color: React.PropTypes.string.isRequired,
  };

  getStyle() {
    // Just Javascript™
    const link = new Colr().fromHex(this.props.link_color);
    const light = new Colr().fromHex(this.props.light_color);
    const text = new Colr().fromHex(this.props.text_color);
    const background = new Colr().fromHex(this.props.background_color);
    const { rootClass } = this.props;
    // Here's where you inject your user-configurable CSS.
    // ES6 template literals (http://updates.html5rocks.com/2015/01/ES6-Template-Strings) make this a fun moment.
    return `
      .${rootClass}{
        background-color: ${background.toHex()};
        color: ${text};
      }

      .${rootClass} .link {
        color: ${link.toHex()};
      }

      .${rootClass} .button{
        background-color: ${link.toHex()};
        color:white;
      }

      .${rootClass} .button:hover{
        background-color: ${link.darken(20).toHex()};
      }

      .${rootClass} .light-text,
      .${rootClass} a.light-text{
        color: ${light.toHex()};
      }
    `;
  }
  render() {
    // Insert any css you want here. Live updates FTW
    return <style type="text/css">{this.getStyle()}</style>;
  }
}
