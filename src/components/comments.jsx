import React from 'react';
import Nav from './nav';
import Conversation from './conversation';
import Icon from './icon';
import _ from 'lodash';

export default class Comments extends React.Component {

  static propTypes = { isReady: React.PropTypes.bool };

  render() {
    const props = _.omit(this.props, 'styles');
    if (this.props.isReady) {
      return (
        <div>
          <Nav {...props} />
          <Conversation {...props} />
        </div>
      );
    }
    return <Icon name="spinner" size={64} style={{display: 'block', margin: '0 auto'}}/>;
  }
}
