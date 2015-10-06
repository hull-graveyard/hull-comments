import React from 'react';
import CommentActions from './comment-actions';
import UserProfile from './user-profile';
import Overlay from './overlay';
import Icon from './icon';
import { translate } from '../lib/i18n';
import relativeTime from '../lib/relative-time';
import styles from '../styles/comment-meta.css';
import cssModules from 'react-css-modules';
import _ from 'lodash';

@cssModules(styles, {allowMultiple: true})
export default class CommentMeta extends React.Component {

  static propTypes = {
    parent: React.PropTypes.object,
    isFollowing: React.PropTypes.bool,
    actions: React.PropTypes.object.isRequired,
    isCurrentUser: React.PropTypes.bool,
    user: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.oneOf([null]),
    ]),
    comment: React.PropTypes.shape({
      user: React.PropTypes.object,
      id: React.PropTypes.string,
    }).isRequired,
  }

  state = { overAuthor: false }

  handleMouseEnter = () =>{
    this.setState({overAuthor: true});
  }
  handleMouseLeave = () =>{
    this.setState({overAuthor: false});
  }

  renderReplyTo() {
    const parent = this.props.parent;
    if (parent) {
      return <span styleName="reply"><Icon name="reply" colorize/>{translate('In reply to {name}', {name: parent.user.name})} </span>;
    }
  }

  renderOverlay(author) {
    if (!author) { return null; }
    return (
      <Overlay visible={this.state.overAuthor}>
        <UserProfile
          author={author}
          actions={this.props.actions}
          user={this.props.user}
          isFollowing={this.props.isFollowing}/>
      </Overlay>
    );
  }

  render() {
    const comment = this.props.comment;
    const author = comment.user || {};
    const props = _.omit(this.props, 'styles');

    return (
      <header styleName="meta" onMouseLeave={this.handleMouseLeave}>
        {this.renderOverlay(author)}
        <div styleName="actions">
          <CommentActions {...props}/>
        </div>

        <strong onMouseEnter={this.handleMouseEnter}>
          <span styleName="name">{author.name || translate('Guest')}</span>
          { author.is_admin ? <span styleName="admin"> {` ${translate('Moderator')} `} </span> : null }
        </strong>

        <span styleName="time">{` ${relativeTime(comment.created_at)} `}</span>
        {this.renderReplyTo()}


      </header>
    );
  }
}

