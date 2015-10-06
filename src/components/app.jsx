import React from 'react';
import Comments from './comments';
import HullStyle from './hull-style';
import styles from '../styles/main.css';
import cssModules from 'react-css-modules';

@cssModules(styles)
export default class App extends React.Component {

  static propTypes = {
    engine: React.PropTypes.object.isRequired,
    styles: React.PropTypes.object,
  }

  state = {}

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
        <HullStyle { ...this.state.settings} styles={this.props.styles}/>
        <Comments { ...this.state} styles={this.props.styles} actions={this.props.engine.getActions()} />
      </div>
    );
  }
}
