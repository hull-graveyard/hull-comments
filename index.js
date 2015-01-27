var React = require('react');
var assign = require('object-assign');
var Engine = require('./engine');
var Comments = require('./src');

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
      {this.props.stylesheets}
      <this.props.component {...this.state} actions={this.props.engine.getActions()} />
    </div>;
  },

  componentDidMount: function() {
    this.renderFrameContents();
    if (this.props.sandbox) {
      this._autogrow = setInterval(this.autoGrow, 200);
    }
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
        this.autoGrow();
      } else {
        setTimeout(this.renderFrameContents, 0);
      }
    }
  },

  autoGrow: function() {
    if (this.isMounted()) {
      if (this.props.sandbox) {
        var frame = this.getDOMNode();
        var doc = frame.contentDocument;
        setTimeout(function() {
          doc.body.style.margin = 0;
          doc.body.style.padding = 0;
          var height = doc.body.firstChild.offsetHeight + 30;
          frame.style.height = height + "px";
        }, 10);
      }
    } else {
      if (this._autogrow) clearInterval(this._autogrow);
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

Hull.onEmbed(document, function(element, deployment) {
  var ship = deployment.ship;
  var options = assign({}, deployment, {
    entity_id: Hull.util.entity.encode(document.location.toString())
  });

  var stylesheetUrl = ship.source_url + "style.css";

  var engine = new Engine(options);
  var stylesheets = [
    <link key="1" rel="stylesheet" type="text/css" href={stylesheetUrl} />,
  ];
  React.render(<Context engine={engine} sandbox={true} component={Comments} stylesheets={stylesheets} />, element);
});

