"use strict";
/*global module,import*/

import React from "react";
import assign from "object-assign";
import _ from "../lib/lodash";
import Icons from "json-svg-icons";
import SVGIcon from 'svg-inline-loader/lib/component.jsx';

let icons = {
  share: require('svg-inline!../icons/share.svg'),
  heart: require('svg-inline!../icons/heart.svg'),
  italic: require('svg-inline!../icons/italic.svg'),
  arrow_up: require('svg-inline!../icons/arrow_up.svg'),
  arrow_up: require('svg-inline!../icons/arrow_up.svg'),
  arrow_down: require('svg-inline!../icons/arrow_down.svg'),
  spinner: require('svg-inline!../icons/spinner.svg'),
  check: require('svg-inline!../icons/check.svg'),

  facebook: require('svg-inline!../icons/facebook.svg'),
  twitter: require('svg-inline!../icons/twitter.svg'),
  linkedin: require('svg-inline!../icons/linkedin.svg'),
  google: require('svg-inline!../icons/google.svg'),
  angellist: require('svg-inline!../icons/angellist.svg'),
  instagram: require('svg-inline!../icons/instagram.svg'),
  github: require('svg-inline!../icons/github.svg'),
  tumblr: require('svg-inline!../icons/tumblr.svg'),
  meetups: require('svg-inline!../icons/meetups.svg'),
  email: require('svg-inline!../icons/email.svg'),
}

var Icon = React.createClass({
  render() {
    let name = this.props.name
    let src = icons[name];
    if(src){
      return <SVGIcon src={src} className='icon' {...this.props} />;
    } else {
      return <i/>
    }
  }
});

module.exports = Icon;
