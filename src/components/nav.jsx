import React from 'react';
import UserMenu from './user-menu';
import SortMenu from './sort-menu';
import ShareMenu from './share-menu';
import FavoritesButton from './favorites-button';
import { translate } from '../lib/i18n';
import styles from '../styles/nav.css';
import cssModules from 'react-css-modules';
import _ from 'lodash';

@cssModules(styles, {allowMultiple: true})
export default class MainHeader extends React.Component {

  static propTypes = {
    styles: React.PropTypes.object,
    orderBy: React.PropTypes.string,
    commentsCount: React.PropTypes.number.isRequired,
  }

  static defaultProps = { orderBy: 'newest' };

  state = {expanded: false, classes: {} };

  toggleNavBar() {
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    const props = _.omit(this.props, 'styles');

    return (
      <nav styleName="nav">
        <section styleName="section">
          <ul styleName="list">
            <li styleName="label">{translate('{count, plural, =0 {No comments} =1 {One comment} other {# Comments}}', { count: this.props.commentsCount })}
            </li>
          </ul>
          <ul styleName="list right">
            <UserMenu {...props} />
          </ul>
        </section>
        <section styleName="section secondary">
          <ul styleName="list">
            <ShareMenu component="li" {...props} />
            <li styleName="item"><FavoritesButton {...props}/></li>
          </ul>
          <ul styleName="list right">
            <SortMenu {...props} />
          </ul>
        </section>
      </nav>
    );
  }
}
