import React from 'react';
import Comment from './comment';
import TopForm from './top-form';
import { translate } from '../lib/i18n';
import styles from '../styles/conversation.css';
import cssModules from 'react-css-modules';
import _ from 'lodash';


@cssModules(styles, {allowMultiple: true})
export default class Conversation extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object,
    hasMore: React.PropTypes.bool,
    comments: React.PropTypes.array.isRequired,
  }

  handleLoadMore = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    this.props.actions.fetchMore();
  }

  renderFetchMore(props) {
    if (!props.hasMore) { return null; }

    return (
      <a onClick={this.handleLoadMore} styleName="button">{translate('Load more comments')}</a>
    );
  }

  render() {
    const props = _.omit(this.props, 'styles');
    const comments = props.comments.map(function(comment, i) {
      return <Comment key={`comment-${comment.id || i}`} {...props} comment={comment} />;
    }, this);

    return (
      <div styleName="conversation">
        <TopForm {...props} top/>
        {comments}
        {this.renderFetchMore(props)}
      </div>
    );
  }
}

