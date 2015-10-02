import React from 'react';
import Comments from './comments';
import HullStyle from './hull-style';
import styles from '../styles/main.scss';
import cssModules from 'react-css-modules';

@cssModules(styles, {allowMultiple: true})
export default class extends React.Component {


  static propTypes = {
    engine: React.PropTypes.object.isRequired,
  }

  static state = {}

  componentWillMount = () => {
    this._onChange();
    this.props.engine.addChangeListener(this._onChange);
  }

  componentWillUnmount = () => {
    this.props.engine.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    this.setState(this.props.engine.getState());
  }

  render() {
    return (
      <div styleName="ship">
        <HullStyle { ...this.state.settings} rootClass=".ship"/>
        <div className="ship">
          <Comments { ...this.state} actions={this.props.engine.getActions()} />
        </div>
      </div>
    );
  }
}
