import DropdownMenu from './dropdown-menu';
import React from 'react';
import Icon from './icon';
import capitalize from '../lib/capitalize';
import { translate } from '../lib/i18n';
import styles from '../styles/main.scss';
import cssModules from 'react-css-modules';

const ICONS = { newest: 'chevron_down', best: 'heart', oldest: 'chevron_up' };

@cssModules(styles, {allowMultiple: true})
export default class SortMenu extends React.Component {

  static propTypes = {
    orderBy: React.PropTypes.string.isRequired,
    actions: React.PropTypes.object.isRequired,
  };

  getTitle() {
    return <span><Icon name={ICONS[this.props.orderBy]}/>{translate(capitalize(this.props.orderBy))}</span>;
  }

  getOptions() {
    return ['best', 'newest', 'oldest'].map(function(opt) {
      return { value: opt, label: <span><Icon name={ICONS[opt]}/>{translate(capitalize(opt))}</span> };
    });
  }

  handleChange = (event) => {
    this.props.actions.orderBy(event.value);
  }

  render() {
    return (
        <DropdownMenu right
        options={this.getOptions()}
        title={this.getTitle()}
        value={this.props.orderBy}
        onSelect={this.handleChange} />
      );
  }
}
