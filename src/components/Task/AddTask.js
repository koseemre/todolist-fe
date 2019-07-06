import React from 'react';

import DatePicker from 'react-datepicker';
import { Checkbox } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';
import task_api from '../../api/task';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Priority_Options } from '../util/TaskDetailUtil'

class AddTask extends React.Component {

  constructor(props) {

    super(props);
    console.log(props);
    this.state = {
      date: new Date(),
      autoreminder: false,
      priority: ''
    };

    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleToggleChange = this.handleToggleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePriorityChange(event) {
    const data = new Dropdown(event.target);
    console.log(data);
    console.log(data.props.innerText);
    this.setState({ priority: data.props.innerText });
  }

  handleToggleChange(event) {
    this.setState({ autoreminder: !this.state.autoreminder });
    console.log(event);
  }

  handleDateChange(comingDate) {
    console.log("date change");
    this.setState({ date: comingDate });
  }

  handleSubmit = (event) => {

    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data.get('task-content'));

    this.props.runItWhenUserSubmitForm({
      "dueDate": this.state.date,
      "priority": this.state.priority,
      "autoreminder": this.state.autoreminder,
      "taskContent": data.get('task-content'),
      "customreminder": this.state.date
    });

  }

  render() {
    console.log("AddTask");
    const autoreminder = this.state.autoreminder
    return (
      <div>
        <h2>Add Task</h2>
        <form onSubmit={this.handleSubmit} className="ui form">
          <div className="field">
            <label>Note to Task</label>
            <input id="taskcontent" type="text" name="task-content" placeholder="Note" />
          </div>
          <div>
            <label>Due Date</label>
            <DatePicker
              selected={this.state.date}
              //only when value has changed
              onChange={this.handleDateChange}
              //when day is clicked
              //onSelect={this.handleDateSelect}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={5}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              withPortal
            />
          </div>
          <br />
          <br />
          <div className="inline field">
            <Checkbox toggle
              onChange={this.handleToggleChange}
            />
            <label>Auto Reminder</label>
          </div>
          <br />
          <div className="field">
            <label>Priority</label>
            <Dropdown
              placeholder='Select Priority'
              options={Priority_Options}
              onChange={this.handlePriorityChange}
              text={this.state.priority}
            />
          </div>

          <button className="ui button">Add the Task</button>
        </form>

      </div>

    );
  }
}

export default AddTask;