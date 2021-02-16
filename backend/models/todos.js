const mongoose = require('mongoose');


const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    bucketId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Bucket'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    }
});


const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo