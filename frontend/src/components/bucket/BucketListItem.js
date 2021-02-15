import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BucketListItem = ({ bucket }) => {
    return (
        <li className="task-list-item" key={bucket.id}>
            <label className="checkbox">
                <input
                    type="checkbox"
                />
                <span className="checkbox-mark">&#10003;</span>
            </label>
            <Link to={`/bucket/${bucket._id}/todos`}>
                <div className="task-list-item-title">{bucket.title}</div>
            </Link>
            <button
                className="task-list-item-delete"
            >
                &times;
      </button>
        </li >
    )
}

BucketListItem.propTypes = {
    bucket: PropTypes.object
};

export default BucketListItem
