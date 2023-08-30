const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const mongoose = require("mongoose")

mongoose.set("strictQuery", false)



logger.info("env password:", config.MONGODB_URI)
const mongoUrl = config.MONGODB_URI
logger.info("connecting to", mongoUrl)

mongoose.connect(mongoUrl)
	.then(() => {
		logger.info("connected to MongoDB")
	})
	.catch((error) => {
		logger.error("error connecting to MongoDB:", error.message)
	})

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

app.use(middleware.getToken)

app.use("/api/blogs", middleware.getUser, blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports  = app