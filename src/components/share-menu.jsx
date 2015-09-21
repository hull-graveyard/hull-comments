import _ from '../lib/lodash';
import str from 'underscore.string';
import React from 'react';
import DropdownMenu from './dropdown-menu';
import Icon from './icon';
import { translate } from '../lib/i18n';

const PROVIDERS = ['facebook', 'twitter', 'linkedin', 'google', 'email'];
const MOBILE_PROVIDERS = ['whatsapp'];

var ShareMenu = React.createClass({
  getTitle() {
    return this.props.title || <span><Icon colorize name="share"/>{translate('Share')}</span>;
  },

  getDefaultProps() {
    return {
      right:false
    };
  },

  getOptions() {
    // let providers = Hull.utils.isMobile() ? PROVIDERS.concat(MOBILE_PROVIDERS) : PROVIDERS
    let providers = PROVIDERS.concat(MOBILE_PROVIDERS);

    return _.map(providers, (value) => {
      return {
        label: <span className='share-icon'><Icon style={{width:24, marginRight:5}} colorize={false} name={value}/><span className='share-icon__text show-for-medium-up'>&nbsp;{str.humanize(value)}</span></span>,
        value: value.toLowerCase()
      }
    });
  },

  handleShare(e) {
    this.props.actions.share(e.value)
  },

  render() {
    return <DropdownMenu
      component={this.props.component || 'span'}
      right={this.props.right}
      options={this.getOptions()}
      title={this.getTitle()}
      onSelect={this.handleShare} />;
  }
});

module.exports = ShareMenu;
