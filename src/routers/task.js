const Task = require('../models/task')
const express = require("express");
const router = new express.Router();

router.get('/tasks', async (req, res) => {
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

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.get('/tasks/:id', async (req, res) => {
    try {
        const _id = await req.params.id;
        const task = await Task.findById(_id)
        res.status(202).send(task)
    } catch (err) {
        res.status(404).send(err.message)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description, completed'];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if (isValidUpdate){
        return res.status(400).send({err: "Invalid updates"})
    }
    try {
        const _id = req.params.id;
        const task = await Task.findById(_id);
        updates.forEach((update) => task[update] = req.body[update])
        await user.save();
        if (!task){
            return res.status(404).send('No task found to update')
        }
        res.send(task)
    }
    catch (err){
        res.status(400).send(err.message)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findByIdAndDelete(_id)
        if (!task){
            return res.status(400).send('No task found')
        }
        res.status(200).send(task)
    }
    catch (err){
        res.status(500).send(err.message)
    }
})

module.exports = router