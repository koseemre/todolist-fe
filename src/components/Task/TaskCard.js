import React from 'react';

class TaskCard extends React.Component {

  render() {

    //if we use functions or objects below, the related props will be used. (prop -> const)
    const { task, onTaskSelect, taskId, onTaskDelete } = this.props;
    console.log(taskId);
    /*
    this.onTaskSelect is listened in the TaskList.js and if it is executed there, 
    then it will be invoked in the TaskList. For one more step depth,
    this is listened in the Dashboard.js file. This means with execution of
    onTaskSelect in there will cause to invocation of onTaskSelect in Dashboard component. */
    console.log("TaskCard");
    return (
      <div className="task-item item">
        <div className="ui card">
          <div onClick={() => onTaskSelect(task)} className="content">
            <div className="header">Priority: {task.priority}</div>

            <div className="content">
              <h4 className="ui sub header">Task Type+</h4>
              <div className="ui small feed">
                <div className="event">
                  <div className="content">
                    <div className="summary">
                      <a>Due Date: </a> {task.dueDate} <br />
                      <a>Content:  </a> {task.taskContent} <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="extra content">
            <button className="negative ui button" onClick={() => onTaskDelete(taskId)} >Delete Task</button>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskCard;