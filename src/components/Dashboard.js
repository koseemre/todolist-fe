import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTasks, addTask, updateTask, deleteTask } from "../actions/taskActions"
import TaskDetail from './Task/TaskDetail';
import TaskList from './Task/TaskList';
import AddTask from './Task/AddTask';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTask: null,
      addTaskForm: false
    };
  }

  componentDidMount() {
    const userId = this.props.security.user.id;
    console.log(userId);
    this.props.getTasks(userId);
  }

  // add buttonuna tıklandığında tetiklenir
  handleAddClick = () => {
    console.log("handleAddClick");
    this.setState({ addTaskForm: true, selectedTask: null });
  }

  /* runItWhenUserSubmitForm ı child(AddTask) to parent(Dashboard) bir listener olarak düşünebiliriz,
     buradan AddTask a verdiğimiz runItWhenUserSubmitForm prop u dinlenir,
     AddTask tarafında bu prop fonksiyonu çalıştırıldığında, burada whenFormSubmit() fonksiyonu
     tetiklenir ve bu prop fonksiyonundan gelen task objesi için kaydeyme işlemi başlatılır.
  */
  getTaskAddFrame = () => {
    if (this.state.addTaskForm === true) {
      console.log("getTaskAddFrame");
      return (<AddTask runItWhenUserSubmitForm={this.whenFormSubmit} />);
    }
    else
      return null;
  }

  whenFormSubmit = async (taskDetail) => {
    const userId = this.props.security.user.id;
    console.log("whenFormSubmit");
    console.log(userId);
    console.log(taskDetail);
    this.props.addTask(userId, taskDetail);
    this.setState({ addTaskForm: false });
  }

  getSelectedTask = () => {
    if (this.state.selectedTask !== null) {
      console.log("getSelectedTask");
      console.log(this.state.selectedTask);
      return (<TaskDetail task={this.state.selectedTask} runItWhenUserUpdateForm={this.whenFormUpdate} />);
    }
    else
      return null;
  }

  /* Executed when clicked to any Task in TaskList.
  Invoked firstly with execution in TaskCard then TaskList then there.
  TaskCard -> TaskList -> Dashboard (same event handler) 
  After that process getSelectedTask() function becomes active in render()
  due to return value of getSelectedTask() is not null anymore.  */
  onTaskSelect = task => {
    console.log("onTaskSelect");
    console.log(task);
    this.setState({ selectedTask: task, addTaskForm: false });
  };

  whenFormUpdate = async (taskDetail, taskId) => {

    console.log(taskDetail);
    console.log(taskId);
    const userId = this.props.security.user.id;
    this.props.updateTask(taskId, taskDetail, userId);;
    this.setState({ selectedTask: null, addTaskForm: false });
  }

  onTaskDelete = async (taskId) => {
    const userId = this.props.security.user.id;
    this.props.deleteTask(taskId, userId);
    this.setState({ selectedTask: null, addTaskForm: false });
  }

  getForm() {
    console.log(this.state.selectedTask)
    if (this.state.selectedTask !== null) {
      return this.getSelectedTask();
    } else {
      return this.getTaskAddFrame();
    }
  }
  render() {

    const { user } = this.props.security;
    const { isLoading, tasks } = this.props.taskInfo;

    console.log(this.props.taskInfo);
    console.log(this.state.selectedTask);
    console.log(tasks);

    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (

      <div>
        <h2>
          Welcome {user.name}
        </h2>
        <button className="fluid ui button" onClick={this.handleAddClick}>Add To Do </button>

        <button className="circular ui icon button">
          <i className="icon settings"></i>
        </button>

        <div className="ui container">
          <div className="ui grid">
            <div className="ui row">
              <div className="eleven wide column">
                {this.getForm()}
              </div>

              <div className="five wide column">
                <TaskList
                  onTaskSelect={this.onTaskSelect}
                  taskList={tasks}
                  onTaskDelete={this.onTaskDelete}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  taskInfo: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
  getTasks: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  taskInfo: state.taskInfo,
  security: state.security
});

export default connect(
  // reducer sonrası değişen stateleri, proplara atar
  mapStateToProps,
  // bloktaki action(lar)ı, component e prop olarak atar 
  { getTasks, addTask, updateTask, deleteTask }
)(Dashboard);