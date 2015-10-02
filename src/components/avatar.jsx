import React from 'react';
import styles from '../styles/avatar.scss';
import cssModules from 'react-css-modules';


@cssModules(styles, {allowMultiple: true})
export default class Avatar extends React.Component {

  static propTypes = {
    picture: React.PropTypes.string,
  }

  render() {
    const picture = this.props.picture || 'http://hull.s3.amazonaws.com/avatar.png';
    return <img styleName="avatar" src={picture} />;
  }

}
