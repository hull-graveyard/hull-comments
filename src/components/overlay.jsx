import React from 'react';
import styles from '../styles/overlay.css';
import cssModules from 'react-css-modules';
import cx from 'classnames';

@cssModules(styles, {allowMultiple: true})
export default class Overlay extends React.Component {

  static propTypes = {
    children: React.PropTypes.any.isRequired,
    visible: React.PropTypes.bool,
  }

  render() {
    return (
      <div styleName={cx({overlay: true, open: this.props.visible})}>
        {this.props.children}
      </div>
    );
  }
}

