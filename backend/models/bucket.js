const mongoose = require('mongoose');
const Todos = require('./todos')

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

BucketSchema.post('findOneAndDelete', async function () {
    const bucket = this
    await Todos.deleteMany({ bucketId: bucket._id }).exec()
})

const Bucket = mongoose.model('Bucket', BucketSchema);

module.exports = Bucket