import React from 'react';
import Colr from 'colr';

/**
 * Style component
 * @param  {hash} settings
 * @return {React Component} A style tag
 */
export default class HullStyle extends React.Component {

  static propTypes = {
    styles: React.PropTypes.object.isRequired,
    link_color: React.PropTypes.string.isRequired,
    light_color: React.PropTypes.string.isRequired,
    text_color: React.PropTypes.string.isRequired,
    background_color: React.PropTypes.string.isRequired,
  };

  getStyle() {
    // Just Javascript™
    const linkColor = new Colr().fromHex(this.props.link_color);
    const lightColor = new Colr().fromHex(this.props.light_color);
    const textColor = new Colr().fromHex(this.props.text_color);
    const backgroundColor = new Colr().fromHex(this.props.background_color);

    const { ship, link, light, button } = this.props.styles;
    // Here's where you inject your user-configurable CSS.
    // ES6 template literals (http://updates.html5rocks.com/2015/01/ES6-Template-Strings) make this a fun moment.
    return `
      .${ship}{
        background-color: ${backgroundColor.toHex()};
        color: ${textColor};
      }

      .${link.split(' ').join(', .')} {
        color: ${linkColor.toHex()};
      }

      .${button.split(' ').join(', .')}{
        background-color: ${linkColor.toHex()};
        color:white;
      }

      .${button.split(' ').join(', .')}:hover{
        background-color: ${linkColor.darken(20).toHex()};
      }

      .${light.split(' ').join(', .')}, a.${light.split(' ').join(', .')}, a.${light.split(' ').join(', .')}:hover{
        color: ${lightColor.toHex()};
      }
    `;
  }
  render() {
    // Insert any css you want here. Live updates FTW
    return <style type="text/css">{this.getStyle()}</style>;
  }
}
