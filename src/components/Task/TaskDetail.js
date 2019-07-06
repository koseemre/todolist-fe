import React from 'react';
import DatePicker from 'react-datepicker';
import { Checkbox } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';
import { Priority_Options } from '../util/TaskDetailUtil'


class TaskDetail extends React.Component {

  constructor(props) {

    super(props);
    console.log("update in constructor");
    console.log(this.props);
    this.state = {
      date: new Date(props.task.dueDate),
      autoreminder: props.task.autoreminder,
      priority: props.task.priority,
      taskContent: props.task.taskContent,
      taskId: props.task.id
    };

    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleToggleChange = this.handleToggleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /* Bu fonksiyon, component oluştuktan sonra, bu component a yeni propların
  atanması halinde, component ın güncellenmesinde kullanılabilecek yeni state veya
  propların kullanımını sağlar   */
  /* componentWillReceiveProps() fonksiyonu uygulamada listeden seçilen taskın,
  taskDetail componentında değişimini sağlamaktadır */
  componentWillReceiveProps(nextProps) {
    console.log("update in nextProps");
    console.log(nextProps);
    this.setState({
      date: new Date(nextProps.task.dueDate),
      autoreminder: nextProps.task.autoreminder,
      priority: nextProps.task.priority,
      taskContent: nextProps.task.taskContent,
      taskId: nextProps.task.id
    });
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
    this.setState({ date: comingDate });
  }

  handleContentChange(newContent) {
    this.setState({ taskContent: newContent.data });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    //console.log(data.get('task-content'));
    this.props.runItWhenUserUpdateForm({
      "autoreminder": this.state.autoreminder,
      "dueDate": this.state.date,
      "priority": this.state.priority,
      "taskContent": data.get('task-content'),
      "customreminder": this.state.date
    }, this.state.taskId);
  }

  render() {

    console.log("rerender");
    console.log(this.state);
    return (
      <div>
        <h2>Update Task</h2>
        <form onSubmit={this.handleSubmit} className="ui form">
          <div className="field">
            <label>Note to Task</label>
            <input id="taskcontent"
              type="text"
              name="task-content"
              value={this.state.taskContent}
              //placeholder={this.state.taskContent}
              onChange={this.handleContentChange}
            />
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
              //dateFormat="MMMM d, yyyy h:mm aa"
              dateFormat="yyyy-MM-dd HH:mm:ss.SS"
              withPortal

            />
          </div>
          <br />
          <br />
          <div className="inline field">
            <Checkbox toggle
              onChange={this.handleToggleChange}
              // defaultChecked={this.state.autoreminder}
              checked={this.state.autoreminder}
            />
            <label>Auto Reminder</label>
          </div>
          <br />
          <div className="field">
            <label>Priority</label>
            <Dropdown
              placeholder={this.priority}
              options={Priority_Options}
              onChange={this.handlePriorityChange}
              text={this.state.priority}
              value={this.state.priority}
            />
          </div>

          <button className="ui button">Update the Task</button>
        </form>

      </div>

    );
  }
}

export default TaskDetail;