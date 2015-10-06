import _ from 'lodash';
import humanize from 'underscore.string/humanize';
import React from 'react';
import DropdownMenu from './dropdown-menu';
import Icon from './icon';
import { translate } from '../lib/i18n';
import styles from '../styles/share-menu.css';
import cssModules from 'react-css-modules';


const PROVIDERS = ['facebook', 'twitter', 'linkedin', 'google', 'email'];
const MOBILE_PROVIDERS = ['whatsapp'];

@cssModules(styles, {allowMultiple: true})
export default class ShareMenu extends React.Component {

  static propTypes = {
    title: React.PropTypes.string,
    size: React.PropTypes.number,
    actions: React.PropTypes.object.isRequired,
    styles: React.PropTypes.object,
    component: React.PropTypes.oneOfType([
      React.PropTypes.element,
      React.PropTypes.string,
    ]).isRequired,
    right: React.PropTypes.bool,
  }

  static defaultProps = {right: false, size: 24, component: 'span'};

  getTitle() {
    return this.props.title || <span styleName="link"><Icon colorize name="share"/>{translate('Share')}</span>;
  }

  getOptions() {
    const providers = Hull.utils.isMobile() ? PROVIDERS.concat(MOBILE_PROVIDERS) : PROVIDERS;

    return _.map(providers, (value) => {
      return {
        label: <span><Icon className={this.props.styles.icon} colorize={false} name={value}/><span className="share-text">&nbsp;{humanize(value)}</span></span>,
        value: value.toLowerCase(),
      };
    });
  }

  handleShare = (event) => {
    this.props.actions.share(event.value);
  }

  render() {
    return (
      <DropdownMenu
        component={this.props.component}
        right={this.props.right}
        options={this.getOptions()}
        title={this.getTitle()}
        onSelect={this.handleShare} />
    );
  }
}


