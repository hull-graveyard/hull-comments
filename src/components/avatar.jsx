import React from 'react';
import styles from '../styles/avatar.scss';
import cssModules from '../lib/cssModules';


const Avatar = React.createClass({
  propTypes: {
    picture: React.PropTypes.any,
    className: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      className: '',
    };
  },

  render() {
    const picture = this.props.picture || 'http://hull.s3.amazonaws.com/avatar.png';
    return <img styleName="avatar" src={picture} />;
  },

});

module.exports = cssModules(Avatar, styles);
