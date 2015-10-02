import React from 'react';
import Avatar from './avatar';
import cx from 'classnames';
import CommentForm from './comment-form';
import EmailLogin from './email-login';
import styles from '../styles/top-form.scss';
import cssModules from 'react-css-modules';


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
    return (
      <div styleName={cx({composer: true, top: this.props.top})}>
        <div styleName="avatar">
          <Avatar {...this.props.user}/>
        </div>
        <div styleName="form">
          <CommentForm {...this.props} />
        </div>
        <EmailLogin {...this.props} styleName="left"/>
      </div>
    );
  }
}
