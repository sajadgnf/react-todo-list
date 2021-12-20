import React, { useState, useEffect } from "react"

// component
import List from "./List"

// styles
import styles from "./Todo.module.css"

const Todo = () => {

    // states
    const [inputText, setInputText] = useState("")
    const [todos, setTodos] = useState([])
    const [status, setStatus] = useState("all")
    const [filterTodo, setFilterTodo] = useState([])

    // useEffect
    useEffect(() => {
        getLocalTodos()
    }, [])

    useEffect(() => {
        filterHandler()
        saveLocalTodos()
    }, [status, todos])


    // functions
    const valueHandler = event => {
        setInputText(event.target.value)
    }

    const stautsHandler = event => {
        setStatus(event.target.value)
    }

    const submitHandler = event => {

        event.preventDefault()

        setTodos([
            ...todos, { text: inputText, completed: false, id: Math.random() * 1000 }
        ])

        setInputText('')
    }

    const filterHandler = () => {

        switch (status) {
            case "completed":
                setFilterTodo(todos.filter(item => item.completed == true))
                break
            case "uncompleted":
                setFilterTodo(todos.filter(item => item.completed == false))
                break
            default:
                setFilterTodo(todos)
                break
        }
    }

    const saveLocalTodos = () => {
        localStorage.setItem("todos", JSON.stringify((todos)))
    }

    const getLocalTodos = () => {
        if (localStorage.getItem("todos") === null) {
            localStorage.setItem("todos", JSON.stringify([]))
        } else {
            let todoLocal = JSON.parse(localStorage.getItem("todos"))
            setTodos(todoLocal)
        }
    }

    return (
        <div className={styles.container}>
            <h1>Todo List</h1>

            <form className={styles.formContainer}>
                <input type='text' value={inputText} onChange={valueHandler} />
                <button onClick={submitHandler}><i className="fas fa-plus-square"></i></button>
                <div className={styles.selectContainer}>
                    <select className={styles.filterTodo} value={status} onChange={stautsHandler}>
                        <option value='all'>All</option>
                        <option value="completed">completed</option>
                        <option value="uncompleted">uncompleted</option>
                    </select>
                </div>
            </form>

            <ul>
                {filterTodo.map(item => <List
                    key={item.id}
                    todo={item}
                    todos={todos}
                    setTodos={setTodos}
                    status={status}
                    filterTodo={filterTodo}
                    setFilterTodo={setFilterTodo}
                />)}
            </ul>
        </div>
    )
}

export default Todo