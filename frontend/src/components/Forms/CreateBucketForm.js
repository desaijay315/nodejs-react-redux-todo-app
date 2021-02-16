import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBucket } from '../../actions/Todos';


const CreateBucketForm = ({ addBucket }) => {
    const [title, setTitle] = React.useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) {
            alert("Please enter the text")
            return;
        }
        addBucket(title)
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
                    placeholder="Create your bucket?"
                    label='Title'
                    value={title}
                    onChange={handleChange}
                />
            </form>
        </>
    )
}

CreateBucketForm.propTypes = {
    addBucket: PropTypes.func.isRequired
};


export default connect('', { addBucket })(CreateBucketForm);