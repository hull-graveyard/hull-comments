"use strict";
/*global module,import*/

import React from "react";
import assign from "object-assign";
import _ from "../lib/lodash";
import SVGIcon from 'svg-inline-loader/lib/component.jsx';

let icons = {
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
  email: require('svg-inline!../icons/send.svg')
}

var Icon = React.createClass({
  getDefaultProps: function() {
    return {
      colorize:false,
      style: {}
    };
  },
  render() {
    let name = this.props.name
    let src = icons[name];
    if(src){
      let className = `icon ${this.props.colorize ? 'colorize': ''}`;

      let style = this.props.color ? assign({}, this.props.style, {color: this.props.color }) : this.props.style;
      return <SVGIcon src={src} className={className} {...this.props} style={style} />;
    } else {
      return <i/>
    }
  }
});

module.exports = Icon;
