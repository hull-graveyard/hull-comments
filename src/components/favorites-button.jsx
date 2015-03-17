import React from 'react';
import cx from 'react/lib/cx';
import Icons from './icons';

var FavoritesButton = React.createClass({

  toggleFavorite: function(e) {
    e.preventDefault();
    this.props.actions.toggleFavorite();
  },

  render: function() {
    if (this.props.isFavorite){
      var color = '#FFCC00';
      var style={color:color}
    } else {
      var style={}
    }
    return (
      <li>
        <a href="#" onClick={this.toggleFavorite} style={style}>{this.props.isFavorite?'Liked':'Like'} <Icons.Heart settings={this.props.settings} size={13} color={color}/></a>
      </li>
    );
  }

});

module.exports = FavoritesButton;
