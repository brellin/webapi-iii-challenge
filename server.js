// Middleware variables
const express = require('express')
const postRouter = require('./routers/postRouter')
const userRouter = require('./routers/userRouter')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { errorLogger } = require('./customMiddleware')

// Server variable
const server = express()

// Built-in middleware
server.use(express.json())

// Third-party middleware
server.use(cors())
server.use(helmet())
server.use(morgan('dev'))

// Route handlers
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

// Error Logger
server.use(errorLogger)

module.exports = server
