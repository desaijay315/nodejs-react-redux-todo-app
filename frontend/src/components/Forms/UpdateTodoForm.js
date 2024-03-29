import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { updateTodo } from '../../actions/Todos';


const UpdateTodoForm = ({ updateTodo, todo, history }) => {
    const [title, setTitle] = React.useState(todo.title)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title && !todo.title) {
            alert("Please enter the text")
            return;
        }
        updateTodo(title, todo._id, history)
        setTitle("")
    }

    const handleChange = (e) => {
        setTitle(e.target.value)
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    className="text-input new-task-text-input"
                    autoComplete="off"
                    name='title'
                    placeholder="What would you like to get done?"
                    label='Title'
                    defaultValue={todo.title}
                    onChange={handleChange}
                />
                <p>
                    <button type="submit" className="button">Save</button>
                </p>
            </form>
        </>
    )
}

UpdateTodoForm.propTypes = {
    updateTodo: PropTypes.func.isRequired,
    todo: PropTypes.object
};


export default connect('', { updateTodo })(withRouter(UpdateTodoForm));