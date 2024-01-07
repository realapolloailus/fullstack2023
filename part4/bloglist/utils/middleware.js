const logger = require("./logger")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
require("dotenv").config()

const requestLogger = (request, response, next) => {
	logger.info("Method:", request.method)
	logger.info("Path:  ", request.path)
	logger.info("Body:  ", request.body)
	logger.info("---")
	next()
}

const userExtractor = async (request, response, next) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if(!request.token || !decodedToken.id){
		return response.status(401).json({ error: "Error: Missing or invalid token." })
	}
	request.user = await User.findById(decodedToken.id)
	next()
}

const tokenExtractor = async(request, response, next) => {
	// code that extracts the token
    const auth = await request.get("authorization")
	if(auth && auth.toLowerCase().startsWith("bearer")){
		request.token = auth.substring(7)
	}
	next()
  }
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	if (error.name === "CastError") {
		return response.status(400).send({ error: "Error: malformatted id" })
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message })
	} else if (error.name === "JsonWebTokenError") {
		return response.status(401).json({ error: "Error: invalid token" })
	} else if (error.name === "TokenExpiredError") {
		return response.status(401).json({ error: "Error: token is expired." })
	}

	next(error)
}

module.exports = {
	requestLogger,
	userExtractor,
	tokenExtractor,
	unknownEndpoint,
	errorHandler
}