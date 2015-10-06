import React from 'react';
import Avatar from './avatar';
import cx from 'classnames';
import LoginForm from './login-form';
import CommentForm from './comment-form';
import styles from '../styles/top-form.css';
import cssModules from 'react-css-modules';
import _ from 'lodash';

@cssModules(styles, {allowMultiple: true})
export default class TopForm extends React.Component {

  static propTypes = {
    top: React.PropTypes.bool,
    mode: React.PropTypes.string,
    user: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.oneOf([null]),
    ]),
  };

  renderLoginForm() {
    if (!this.props.user && this.props.mode !== 'edit') {
      const props = _.omit(this.props, 'styles');
      return <LoginForm {...props} />;
    }
  }

  render() {
    const props = _.omit(this.props, 'styles');
    return (
      <div styleName={cx({composer: true, top: props.top})}>
        <div styleName="avatar">
          <Avatar {...props.user}/>
        </div>
        <div styleName="form">
          <CommentForm {...props} />
          {this.renderLoginForm()}
        </div>
      </div>
    );
  }
}
