const express = require('express');
const router = new express.Router();
const Bucket = require('../models/bucket')
const Todos = require('../models/todos')
const { ObjectID } = require('mongodb')


//get all the buckets lists
router.get('/buckets', async (req, res) => {
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

//single todo
router.get('/todo/:id', async (req, res) => {
    try {
        const todo = await Todos.findOne({ _id: req.params.id })
        res.send(todo)
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/todo/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body);
    const allowedUpdates = ["title"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid updates' })
    }
    if (!ObjectID.isValid(_id)) {
        res.status(404).send();
    }
    try {
        const post = await Todos.findOne({ _id: req.params.id })

        if (!post) {
            res.status(404).send();
        }

        updates.forEach((update) => post[update] = req.body[update])
        await post.save()

        res.send(post);
    } catch (error) {
        res.status(400).send();
    }
})


router.patch('/todo/status/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body);
    const allowedUpdates = ["completed"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid updates' })
    }
    if (!ObjectID.isValid(_id)) {
        res.status(404).send();
    }
    try {
        const post = await Todos.findOne({ _id: req.params.id })

        if (!post) {
            res.status(404).send();
        }

        updates.forEach((update) => post[update] = req.body[update])
        await post.save()

        res.send(post);
    } catch (error) {
        res.status(400).send();
    }
})

router.delete('/todo/:id', async (req, res) => {
    const _id = req.params.id
    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }
    try {
        const deletepost = await Todos.findOneAndDelete({ _id: _id })
        if (!deletepost) {
            return res.status(404).send();
        }
        res.send(deletepost)
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/bucket/filter/:id/todos', async (req, res) => {
    const _id = req.params.id;
    const filter = req.body.filter
    let data, filterData;
    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }
    try {
        const bucket = await Bucket.findOne({ _id: req.params.id })
        if (filter === "all") {
            data = await bucket.populate('todos').execPopulate()
            filterData = data.todos
        } else if (filter === "active") {
            data = await bucket.populate('todos').execPopulate()
            filterData = data.todos
            filterData = filterData.filter(todo => { return todo.completed === false })
        } else if (filter === "completed") {
            data = await bucket.populate('todos').execPopulate()
            filterData = data.todos
            filterData = filterData.filter(todo => { return todo.completed === true })
        }
        res.send(filterData)
    } catch (error) {
        res.status(500).send()
    }
})

router.delete('/bucket/:id', async (req, res) => {
    const _id = req.params.id
    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }
    try {
        const deletepost = await Bucket.findOneAndDelete({ _id: _id })
        if (!deletepost) {
            return res.status(404).send();
        }
        res.send(deletepost)
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})



module.exports = router
