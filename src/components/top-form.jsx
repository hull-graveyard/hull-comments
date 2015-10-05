import React from 'react';
import Avatar from './avatar';
import cx from 'classnames';
import CommentForm from './comment-form';
import EmailForm from './email-form';
import styles from '../styles/top-form.css';
import cssModules from 'react-css-modules';
import _ from 'lodash';

@cssModules(styles, {allowMultiple: true})
export default class TopForm extends React.Component {

  static propTypes = {
    top: React.PropTypes.bool,
    user: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.oneOf([null]),
    ]),
  };

  render() {
    const props = _.omit(this.props, 'styles');
    return (
      <div styleName={cx({composer: true, top: props.top})}>
        <div styleName="avatar">
          <Avatar {...props.user}/>
        </div>
        <div styleName="form">
          <CommentForm {...props} />
        </div>
        <EmailForm {...props} styleName="left"/>
      </div>
    );
  }
}
