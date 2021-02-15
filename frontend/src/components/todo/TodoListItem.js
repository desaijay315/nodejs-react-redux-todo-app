import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TodoListItem = ({ todo }) => {
    return (
        <li className="task-list-item" key={todo.id}>
            <label className="checkbox">
                <input
                    type="checkbox"
                />
                <span className="checkbox-mark">&#10003;</span>
            </label>
            <Link to={`/todo/${todo._id}`}>
                <div className="task-list-item-title">{todo.title}</div>
            </Link>
            <button
                className="task-list-item-delete"
            >
                &times;
      </button>
        </li >
    )
}

TodoListItem.propTypes = {
    todo: PropTypes.object
};

export default TodoListItem
