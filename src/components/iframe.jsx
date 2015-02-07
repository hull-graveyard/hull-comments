var React = require('react');

var Frame = React.createClass({
  propTypes: {
    style: React.PropTypes.object,
    head:  React.PropTypes.renderable
  },
  getDefaultProps: function() {
    return {
      width: '100%',
      frameBorder: 0
    };
  },
  componentDidMount: function() {
    this.renderFrame();
    this._autogrow = setInterval(this.autoGrow, 200);
  },
  componentDidUpdate: function() {
    var self = this;
    this.renderFrame(function (callback) {
      if (self.componentDoneUpdating && prevProps && prevState) {
        setTimeout(function (){ self.componentDoneUpdating(prevProps, prevState); },0);
      }
    });
  },
  componentWillUnmount: function() {
    React.unmountComponentAtNode(this._frameContent.body);
  },

  render: function () {
    if(!this.frame){this.frame = React.createElement('iframe', this.props);}
    return this.frame;
  },

  renderFrame: function(callback) {
    var self=this, doc = this.getDOMNode().contentDocument;
    if(doc && doc.readyState === 'complete') {
      var content = React.createElement('div',undefined, this.props.children);
      React.render(content, doc.body, callback);
      this.autoGrow();
    } else {
      setTimeout(function(){self.renderFrame(callback)}, 0);
    }
  },

  autoGrow: function() {
    if (this.isMounted()) {
      var frame = this.getDOMNode();
      var doc = frame.contentDocument;
      setTimeout(function() {
        doc.body.style.margin = 0;
        doc.body.style.padding = 0;
        var height = doc.body.firstChild.offsetHeight + 30;
        frame.style.height = height + "px";
      }, 10);
    } else {
      if (this._autogrow) clearInterval(this._autogrow);
    }
  },
});


module.exports = Frame;
