import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTodo } from '../../actions/Todos'
import UpdateTodoForm from '../Forms/UpdateTodoForm';

const Todo = ({ getTodo, todo, match }) => {
    React.useEffect(() => {
        getTodo(match.params.id);
    }, [getTodo, match.params.id]);

    if (!todo) {
        return <p>There are no todos here</p>
    }
    return (
        <div className="page">
            <UpdateTodoForm todo={todo} history={match.history} />
        </div>
    )
}

Todo.propTypes = {
    getTodo: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    todo: state.todo
});

export default connect(
    mapStateToProps,
    { getTodo }
)(Todo);