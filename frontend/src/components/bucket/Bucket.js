import React from 'react'
import CreateBucketForm from '../Forms/CreateBucketForm'
import BucketList from './BucketList'

const Bucket = () => {
    return (
        <div className="page">
            <CreateBucketForm />
            <BucketList />
        </div>
    )
}

export default Bucket
