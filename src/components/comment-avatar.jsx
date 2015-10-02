import React from 'react';
import styles from '../styles/main.scss';
import cssModules from '../lib/cssModules';


const CommentAvatar = React.createClass({
  propTypes: {
    comment: React.PropTypes.shape({
      user: React.PropTypes.object,
      id: React.PropTypes.string,
    }).isRequired,
  },

  render() {
    const comment = this.props.comment;
    const user = comment.user;
    return (
      <div className="avatar hovercard">
        <a className="user"><img alt="Avatar" src={user.picture} /></a>
      </div>
    );
  },
});

module.exports = cssModules(CommentAvatar, styles);
