import React from 'react';
import styles from '../styles/main.scss';
import cssModules from 'react-css-modules';


@cssModules(styles, {allowMultiple: true})
export default class CommentAvatar extends React.Component {

  static propTypes = {
    comment: React.PropTypes.shape({
      user: React.PropTypes.object,
      id: React.PropTypes.string,
    }).isRequired,
  }

  render() {
    const comment = this.props.comment;
    const user = comment.user;
    return (
      <div className="avatar hovercard">
        <a className="user"><img alt="Avatar" src={user.picture} /></a>
      </div>
    );
  }
}
