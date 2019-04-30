const express = require('express')
const postDb = require('../data/helpers/postDb')

const postRouter = express.Router()

postRouter.get('/', async (req, res) => {
    try {
        const posts = await postDb.get(req.query)
        res.status(200).json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})

postRouter.get('/user:id', async (req, res) => {
    const { id } = req.params
    try {
        const posts = await postDb.getByUserId(id)
        posts ?
            res.status(200).json(posts)
            :
            res.status(400).json({
                message: 'User does not exist or have any posts yet.'
            })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})

postRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const post = await postDb.getById(id)
        post ?
            res.status(200).json(post)
            :
            res.status(400).json({
                message: 'Post does not exist.'
            })
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})

postRouter.post('/', async (req, res) => {
    const { body } = req
    try {
        postDb.insert(body)
        const posts = await postDb.get()
        res.status(200).json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})

postRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const del = await postDb.remove(id)
        const get = await postDb.get(req.query)
        del ?
            res.status(200).json(get)
            :
            res.status(400).json({
                message: 'Post does not exist.'
            })
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})

postRouter.put('/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req
    try {
        const update = await postDb.update(id, body)
        const get = await postDb.get(req.query)
        update ?
            res.status(200).json(get)
            :
            res.status(400).json({
                message: 'Post does not exist.'
            })
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})

module.exports = postRouter
