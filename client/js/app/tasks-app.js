// module dependencies
var EventEmitter = require('events').EventEmitter;
var merge        = require('react/lib/merge');

// our remote objects
var Account = new SObjectModel.account();
var Task    = new SObjectModel.task();

// tasks cache
var tasks = [];

// initial status
var status = 'loading';

var TaskApp = merge(EventEmitter.prototype, {

  getStatus: function() {
    return status;
  },

  getTasks: function() {
    return tasks;
  },

  changeStatus: function(newStatus) {
    if(newStatus !== status) {
      status = newStatus;
      this.emit('status:change', newStatus);
    }
  },

  addStatusChangeListener: function(callback) {
    this.on('status:change', callback);
  },

  removeStatusChangeListener: function(callback) {
    this.removeListener('status:change', callback);
  },
  
  loadTasks: function() {
    var self = this;
    this.changeStatus('loading');
    Task.retrieve({ limit: 10 }, function(err, records, event) {
      if(err) return console.error(err);
      console.log(records);
      tasks = records;
      self.emit('tasks:loaded');
      self.changeStatus('ready');
    });
  },

  start: function() {
    this.loadTasks();
  }

});

module.exports = TaskApp;