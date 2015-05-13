'use strict';

import { translate } from './i18n';

const UNITS = {
  year: 31557600000,
  month: 2629800000,
  week: 604800000,
  day: 86400000,
  hour: 3600000,
  minute: 60000,
  second: 1000
};

function relativeTime(time) {
  const delta = new Date() - new Date(time);

  for (let unit in UNITS) {
    if (UNITS.hasOwnProperty(unit) && delta >= UNITS[unit]) {
      const n = Math.floor(delta / UNITS[unit]);
      console.log(delta, delta / UNITS[unit], n);

      return translate('{number, plural, one {# ' + unit + '} other {# ' + (unit + 's') + '}} ago', { number: n });
    }
  }

  return translate('Now');
}

export default relativeTime;

