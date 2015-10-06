import React from 'react';
import Nav from './nav';
import Conversation from './conversation';
import Icon from './icon';
import _ from 'lodash';

export default class Comments extends React.Component {

  static propTypes = {
    isReady: React.PropTypes.bool,
    styles: React.PropTypes.object,
  };

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
    return <Icon name="spinner" className={this.props.styles.spinner}/>;
  }
}
