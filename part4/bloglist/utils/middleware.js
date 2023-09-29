const logger = require("./logger")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

const requestLogger = (request, response, next) => {
	logger.info("Method:", request.method)
	logger.info("Path:  ", request.path)
	logger.info("Body:  ", request.body)
	logger.info("---")
	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" })
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message })
	}
	else if (error.name === "JsonWebTokenError") {
		return response.status(401).json({ error: "invalid token" })
	}

	next(error)
}


const tokenExtractor = async(request, response, next)=>{
	const auth = await request.get("authorization")
  
	if ( (auth) && auth.toLowerCase().startsWith("bearer ")) {
		const token = auth.substring(7)
		logger.info("Token: ", token)
		//request.token = token
		request["token"] = token
	} 
	else {
		request["token"] = null
	}
	next()
  }

  const getUser = async(request, response, next)=>{
	console.log(request.token)
	console.log(request["token"])
	if (!request.token && !request["token"]) {
		request.user = null
		return response.status(401).json({error: "Error: token missing"})
	} else {
		// eslint-disable-next-line no-undef
		const verifiedToken = jwt.verify(request.token, process.env.SECRET)
		logger.info("Token: ", verifiedToken)
		if ( !verifiedToken.id ) {
			request.user = null
			return response.status(401).json({error: "Error: invalid token"})
		} 
		else {
			request.user = await User.findById(verifiedToken.id)
		}
	}
	next()
  }
module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	getToken: tokenExtractor,
	getUser
}