import React from 'react';
import Nav from './nav';
import Conversation from './conversation';
import Icon from './icon';
import styles from '../styles/main.scss';
import cssModules from 'react-css-modules';

@cssModules(styles, {allowMultiple: true})
export default class Comments extends React.Component {

  static propTypes = { isReady: React.PropTypes.bool };

  render() {
    if (this.props.isReady) {
      return (
        <div>
          <Nav {...this.props} />
          <Conversation {...this.props} />
        </div>
      );
    }
    return <Icon name="spinner" size={64} style={{display: 'block', margin: '0 auto'}}/>;
  }
}
