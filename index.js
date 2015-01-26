var React = require('react');
window.React = React;
var assign = require('object-assign');
var Engine = require('./engine');
var Comments = require('./comments');

var Context = React.createClass({

  propTypes: {
    engine: React.PropTypes.object.isRequired,
    sandbox: React.PropTypes.bool,
    stylesheets: React.PropTypes.array
  },

  getInitialState: function() {
    return this.props.engine.getState();
  },

  componentWillMount: function() {
    this.props.engine.addChangeListener(this._onChange);
  },

  renderContent: function() {
    return <div>
      <div id="my-styles">{this.props.stylesheets}</div>
      <this.props.component {...this.state} actions={this.props.engine.getActions()} />
    </div>;
  },

  componentDidMount: function() {
    this.renderFrameContents();
  },

  componentDidUpdate: function() {
    this.renderFrameContents();
  },

  componentWillUnmount: function() {
    this.props.engine.removeChangeListener(this._onChange);
    React.unmountComponentAtNode(this.getDOMNode().contentDocument.body);
  },

  _onChange: function() {
    this.setState(this.props.engine.getState());
  },

  renderFrameContents: function() {
    if (this.props.sandbox) {
      var frame = this.getDOMNode();
      var doc = frame.contentDocument;
      if (doc.readyState === 'complete') {
        this._rendered = true;
        React.render(this.renderContent(), doc.body);
        setTimeout(function() {
          doc.body.style.margin = 0;
          doc.body.style.padding = 0;
          var height = doc.body.firstChild.offsetHeight + 30;
          frame.style.height = height + "px";
        }, 10);
      } else {
        setTimeout(this.renderFrameContents, 0);
      }
    }
  },

  render: function() {
    if (this.props.sandbox) {
      return <iframe frameBorder="0" width="100%" />;
    } else {
      return this.renderContent();
    }
  }
});

Hull.onEmbed(document, function(element, deploy_options) {
  var options = assign({}, deploy_options, {
    entity_id: Hull.util.entity.encode(document.location.toString())
  });

  var engine = new Engine(options);
  var stylesheets = [
    <link key="1" rel="stylesheet" type="text/css" href="//ship.dev/style.css" />,
  ];
  React.render(<Context engine={engine} sandbox={true} component={Comments} stylesheets={stylesheets} />, element);
});

