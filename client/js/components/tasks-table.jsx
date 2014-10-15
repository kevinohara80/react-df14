var React = require('react');
var App   = require('../app/tasks-app');

var TasksTableRow = require('./tasks-table-row.jsx');

var TasksTable = React.createClass({

  getRows: function() {
    
    var rows = [];
    
    if(this.props.tasks && this.props.tasks.length > 0) {
      this.props.tasks.forEach(function(t, idx) {
        /* jshint ignore:start */
        rows.push(<TasksTableRow key={idx} index={idx} task={t} />);
        /* jshint ignore:end */
      });
    }

    return rows;
  },

  newTask: function() {
    App.addTask();
  },

  render: function() {

    var rows = this.getRows();

    return(
      /* jshint ignore:start */
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">
              <button type="button" onClick={this.newTask} className="btn btn-success btn-xs">
                <span className="glyphicon glyphicon-plus"></span> New Task
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
      /* jshint ignore:end */
    );

  }
});

module.exports = TasksTable;