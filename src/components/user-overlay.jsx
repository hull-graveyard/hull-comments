import React from 'react';
import { translate } from '../lib/i18n';
import styles from '../styles/user-overlay.css';
import cssModules from 'react-css-modules';
import Avatar from './avatar';

@cssModules(styles, {allowMultiple: true})
export default class UserOverlay extends React.Component {

  static propTypes = {
    author: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.oneOf([null]),
    ]),
    user: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.oneOf([null]),
    ]),
    isCurrentUser: React.PropTypes.bool,
    isFollowing: React.PropTypes.bool,
    actions: React.PropTypes.object.isRequired,
  }

  handleToggleFollow = () => {
    if (this.props.isFollowing) {
      this.props.actions.unFollow(this.props.author.id);
    } else {
      this.props.actions.follow(this.props.author.id);
    }
  }

  renderComments(author) {
    if (author.stats.actions.comments) {
      return <div className="comments">Comments: {author.stats.actions.comments}</div>;
    }
  }

  renderVotes(author) {
    if (author.stats.actions.reviews) {
      return <div className="comments">Votes: {author.stats.actions.reviews}</div>;
    }
  }

  renderFollowing() {
    return null;
    // For now, disable this feature (need API optimizations for large amounts of comments)
    // if (user && author && !this.props.isCurrentUser) {
    //   return <a onClick={this.handleToggleFollow} styleName={cx({button: true, following: this.props.isFollowing})}>{this.props.isFollowing ? 'Unfollow' : 'Follow'}</a>;
    // }
  }

  render() {
    const { author } = this.props;
    return (
      <div>
        <div styleName="avatar">
          <Avatar {...author}/>
        </div>
        <span styleName="content">
          <span styleName="name">{author.name || author.email || translate('logged in as guest')}</span>
          <div styleName="stats">
            {this.renderComments(author)}
            {this.renderVotes(author)}
            {this.renderFollowing(author, this.props.user)}
          </div>
        </span>
      </div>
    );
  }
}
