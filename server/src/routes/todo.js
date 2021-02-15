const express = require('express');
const router = new express.Router();
const Bucket = require('../models/bucket')

router.get('/bucket', async (req, res) => {
    try {
        const buckets = await Bucket.find({})
        res.send(buckets)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router
