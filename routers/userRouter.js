const express = require('express')
const userDb = require('../data/helpers/userDb')
const { firstCap } = require('../customMiddleware')

const userRouter = express.Router()

userRouter.get('/', async (req, res) => {
    try {
        const users = await userDb.get(req.query)
        res.status(200).json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})

userRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await userDb.getById(id)
        user ?
            res.status(200).json(user) :
            res.status(400).json({
                message: 'User does not exist'
            })
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})

userRouter.get('/user/:user_id', async (req, res) => {
    const { user_id } = req.params
    try {
        const userPosts = await userDb.getUserPosts(user_id)
        userPosts ?
            res.status(200).json(userPosts) :
            res.status(400).json({
                message: 'User does not exist or does not have any posts yet'
            })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})

userRouter.post('/', firstCap, async (req, res) => {
    try {
        const newUser = await userDb.insert(req.body)
        const get = await userDb.get()
        res.status(200).json(get)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})

userRouter.put('/:id', firstCap, async (req, res) => {
    const { id } = req.params
    try {
        const edit = await userDb.update(id, req.body)
        const get = await userDb.get()
        edit ?
            res.status(200).json(get) :
            res.status(400).json({
                message: 'User does not exist'
            })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})

userRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const del = await userDb.remove(id)
        const get = await userDb.get(req.query)
        del ?
            res.status(200).json(get) :
            res.status(400).json({
                message: 'User does not exist'
            })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})

module.exports = userRouter
