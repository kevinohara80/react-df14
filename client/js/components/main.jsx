var React = require('react');

var MainComponent = React.createClass({

  getInitialState: function() {
    return {
      loading: true
    };
  },

  getContent: function() {
    if(this.state.loading) {
      /* jshint ignore:start */
      return (
        <p>Loading...</p>
      );
      /* jshint ignore:end */
    } else {
      /* jshint ignore:start */
      return (
        <p>Done!</p>
      );
      /* jshint ignore:end */
    }
  },

  render: function() {

    var content = this.getContent();

    /* jshint ignore:start */
    return (
      <div class=".col-md-12">
        {content}
      </div>
    );
    /* jshint ignore:end */
  }
});

module.exports = MainComponent;