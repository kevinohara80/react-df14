var React = require('react');
var main  = require('./components/main.jsx');
var app   = require('./app/tasks-app');

// start renderinf the app
React.renderComponent(main(), document.getElementById('main'));

app.start();