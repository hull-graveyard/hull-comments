
var SCRIPT_ID = 'hull-js-sdk';

var currentScript = (function() {
  var script = document.currentScript;
  if (!script) {
    var scripts = [].slice.call(document.scripts);
    for (var i in scripts) {
      var src = scripts[i].src;
      if (src && src.indexOf(config.appId) > 0) {
        script = scripts[i];
        break;
      }
    }
  }
  return script;
})();

var currentScriptUrl = currentScript && currentScript.src;

var params = (function(url) {
  var ret = {};
  if (url) {
    var a = document.createElement('a');
    a.href = url;
    var qs = a.search.slice(1).split("+").join(" ");
    var tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        ret[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }
  }
  return ret;
})(currentScriptUrl);


var js, fjs = document.getElementsByTagName('script')[0];
// if (document.getElementById(SCRIPT_ID)) {
//   if (!config.debug) {
//     return;
//   }
// }

function Import(href, callback) {
  Import.ensureSupport(function() {
    Import.doImport(href, callback);
  });
};

Import.doImport = function(href, callback) {
  var el = document.querySelector('link[rel="import"][href="' + href + '"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'import';
    el.href = href;
    document.getElementsByTagName('head')[0].parentNode.appendChild(el);
  }
  if (typeof callback === 'function') {
    if (el.import) {
      callback(el);
    } else {
      el.addEventListener('load', function(ev) {
        callback(ev.target);
      });
    }
  }
  return el;
}

Import.isSupported = function() {
  if (Import._supported) {
    return true;
  } else {
    var lnk = document.createElement('link');
    return lnk.hasOwnProperty('import');
  }
};

Import.ensureSupport = function(cb) {
  if (Import.isSupported()) {
    cb();
  } else if (Import._onready) {
    Import._onready.push(cb);
  } else {
    Import._onready = [];
    Import._onready.push(cb);
    Import.polyfill(cb);
  }
}

Import.polyfill = function (cb) {
  var lnk = document.createElement('link');
  if (!lnk.hasOwnProperty('import')) {
    var i = document.createElement('script');
    i.src = "https://hull-js.s3.amazonaws.com/polyfills/HTMLImports.min.js";
    i.onload = function() {
      Import._supported = true;
      var cb = Import._onready.shift();
      while(cb) {
        cb();
        cb = Import._onready.shift();
      }
    };
    fjs.parentNode.insertBefore(i, fjs);
  }
}

Deployment.registry = {};

var resetDeployments = function() {
  var dpl;
  for (var d in Deployment.registry) {
    if (Deployment.registry.hasOwnProperty(d)) {
      dpl = Deployment.registry[d];
      dpl.remove();
    }
  }
  Deployment.registry = {};
};


// Embeds all deployments.
var embedDeployments = function(ships, reset, callback) {
  if (reset !== false) { resetDeployments() }
  var count = ships.length;
  var embeds = [];
  var onEmbedded = function() {
    embeds.push(this);
    if (embeds.length === count && typeof(callback) === 'function') {callback(embeds);}
  };
  if (ships && count > 0) {
    var dpl;
    for (var d = 0, l = ships.length; d < l; d++) {
      dpl = new Deployment(ships[d]);
      dpl.embed(true, onEmbedded);
    }
  }
};


function Deployment(deployment) {
  if (Deployment.registry[deployment.id]) {
    return Deployment.registry[deployment.id];
  } else {
    Deployment.registry[deployment.id] = this;
  }
  this.id = deployment.id;
  this.ship = deployment.ship;
  this.name = deployment.ship.name;
  this.settings = deployment.settings;
  this.platform = deployment.platform;
  this.embedMode = deployment.settings.$fullpage ? "iframe" : "import";
  this.deployMode = deployment.settings.$multi ? "multi" : "single";
  this.href = this.ship.index;
  this.targets = this.getTargets();
  this._elements = [];
  this._callbacks = [];
}

Deployment.prototype.getTargets = function(refreshTargets) {
  var selector = this.settings.$el;
  var targets = [];
  if (!selector || selector.length === 0) return [];
  if (this.targets && !refreshTargets) {
    return this.targets;
  } else {
    if (this.deployMode === 'multi') {
      targets = document.querySelectorAll(selector);
    } else {
      var target = document.querySelector(selector);
      if (target) targets = [target];
    }
    this.targets = targets;
    return targets;
  }
};

Deployment.prototype.forEachTarget = function(fn) {
  var ret = [], targets = this.getTargets();
  if (targets && targets.length > 0) {
    var args = [].slice.call(arguments, 1);
    for (var t = 0, l = targets.length; t < l; t++) {
      if (targets[t]) {
        ret.push({ target: targets[t], result: fn.apply(this, [targets[t]].concat(args)) });
      }
    }
  }
  return ret;
};

Deployment.prototype._onEmbedded = function() {
  var callbacks = this._callbacks.slice();
  var cb = callbacks.shift();
  while (cb) {
    cb.call(this);
    cb = callbacks.shift();
  }
  this._callbacks = [];
};

Deployment.prototype.embed = function(refreshTargets, callback) {
  if (refreshTargets) { this.getTargets(true); }
  if (typeof(callback) === 'function') this._callbacks.push(callback);
  if (this.embedMode === 'import') {
    var self = this;
    Import(this.href, function(link) {
      self.forEachTarget(self.embedImport, link.import);
      self._onEmbedded();
    });
  } else {
    this.forEachTarget(this.embedIframe);
    this._onEmbedded();
  }
};

Deployment.prototype.embedIframe = function(target) {
  var frame = document.createElement('iframe');
  frame.src = this.href;
  frame.style.height = "100%";
  frame.border = 0;
  frame.frameBorder = 0;
  frame.dataset.hullDeployment = this.deployment.id;
  frame.dataset.hullShip = this.ship.id;
  this.insert(frame, target);
  return frame;
};

Deployment.prototype.embedImport = function(target, doc) {
  var body = doc.body.cloneNode(true);
  var el = document.createElement('div');
  el.dataset.hullDeployment = this.id;
  el.dataset.hullShip = this.ship.id;
  if (body.hasChildNodes()) {
    while (body.firstChild) {
      if (body.firstChild.nodeName !== 'SCRIPT') {
        el.appendChild(body.firstChild.cloneNode(true));
      }
      body.removeChild(body.firstChild);
    }
  }
  this.insert(el, target);
  if (doc && doc.onEmbed) {
    doc.onEmbed(el, this);
  }
  return el;
};

Deployment.prototype.remove = function() {
  this.targets = false;
  var el = this._elements.shift();
  var link = document.querySelector('link[rel="import"][href="' + this.href + '"]');
  if (link && link.parentNode) { link.parentNode.removeChild(link); }
  while (el) {
    el.parentNode && el.parentNode.removeChild(el);
    el = this._elements.shift();
  }
};

Deployment.prototype.insert = function(el, target) {
  setDimension(el, 'width', this.settings.width || '100%');
  setDimension(el, 'height', this.settings.height);
  this._elements.push(el);
  switch(this.settings.$placement) {
    case 'before':
      target.parentNode.insertBefore(el, target);
      break;
    case 'after':
      target.parentNode.insertBefore(el, target.nextSibling);
      break;
    case 'top':
      target.insertBefore(el, target.firstChild);
      break;
    case 'replace':
      if (target.nodeName === 'IMG') {
        target.parentNode.replaceChild(el, target);
      } else {
        while (target.firstChild) { target.removeChild(target.firstChild); }
        target.appendChild(el);
      }
      break;
    default:
      target.appendChild(el);
      break;
  }
}

function setDimension(el, dim, val) {
  if (val && val.length > 0) {
    if (/[0-9]+$/.test(val.toString())) {
      val = val + "px";
    }
    el.style[dim] = val;
  }
}

function buildInitConfig(config, params) {
  var ALLOWED_PARAMS = ['callbackUrl', 'debug'];

  var initConfig = {};

  for (var i = 0, l = ALLOWED_PARAMS.length; i < l; i++) {
    var k = ALLOWED_PARAMS[i];
    if (params.hasOwnProperty(k)) {
      initConfig[k] = params[k];
    }
  }

  for (c in config) {
    if (config.hasOwnProperty(c)) {
      initConfig[c] = config[c];
    }
  }

  return initConfig;
}

Hull.embed = function(deployments, reset, callback) {

  if (deployments && deployments.length > 0) {
    embedDeployments(deployments, reset, callback);
  }
}

Hull.onEmbed = function(doc, fn) {
  var currentScript = doc && doc._currentScript || doc.currentScript;
  if (currentScript && currentScript.ownerDocument) {
    currentScript.ownerDocument.onEmbed = fn;
  }
},

module.exports = Hull;
