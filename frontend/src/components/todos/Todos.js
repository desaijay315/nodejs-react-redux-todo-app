import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTodos } from '../../actions/Todos';
import TodoListItem from '../todo/TodoListItem';
import CreateTodoForm from '../Forms/CreateTodoForm';
import TodoFilter from '../todo/TodoFilter';


const Todos = ({ getTodos, todos, match }) => {

    React.useEffect(() => {
        getTodos(match.params.id);
    }, [getTodos, match.params.id]);

    return (
        <div className="page">
            <CreateTodoForm bucketid={match.params.id} />
            <ul className="task-list">
                {todos.map(todo => {
                    return <TodoListItem key={todo._id} todo={todo} />
                })}
            </ul>
            <TodoFilter bucketid={match.params.id} />
        </div>
    )
}
Todos.propTypes = {
    getTodos: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    todos: state.todos
});

export default connect(
    mapStateToProps,
    { getTodos }
)(Todos);
