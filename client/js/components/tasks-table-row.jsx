var React = require('react');
var App   = require('../app/tasks-app');

var TasksTableRow = React.createClass({

  getInitialState: function() {
    return {
      editing: false
    };
  },

  componentWillMount: function() {
    this.setState({
      status: this.props.task.get('Status'),
      subject: this.props.task.get('Subject')
    });
  },

  /* button action handlers */

  editTask: function() {
    this.setState({ editing: true });
  },

  saveTask: function() {
    this.setState({ editing: false });
    App.saveTask(this.props.index);
  },

  deleteTask: function() {
    console.log('deleting ' + this.props.index);
    App.deleteTask(this.props.index);
  },

  isNew: function() {
    return (typeof this.props.task.get('Id') === 'undefined'); 
  },

  onSubjectChange: function(event) {
    this.setState({ subject: event.target.value });
    App.updateTaskValue(this.props.index, 'Subject', event.target.value);
  },

  onStatusChange: function(event) {
    this.setState({ status: event.target.value });
    App.updateTaskValue(this.props.index, 'Status', event.target.value);
  },

  getSubjectTd: function() {
    if(this.state.editing || this.isNew()) {
      /* jshint ignore:start */
      return (
        <td><input type="text" onChange={this.onSubjectChange} value={this.state.subject} /></td>
      );
      /* jshint ignore:end */
    } else {
      /* jshint ignore:start */
      return (
        <td>{this.state.subject}</td>
      );
      /* jshint ignore:end */
    }
  },

  getStatusTd: function() {
    if(this.state.editing || this.isNew()) {
      /* jshint ignore:start */
      return (
        <td>
          <select multiple={false} onChange={this.onStatusChange} value={this.state.status}>
            <option value="Not Started">Not Started</option>
            <option value="Completed">Completed</option>
          </select>
        </td>
      );
      /* jshint ignore:end */
    } else {
      /* jshint ignore:start */
      return (
        <td>{this.state.status}</td>
      );
      /* jshint ignore:end */
    }
  },

  getActionTd: function() {
    if(this.state.editing || this.isNew()) {
      /* jshint ignore:start */
      return (
        <td>
          <button type="button" onClick={this.saveTask} className="btn btn-success btn-xs">
            <span className="glyphicon glyphicon-check"></span> OK
          </button>
        </td>
      );
      /* jshint ignore:end */
    } else {
      /* jshint ignore:start */
      return (
        <td>
          <button type="button" onClick={this.editTask} className="btn btn-info btn-xs">
            <span className="glyphicon glyphicon-pencil"></span> Edit
          </button>
          <button type="button" onClick={this.deleteTask} className="btn btn-danger btn-xs">
            <span className="glyphicon glyphicon-remove"></span> Delete
          </button>
        </td>
      );
      /* jshint ignore:end */
    }
  },

  render: function() {

    return (
      /* jshint ignore:start */
      <tr>
        {this.getSubjectTd()}
        {this.getStatusTd()}
        {this.getActionTd()}
      </tr>
      /* jshint ignore: end */
    );
  }

});

module.exports = TasksTableRow;