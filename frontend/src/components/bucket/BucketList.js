import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getBucket } from '../../actions/Todos';
import BucketListItem from './BucketListItem';

const BucketList = ({ getBucket, buckets }) => {
    React.useEffect(() => {
        getBucket();
    }, [getBucket]);
    return (
        <ul className="task-list">
            {buckets.map(bucket => {
                return <BucketListItem key={bucket._id} bucket={bucket} />
            })}
        </ul>
    )
}

BucketList.propTypes = {
    getBucket: PropTypes.func.isRequired,
    buckets: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    buckets: state.buckets
});

export default connect(
    mapStateToProps,
    { getBucket }
)(BucketList);
