import MessageFormat from 'messageformat';

var _translations = {};
var _locale = 'en';
var _messages = {};

function compileMessages() {
  _messages = {};

  var mf = new MessageFormat(_locale);
  for (var k in _translations[_locale]) {
    if (_translations[_locale].hasOwnProperty(k)) {
      _messages[k] = mf.compile(_translations[_locale][k], _locale);
    }
  }
}

function setTranslations(translations) {
  _translations = translations;

  compileMessages();
}

function setLocale(locale) {
  _locale = locale;

  compileMessages();
}

function translate(message, data) {
  var m = _messages[message];

  if (m == null) {
    var mf = new MessageFormat('en');
    console.warn('[i18n] "' + message + '". is missing in "' + _locale + '.json".');
    m = _messages[message] = mf(message, _locale);
  }

  try {
    return m(data);
  } catch (e) {
    console.error('[i18n] Cannot translate "' + message + '". ' + e.message);

    return '[error] ' + message;
  }
}

export default {
  setTranslations: setTranslations,
  setLocale: setLocale,
  translate: translate
};

