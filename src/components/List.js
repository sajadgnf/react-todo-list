import React from 'react';

// styles
import styles from "./List.module.css"

const Card = ({ todo, setTodos, todos }) => {

    const removeHandler = () => {
        setTodos(todos.filter(el => el.id !== todo.id))
    }

    const doneHandler = () => {
        setTodos(todos.map(item => {
            if (item.id === todo.id) {
                return { ...item, completed: !item.completed }
            }
            return item
        }))
    }


    return (
        <div className={styles.todoContainer}>
            <li className={`${styles.todoItem} ${todo.completed ? styles.complete : ""}`}>{todo.text}</li>

            <div className={styles.buttonsContainer}>
                <button className={styles.doneButton} onClick={doneHandler}><i className="fas fa-check"></i></button>
                <button className={styles.clearButton} onClick={removeHandler}><i className="fas fa-trash"></i></button>
            </div>
        </div>
    );
};

export default Card;