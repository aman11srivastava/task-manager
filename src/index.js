const express = require('express');
require('./db/mongoose');
const User = require('./models/user')
const Task = require('./models/task')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save()
        .then(() => {
            res.status(201).send(user)
        })
        .catch((err) => {
            res.status(400).send(err.message)
        })
})

app.get('/users', (req, res) => {
    User.find({})
        .then((users) => {
            res.status(202).send(users)
        })
        .catch((err) => {
            res.status(404).send(err.message)
        })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    User.findById(_id)
        .then((user) => {
            if (!user) {
                return res.status(404).send('No user found with this id')
            }
            res.status(202).send(user)
        })
        .catch((err) => {
            res.status(404).send(err.message)
        })
})

app.get('/tasks', (req, res) => {
    Task.find({})
        .then((tasks) => {
            if (!tasks) {
                return res.status(404).send('No task found with this id')
            }
            res.status(202).send(tasks);
        })
        .catch((err) => {
            res.status(404).send(err.message)
        })
})


app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save()
        .then(() => {
            res.status(201).send(task)
        })
        .catch((err) => {
            res.status(400).send(err.message)
        })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    Task.findById(_id)
        .then((task) => {
            res.status(202).send(task)
        })
        .catch((err) => {
            res.status(404).send(err.message)
        })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

