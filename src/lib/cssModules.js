import cssModules from 'react-css-modules';

module.exports = function(element, styles) {
  return cssModules(element, styles, {allowMultiple: true});
};
