const express = require('express');
require('./db/mongoose');
const User = require('./models/user')
const Task = require('./models/task')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save();
        res.status(201).send(user)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(202).send(users)
    } catch (err) {
        res.status(404).send(err.message)
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const _id = await req.params.id;
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send('No user found with this id')
        }
        res.status(202).send(user)
    } catch (err) {
        res.status(404).send(err.message)
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        if (!tasks) {
            return res.status(404).send('No task found with this id')
        }
        res.status(202).send(tasks);
    } catch (err) {
        res.status(404).send(err.message)
    }
})


app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

app.get('/tasks/:id', async (req, res) => {
    try {
        const _id = await req.params.id;
        const task = await Task.findById(_id)
        res.status(202).send(task)
    } catch (err) {
        res.status(404).send(err.message)
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

