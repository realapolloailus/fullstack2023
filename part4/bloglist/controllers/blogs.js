/* eslint-disable no-undef */
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const middleware = require("../utils/middleware")
const jwt = require("jsonwebtoken")

const getTokenFrom = request => {
	const authorization = request.get("authorization")
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		return authorization.substring(7)
	}
	return null
  }

blogsRouter.get("/", async(request, response) => {
	const blogs = await Blog
		.find({})
		.populate("user", { username: 1, name: 1 })
	response.json(blogs.map((b) => b.toJSON()))
})

blogsRouter.get("/:id", async(request, response) => {
	const blogs = await Blog
		.findById(request.params.id)
		if(blog){
			response.json(blog.toJSON())
		}
		else{
			response.status(404).end
		}
})

blogsRouter.post("/", async(request, response) => {
	const body = request.body
	if (!body.title || !body.url) {
		return response.status(400).send({ error: "Error: title or url is missing." })
	}
	const user = request.user
	const verifiedToken = jwt.verify(request.token, process.env.SECRET)
	console.log(verifiedToken)
	if (!request.token || !verifiedToken.id) {
		return response.status(401).json({error: "Error: token is invalid or missing!"})
	}
	//const user = await User.findById(verifiedToken.id)

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		user: user._id,
		likes: 0
	})
	if(!user){
		return response.status(401).json({error: "Error: user not found; token is potentially invalid or missing!"})
	}

		console.log(body.title)
		console.log(body.url)

	if(!blog.likes){ blog.likes = 0 }
	
	const newBlog = await blog.save()
	user.blogs = user.blogs.concat(newBlog._id)
	await user.save()
	response.status(201).json(newBlog)
})

blogsRouter.delete("/:id", async(request, response)=>{
	const verifiedToken = jwt.verify(request.token, process.env.SECRET)
	if (!request.token || !verifiedToken.id) {
		return response.status(401).json({error: "Error: token is invalid or missing!"})
	}

	const blog = await Blog.findById(request.params.id)
	const user = await Blog.findById(verifiedToken.id)
	if(!blog){
		return response.status(204).end()
	}
		//const user = request.user
		if(blog.user.toString() === verifiedToken.id.toString()){
			//await Blog.findByIdAndRemove(request.params.id)
			await blog.remove()
			user.blogs = user.blogs.filter(b => b.id.toString() !== request.params.id.toString())
			await user.save()
			return response.status(204).end()
		}
		else{
			return response.status(401).end()

		}
})

blogsRouter.put("/:id", async(request, response)=>{
	const body = request.body
	const blog={
		title: body.title,
		author: body.author,
		url: body.url,
		likes: (body.likes || 0)
	}
	
	const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true} )
	response.json(newBlog.toJSON())
})

module.exports = blogsRouter