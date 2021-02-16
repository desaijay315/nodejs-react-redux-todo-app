const express = require('express')
require('./db/mongoose');
const connectDB = require('./db/mongoose')
connectDB()
const BucketRoutes = require('./routes/bucket')
const TodoRoutes = require('./routes/todo')
const path = require('path')


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())

app.use("/api", BucketRoutes)
app.use(TodoRoutes)

console.log(__dirname)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../frontend/build')))
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
    app.use(express.static(path.join(__dirname, '../../frontend/build')))
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}


app.listen(port, () => {
    console.log('server is up on ' + port);
})