import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ taskList, onTaskSelect, onTaskDelete }) => {
    console.log(taskList);
    if (taskList) {
        const renderList = taskList.map(task => {
            return (
                <TaskCard
                    key={task.id}
                    taskId={task.id}
                    onTaskSelect={onTaskSelect}
                    task={task.taskDetail}
                    onTaskDelete={onTaskDelete}
                />);
        });
        return <div className="ui relaxed divided list"> {renderList} </div>;
    }
    else
        return null;

}

export default TaskList;