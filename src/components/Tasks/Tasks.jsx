import React from 'react';
import styles from './Tasks.module.css'
import Task from '../Task/Task';


const Tasks = ({ tasks, onComplete, onDelete }) => {

    const tasksQuantity = tasks.length;
    const completedTasks = tasks.filter(task => task.isCompleted).length;

    return (
        <section className={styles.tasks}>
            <header className={styles.header}>
                <div>
                    <p>Created Tasks</p>
                    <span>{tasksQuantity}</span>
                </div>
                <div>
                    <p className={styles.textPurple}>Completed</p>
                    <span>{completedTasks} of {tasksQuantity}</span>
                </div>
            </header>

            {tasks.map(task => (
                <Task key={task.id} task={task} onComplete={onComplete} onDelete={onDelete} />
            ))}
        </section>
    );
};

export default Tasks;