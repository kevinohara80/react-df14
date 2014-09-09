var React = require('react');
var main  = require('./components/main.jsx')();

// start renderinf the app
React.renderComponent(main, document.getElementById('main'));

var a = new SObjectModel.Account();

a.retrieve({ limit: 10 }, function(err, records, event) {
  if(err) return console.error(err);
  console.log(records);
  main.setState({ loading: false });
});


