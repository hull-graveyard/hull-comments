'use strict';
/* global module,import */

import React from 'react';
import assign from 'object-assign';
import cx from 'classnames';
import SVGIcon from 'svg-inline-loader/lib/component.jsx';
import styles from '../styles/icon.scss';
import cssModules from '../lib/cssModules';


const icons = {
  reply: require('svg-inline!../icons/reply.svg'),
  share: require('svg-inline!../icons/share.svg'),
  heart: require('svg-inline!../icons/heart.svg'),
  cog: require('svg-inline!../icons/cog.svg'),
  minus: require('svg-inline!../icons/minus.svg'),
  plus: require('svg-inline!../icons/plus.svg'),
  chevron_up: require('svg-inline!../icons/chevron_up.svg'),
  chevron_right: require('svg-inline!../icons/chevron_right.svg'),
  chevron_down: require('svg-inline!../icons/chevron_down.svg'),
  spinner: require('svg-inline!../icons/spinner.svg'),
  valid: require('svg-inline!../icons/valid.svg'),
  exit: require('svg-inline!../icons/exit.svg'),
  pencil: require('svg-inline!../icons/pencil.svg'),
  trash: require('svg-inline!../icons/trash.svg'),
  ghost: require('svg-inline!../icons/ghost.svg'),
  lock: require('svg-inline!../icons/lock.svg'),
  user: require('svg-inline!../icons/user_circle.svg'),

  facebook: require('svg-inline!../icons/facebook.svg'),
  foursquare: require('svg-inline!../icons/foursquare.svg'),
  twitter: require('svg-inline!../icons/twitter.svg'),
  linkedin: require('svg-inline!../icons/linkedin.svg'),
  google: require('svg-inline!../icons/google.svg'),
  angellist: require('svg-inline!../icons/angellist.svg'),
  instagram: require('svg-inline!../icons/instagram.svg'),
  github: require('svg-inline!../icons/github.svg'),
  whatsapp: require('svg-inline!../icons/whatsapp.svg'),
  tumblr: require('svg-inline!../icons/tumblr.svg'),
  meetups: require('svg-inline!../icons/meetups.svg'),
  send: require('svg-inline!../icons/send.svg'),
  email: require('svg-inline!../icons/send.svg'),
};

const Icon = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    size: React.PropTypes.number,
    style: React.PropTypes.object,
    colorize: React.PropTypes.bool,
    color: React.PropTypes.string,
  },
  getDefaultProps() {
    return {
      colorize: false,
      style: {},
      size: 16,
    };
  },
  render() {
    const { name, size, style, colorize, color } = this.props;
    const src = icons[name];
    if (!src) {
      return <i/>;
    }
    let outputStyle = assign({width: size, height: size}, style);
    if (color) {
      outputStyle = assign(outputStyle, {color});
    }
    return <SVGIcon src={src} styleName={cx({icon: true, colorized: !!colorize})} {...this.props} style={outputStyle} />;
  },
});

module.exports = cssModules(Icon, styles);
