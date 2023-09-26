import React, { useState } from 'react';
import styles from './Header.module.css'

// Assets
import { FiPlusCircle } from 'react-icons/fi'
import logo from '../../assets/taskify-logo.svg';

const Header = ({ onAddTask }) => {

    const [title, setTitle] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        title.trim() !== '' && onAddTask(title);
        setTitle('');
    }

    function onChangeTitle(event) {
        setTitle(event.target.value);
    }

    return (
        <div className={styles.header}>
            <img src={logo} alt="" className={styles.logo} />

            <form className={styles.newTaskForm} onSubmit={handleSubmit}>
                <input type="text" placeholder='Add a new Task...' onChange={onChangeTitle} value={title} />
                <button><FiPlusCircle size={20} />Create</button>
            </form>
        </div>
    );
};

export default Header;