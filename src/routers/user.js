const express = require('express');
const router = new express.Router();
const User = require('../models/user')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save();
        res.status(201).send(user)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        // Making a custom method
        const user = await User.findUserByCredentials(email, password)
        res.send(user);
    }
    catch (err){
        res.status(400).send();
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(202).send(users)
    } catch (err) {
        res.status(404).send(err.message)
    }
})

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({err: "Invalid updates"})
    }
    try {
        const _id = req.params.id;
        const user = await User.findById(_id);
        updates.forEach((update) => user[update] = req.body[update])
        await user.save();
        if (!user) {
            return res.status(404).send('No user found to update')
        }
        res.send(user)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(400).send('No user found')
        }
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

module.exports = router