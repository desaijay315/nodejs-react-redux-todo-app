const express = require('express');
const router = new express.Router();
const Bucket = require('../models/bucket')
const Todos = require('../models/todos')
const { ObjectID } = require('mongodb')


//get all the buckets lists
router.get('/bucket', async (req, res) => {
    try {
        const buckets = await Bucket.find({})
        res.send(buckets)
    } catch (error) {
        res.status(500).send()
    }
})

//get all the todos related to the bucket id
router.get('/bucket/:id/todos', async (req, res) => {
    try {
        const bucket = await Bucket.findOne({ _id: req.params.id })
        await bucket.populate('todos').execPopulate()
        res.send(bucket.todos)
    } catch (error) {
        res.status(500).send()
    }
})

//create the new bucket
router.post('/bucket', async (req, res) => {
    const bucket = new Bucket({
        ...req.body
    })
    try {
        await bucket.save()
        res.status(201).send(bucket)
    } catch (error) {
        res.status(400).send(error)
    }
})

//create the new todo
router.post('/bucket/:id/todo', async (req, res) => {
    const _id = req.params.id

    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }

    const todo = new Todos({
        ...req.body,
        bucketId: _id
    })

    try {
        await todo.save()
        res.status(201).send(todo)
    } catch (error) {
        res.status(400).send(error)
    }

})


module.exports = router
