const express = require('express')
require('./db/mongoose');
const connectDB = require('./db/mongoose')
connectDB()
const BucketRoutes = require('./routes/bucket')
const TodoRoutes = require('./routes/todo')


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())

app.use(BucketRoutes)
app.use(TodoRoutes)


app.get('/', function (req, res) {
    res.send('hello world!');
});


app.listen(port, () => {
    console.log('server is up on ' + port);
})