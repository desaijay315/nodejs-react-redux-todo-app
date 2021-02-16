import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filteredTodo } from '../../actions/Todos'

const TodoFilter = ({ filteredTodo, bucketid }) => {
    const handleClick = (e, filter) => {
        filteredTodo(filter, bucketid)
    }
    return (
        <ul className="task-filter">
            <li>
                <button className='task-filter-active' onClick={(e) => handleClick(e, 'all')}>All</button>
            </li>
            <li>
                <button className='task-filter-active' onClick={(e) => handleClick(e, 'active')}>Active</button>
            </li>
            <li>
                <button className='task-filter-active' onClick={(e) => handleClick(e, 'completed')}>Completed</button>
            </li>
        </ul>
    )
}

TodoFilter.propTypes = {
    filteredTodo: PropTypes.func.isRequired,
    bucketid: PropTypes.string.isRequired
};

export default connect(
    '',
    { filteredTodo }
)(TodoFilter);
