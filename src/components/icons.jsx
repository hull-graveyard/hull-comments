var React = require('react');

const Star = React.createClass({

  getDefaultProps() {
    return {
      size:16
    };
  },
  render() {
    var size=this.props.size;
    var color = this.props.color||this.props.light_color;
    return (
      <svg version="1.1" width={`${size}px`} height={`${size}px`} className="svg-icon svg-icon-star" viewBox="0 0 512 512">
        <polygon fill={color} points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08
  29.274,197.007 188.165,173.919 "/>
      </svg>

    );
  }

});

const Heart = React.createClass({
  getDefaultProps() {
    return {
      size:16
    };
  },

  render() {
    var size=this.props.size;
    var color = this.props.color||this.props.light_color;
    return (
      <svg version="1.0" width={`${size}px`} height={`${size}px`} className="svg-icon svg-icon-heart" viewBox="0 0 100 91.46">
        <path fill={color} d="M49.999,91.46c3.944-3.943,26.458-26.47,40.533-40.543c12.61-12.611,12.341-30.992,0.876-42.395 C79.943-2.884,61.404-2.834,49.999,8.632C38.595-2.834,20.056-2.884,8.591,8.522C-2.874,19.925-3.142,38.306,9.467,50.917 C23.541,64.99,46.058,87.517,49.999,91.46z"/>
      </svg>
    );
  }

});

const Share = React.createClass({
  getDefaultProps() {
    return {
      size:16
    };
  },

  render() {
    var size=this.props.size;
    var color = this.props.color||this.props.light_color;
    return (
      <svg version="1.0" width={`${size}px`} height={`${size}px`} className="svg-icon svg-icon-share" viewBox="0 -10 100 80">
        <path fill={color} d="M78.922,55.7945679 L78.922,70.7308642 L9.644,70.7308642 L9.644,22.1204938 L24.958,22.1204938 L35.579,13.0439506 L0,13.0439506 L0,79.7728395 L88.566,79.7728395 L88.566,46.6014815 L78.922,55.7945679 Z"/>
        <path fill={color} d="M69.801,40.6074074 C69.801,40.6074074 27.071,29.7274074 15.543,67.1367901 C15.543,67.1367901 11.396,13.5545679 69.801,13.5545679 L69.801,0 L100,26.7279012 L69.801,54.3516049 L69.801,40.6074074 L69.801,40.6074074 Z"/>
      </svg>

    );
  }

});


const Spinner = React.createClass({

  getDefaultProps() {
    return {
      size:64,
      color:"#cccccc"
    };
  },
  render() {
    var size=this.props.size;
    var color = this.props.color||this.props.light_color;

    var styles = { width:size }
    if (this.props.centered){ styles.margin = "0 auto"; }
    return (
      <div style={styles}>
        <svg className='spinner' width={`${size}px`} height={`${size}px`} viewBox="0 0 100 100">
          <path fill={color} d="M10,50c0,0,0,0.5,0.1,1.4c0,0.5,0.1,1,0.2,1.7c0,0.3,0.1,0.7,0.1,1.1c0.1,0.4,0.1,0.8,0.2,1.2c0.2,0.8,0.3,1.8,0.5,2.8 c0.3,1,0.6,2.1,0.9,3.2c0.3,1.1,0.9,2.3,1.4,3.5c0.5,1.2,1.2,2.4,1.8,3.7c0.3,0.6,0.8,1.2,1.2,1.9c0.4,0.6,0.8,1.3,1.3,1.9 c1,1.2,1.9,2.6,3.1,3.7c2.2,2.5,5,4.7,7.9,6.7c3,2,6.5,3.4,10.1,4.6c3.6,1.1,7.5,1.5,11.2,1.6c4-0.1,7.7-0.6,11.3-1.6 c3.6-1.2,7-2.6,10-4.6c3-2,5.8-4.2,7.9-6.7c1.2-1.2,2.1-2.5,3.1-3.7c0.5-0.6,0.9-1.3,1.3-1.9c0.4-0.6,0.8-1.3,1.2-1.9 c0.6-1.3,1.3-2.5,1.8-3.7c0.5-1.2,1-2.4,1.4-3.5c0.3-1.1,0.6-2.2,0.9-3.2c0.2-1,0.4-1.9,0.5-2.8c0.1-0.4,0.1-0.8,0.2-1.2 c0-0.4,0.1-0.7,0.1-1.1c0.1-0.7,0.1-1.2,0.2-1.7C90,50.5,90,50,90,50s0,0.5,0,1.4c0,0.5,0,1,0,1.7c0,0.3,0,0.7,0,1.1 c0,0.4-0.1,0.8-0.1,1.2c-0.1,0.9-0.2,1.8-0.4,2.8c-0.2,1-0.5,2.1-0.7,3.3c-0.3,1.2-0.8,2.4-1.2,3.7c-0.2,0.7-0.5,1.3-0.8,1.9 c-0.3,0.7-0.6,1.3-0.9,2c-0.3,0.7-0.7,1.3-1.1,2c-0.4,0.7-0.7,1.4-1.2,2c-1,1.3-1.9,2.7-3.1,4c-2.2,2.7-5,5-8.1,7.1 c-0.8,0.5-1.6,1-2.4,1.5c-0.8,0.5-1.7,0.9-2.6,1.3L66,87.7l-1.4,0.5c-0.9,0.3-1.8,0.7-2.8,1c-3.8,1.1-7.9,1.7-11.8,1.8L47,90.8 c-1,0-2-0.2-3-0.3l-1.5-0.2l-0.7-0.1L41.1,90c-1-0.3-1.9-0.5-2.9-0.7c-0.9-0.3-1.9-0.7-2.8-1L34,87.7l-1.3-0.6 c-0.9-0.4-1.8-0.8-2.6-1.3c-0.8-0.5-1.6-1-2.4-1.5c-3.1-2.1-5.9-4.5-8.1-7.1c-1.2-1.2-2.1-2.7-3.1-4c-0.5-0.6-0.8-1.4-1.2-2 c-0.4-0.7-0.8-1.3-1.1-2c-0.3-0.7-0.6-1.3-0.9-2c-0.3-0.7-0.6-1.3-0.8-1.9c-0.4-1.3-0.9-2.5-1.2-3.7c-0.3-1.2-0.5-2.3-0.7-3.3 c-0.2-1-0.3-2-0.4-2.8c-0.1-0.4-0.1-0.8-0.1-1.2c0-0.4,0-0.7,0-1.1c0-0.7,0-1.2,0-1.7C10,50.5,10,50,10,50z" />
        </svg>
      </div>
    );
  }
});


const Facebook = React.createClass({
  getDefaultProps() {
    return {
      size:16
    };
  },

  render() {
    var size=this.props.size;
    var color = this.props.color||this.props.light_color;
    return (
      <svg viewBox="0 0 12 12" width={`${size}px`} height={`${size}px`} className="svg-icon svg-icon-facebook">
        <path fill={color} d="M9.1,0.1V2H8C7.6,2,7.3,2.1,7.1,2.3C7,2.4,6.9,2.7,6.9,3v1.4H9L8.8,6.5H6.9V12H4.7V6.5H2.9V4.4h1.8V2.8 c0-0.9,0.3-1.6,0.7-2.1C6,0.2,6.6,0,7.5,0C8.2,0,8.7,0,9.1,0.1z"></path>
      </svg>
    );
  }

});

const Twitter = React.createClass({
  getDefaultProps() {
    return {
      size:16
    };
  },

  render() {
    var size=this.props.size;
    var color = this.props.color||this.props.light_color;
    return (
      <svg viewBox="0 0 12 12" width={`${size}px`} height={`${size}px`} className="svg-icon svg-icon-twitter">
        <path fill={color} d="M10.8,3.5c0,0.1,0,0.2,0,0.3c0,3.3-2.5,7-7,7c-1.4,0-2.7-0.3-3.8-1c0.2,0,0.4,0,0.6,0c1.1,0,2.2-0.5,3.1-1.2 c-1.1,0-2-0.7-2.3-1.7c0.2,0,0.3,0,0.5,0s0.4,0,0.7-0.1c-1.1-0.2-2-1.2-2-2.4l0,0c0.3,0.2,0.7,0.3,1.1,0.3C1,4.3,0.6,3.5,0.6,2.7 c0-0.5,0.1-0.8,0.3-1.2c1.2,1.6,3,2.5,5,2.6c0-0.2-0.1-0.4-0.1-0.6c0-1.3,1.1-2.4,2.5-2.4c0.7,0,1.4,0.3,1.8,0.8 c0.6-0.1,1.1-0.3,1.6-0.6c-0.2,0.6-0.6,1.1-1.1,1.4c0.5-0.1,1-0.2,1.4-0.4C11.7,2.8,11.2,3.2,10.8,3.5z"></path>
      </svg>
    );
  }

});

const Google = React.createClass({
  getDefaultProps() {
    return {
      size:16
    };
  },

  render() {
    var size=this.props.size;
    var color = this.props.color||this.props.light_color;
    return (
      <svg viewBox="0 0 12 12" width={`${size}px`} height={`${size}px`} className="svg-icon svg-icon-google">
        <path fill={color} d="M5.4,5.7c0,0.2,0.1,0.3,0.2,0.5c0.2,0.2,0.3,0.3,0.6,0.5s0.4,0.3,0.7,0.5C7,7.5,7.2,7.7,7.4,8 c0.2,0.3,0.2,0.6,0.2,1c0,0.4-0.1,0.8-0.3,1.2c-0.3,0.6-0.9,1-1.5,1.3S4.3,12,3.6,12c-0.6,0-1.2-0.1-1.8-0.3s-1-0.5-1.2-1 c-0.2-0.3-0.3-0.6-0.3-0.9c0-0.4,0.1-0.7,0.3-1.1c0.2-0.3,0.5-0.6,0.9-0.8c0.6-0.4,1.6-0.6,2.9-0.7C4.2,6.9,4.1,6.8,4,6.6 C4,6.4,3.9,6.3,3.9,6.1c0-0.2,0.1-0.4,0.2-0.6c-0.2,0-0.4,0-0.5,0c-0.7,0-1.3-0.2-1.8-0.7C1.3,4.3,1.1,3.7,1.1,3 c0-0.4,0.1-0.8,0.3-1.1S1.7,1.2,2,0.9c0.4-0.3,0.8-0.6,1.3-0.7C3.9,0.1,4.4,0,4.9,0h3l-1,0.6H6c0.4,0.3,0.6,0.6,0.8,1 s0.3,0.7,0.3,1.2c0,0.3-0.1,0.7-0.2,0.9C6.8,4,6.6,4.2,6.5,4.4C6.3,4.5,6.1,4.7,6,4.8C5.8,5,5.7,5.1,5.5,5.3 C5.4,5.4,5.4,5.6,5.4,5.7z M4.3,11.3c0.3,0,0.5,0,0.8-0.1c0.3-0.1,0.5-0.2,0.7-0.3c0.2-0.1,0.4-0.3,0.5-0.5c0.1-0.2,0.2-0.5,0.2-0.8 c0-0.1,0-0.2-0.1-0.4S6.5,9.1,6.4,9c0-0.1-0.1-0.2-0.2-0.3C6.1,8.6,6.1,8.5,6,8.4c0-0.1-0.1-0.1-0.3-0.2C5.6,8.1,5.5,8,5.5,8 c0,0-0.1-0.1-0.3-0.2C5,7.7,4.9,7.6,4.9,7.6c-0.1,0-0.2,0-0.3,0c-0.3,0-0.5,0-0.8,0.1S3.3,7.7,3,7.8C2.8,7.9,2.5,8,2.3,8.1 C2.1,8.3,2,8.4,1.8,8.7C1.7,8.9,1.6,9.1,1.6,9.4c0,0.3,0.1,0.6,0.3,0.9c0.2,0.3,0.4,0.5,0.7,0.6c0.3,0.1,0.6,0.2,0.9,0.3 S4,11.3,4.3,11.3z M4.3,5c0.2,0,0.4,0,0.6-0.1c0.2-0.1,0.3-0.2,0.5-0.3C5.6,4.3,5.7,4,5.7,3.5c0-0.3,0-0.6-0.1-0.9 C5.5,2.2,5.4,1.9,5.3,1.6C5.1,1.3,4.9,1.1,4.7,0.9S4.1,0.6,3.8,0.6c-0.2,0-0.4,0-0.6,0.1C3,0.8,2.9,1,2.7,1.1 C2.5,1.4,2.4,1.8,2.4,2.3c0,0.2,0,0.5,0.1,0.7c0,0.2,0.1,0.5,0.2,0.7C2.8,4,2.9,4.2,3.1,4.4c0.1,0.2,0.3,0.4,0.5,0.5 C3.8,5,4.1,5,4.3,5z M10.2,5h1.5v0.8h-1.5v1.6H9.4V5.8H7.9V5h1.5V3.5h0.8V5z"></path>
      </svg>
    );
  }

});

const ArrowUp = React.createClass({
  getDefaultProps() {
    return {
      size:16
    };
  },

  render() {
    var size=this.props.size;
    var color = this.props.color||this.props.light_color;
    return (
      <svg viewBox="0 0 100 65" width={`${size}px`} height={`${size}px`} className="svg-icon svg-icon-arrow-up">
        <path fill={color} d="M0,49.9567996 L15.07,65 L50,30.1164331 L84.928,65 L100,49.9578007 L50,-7.10542736e-15 L0,49.9567996 Z"></path>
      </svg>
    );
  }

});

const ArrowDown = React.createClass({
  getDefaultProps() {
    return {
      size:16
    };
  },

  render() {
    var size=this.props.size;
    var color = this.props.color||this.props.light_color;
    return (
      <svg viewBox="0 0 100 65" width={`${size}px`} height={`${size}px`} className="svg-icon svg-icon-arrow-down">
        <path fill={color} d="M100,15.0432004 L84.93,-1.42108547e-14 L50,34.8835669 L15.072,0 L2.84217094e-14,15.0421993 L50,65 L100,15.0432004 L100,15.0432004 Z"></path>
      </svg>
    );
  }

});

const Check = React.createClass({
  getDefaultProps() {
    return {
      size:16
    };
  },

  render() {
    var size=this.props.size;
    var color = this.props.color||this.props.light_color;
    return (
      <svg viewBox="0 0 32 26" width={`${size}px`} height={`${size}px`} className="svg-icon svg-icon-check">
        <path fill={color} d="M27.5556966,1.77206299e-15 L25.4600171,2.18271112 L10.8573061,17.3958485 L6.47598489,13.093274 L4.31732326,10.9734106 L-1.77635684e-15,15.2131374 L2.15866163,17.3330008 L8.76162662,23.8172889 L10.9842862,26 L13.1429478,23.7554387 L29.9043205,6.29774009 L32,4.11502897 L27.5556966,0 L27.5556966,1.77206299e-15 Z"></path>
      </svg>
    );
  }

});



module.exports = {Heart, Share, Star, Spinner, Facebook, Twitter, Google, ArrowUp, ArrowDown, Check}
