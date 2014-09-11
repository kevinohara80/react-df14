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

  /* crud */

  addTask: function() {

    var t = new SObjectModel.task({
      Subject: 'New Task',
      Status: 'Not Started',
      WhatId: window.accountId
    });
    
    tasks.push(t);

    this.emit('status:change');
  },

  updateTaskValue: function(id, field, value) {
    tasks[id].set(field, value);
  },

  saveTask: function(id) {
    var self = this;

    var task = tasks[id];

    if(task.get('Id')) {
      console.log('updating task...');
      task.update({
        Id: task.get('Id'),
        Status: task.get('Status'),
        Subject: task.get('Subject')
      }, function(err) {
        if(err) {
          console.error(err);
          self.loadTasks();
        } else {
          // nothing, it worked
        }
      });
    } else {
      console.log('creating task...');
      task.create(function(err, rec) {
        if(err) {
          console.error(err);
          self.loadTasks();
        } else {
          // nothing, it worked
          self.emit('status:change');
        }
      });
    }
    
  },

  deleteTask: function(id) {
    var self = this;
    var task = tasks.splice(id, 1)[0];

    this.emit('status:change');

    if(task.get('Id')) {
      task.del(function(err) {
        if(err) {
          console.error(err);
          // reload the tasks if it fails
          self.loadTasks();
        }
      });
    }
  },

  /* querying */

  getQuery: function() {
    var query = {
      where: {
        WhatId: { eq: window.accountId }
      },
      orderby: [
        { CreatedDate: 'ASC' }
      ],
      limit: 10
    };
    return query;
  },
  
  loadTasks: function() {
    var self = this;
    this.changeStatus('loading');

    Task.retrieve(this.getQuery(), function(err, records, event) {
      if(err) return console.error(err);
      console.log(records);
      tasks = records;
      self.changeStatus('ready');
    });
  },

  /* main start function */

  start: function() {
    this.loadTasks();
  }

});

module.exports = window.TaskApp = TaskApp;