const mongoose = require('mongoose');

const BucketSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

BucketSchema.virtual('todos', {
    ref: 'Todo',
    localField: '_id',
    foreignField: 'bucketId'
})

const Post = mongoose.model('Bucket', BucketSchema);

module.exports = Post