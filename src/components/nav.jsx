import React from 'react';
import UserMenu from './user-menu';
import SortMenu from './sort-menu';
import ShareMenu from './share-menu';
import FavoritesButton from './favorites-button';
import { translate } from '../lib/i18n';
import styles from '../styles/nav.scss';
import cssModules from '../lib/cssModules';

const MainHeader = React.createClass({
  propTypes: {
    orderBy: React.PropTypes.string,
    commentsCount: React.PropTypes.number.isRequired,
  },

  getDefaultProps() {
    return { orderBy: 'newest' };
  },

  getInitialState() {
    return {
      expanded: false,
      classes: {},
    };
  },

  componentWillMount() {
    // styles.use();
  },

  componentWillUnmount() {
    // styles.unuse();
  },

  toggleNavBar() {
    this.setState({expanded: !this.state.expanded});
  },

  render() {
    return (
      <nav styleName="nav">
        <section styleName="section">
          <ul styleName="list">
            <li styleName="label">{translate('{count, plural, =0 {No comments} =1 {One comment} other {# Comments}}', { count: this.props.commentsCount })}
            </li>
          </ul>
          <ul styleName="list right">
            <UserMenu {...this.props} />
          </ul>
        </section>
        <section styleName="section secondary">
          <ul styleName="list">
            <ShareMenu component="li" {...this.props} />
            <li styleName="item"><FavoritesButton {...this.props}/></li>
          </ul>
          <ul styleName="list right">
            <SortMenu component="li" {...this.props} />
          </ul>
        </section>
      </nav>
    );
  },
});

module.exports = cssModules(MainHeader, styles);
