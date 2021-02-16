import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addTodo } from '../../actions/Todos';


const CreateTodoForm = ({ addTodo, bucketid }) => {
    console.log(bucketid)
    const [title, setTitle] = React.useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) {
            alert("Please enter the text")
            return;
        }
        addTodo(title, bucketid)
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
                    value={title}
                    onChange={handleChange}
                />
            </form>
        </>
    )
}

CreateTodoForm.propTypes = {
    addTodo: PropTypes.func.isRequired,
    bucketid: PropTypes.string.isRequired
};


export default connect('', { addTodo })(CreateTodoForm);