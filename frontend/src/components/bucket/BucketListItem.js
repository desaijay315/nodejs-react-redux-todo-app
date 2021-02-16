import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteBucket } from '../../actions/Todos'

const BucketListItem = ({ deleteBucket, bucket }) => {

    const handleDeleteClick = (e, bucketid) => {

        alert("Are you sure you want to delete the bucket? Deleting the Bucket will also delete Todos");
        deleteBucket(bucketid)
    }
    return (
        <li className="task-list-item" key={bucket.id}>
            <Link to={`/bucket/${bucket._id}/todos`}>
                <div className="task-list-item-title">{bucket.title}</div>
            </Link>
            <button
                className="task-list-item-delete"
                onClick={(e) => handleDeleteClick(e, bucket._id)}
            >
                &times;
      </button>
        </li >
    )
}

BucketListItem.propTypes = {
    deleteBucket: PropTypes.func.isRequired,
    bucket: PropTypes.object
};

export default connect(
    '',
    { deleteBucket }
)(BucketListItem);
