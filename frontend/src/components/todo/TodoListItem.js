import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeStatus, deleteTodo } from '../../actions/Todos'

const TodoListItem = ({ changeStatus, deleteTodo, todo }) => {
    const [checked, setChecked] = React.useState(todo.completed);

    const handleDeleteClick = (id) => {
        deleteTodo(id);
    }
    return (
        <li className="task-list-item" key={todo._id}>
            <label className="checkbox">
                <input
                    onChange={(e) => {
                        setChecked(e.target.checked)
                        changeStatus(e.target.checked, todo._id);
                    }}
                    checked={checked}
                    type="checkbox"
                />

                <span className="checkbox-mark">&#10003;</span>
            </label>
            <Link to={`/todo/${todo._id}`}>
                <div className="task-list-item-title">{todo.title}</div>
            </Link>
            <button
                onClick={() => handleDeleteClick(todo._id)}
                className="task-list-item-delete"
            >
                &times;
      </button>
        </li >
    )
}

TodoListItem.propTypes = {
    changeStatus: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    todo: PropTypes.object
};
export default connect(
    '',
    { changeStatus, deleteTodo }
)(TodoListItem);