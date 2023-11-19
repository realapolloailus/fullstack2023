const blogsRouter = require("express").Router()
const middleware = require("../utils/middleware")
const Blog = require("../models/blog")
require('dotenv').config()

blogsRouter.get("/", async(request, response) => {
	const blogs = await Blog
		.find({})
		.populate("user", {username: 1, name: 1})
	response.json(blogs)
})

blogsRouter.get("/:id", async(request, response)=>{
	const blog = await Blog.findById(request.params.id)
	if(blog){
		response.json(blog.toJSON())

	}
	else{ response.status(404).end }
})

blogsRouter.post("/", middleware.tokenExtractor, middleware.userExtractor, async(request, response) => {
	//const blog = new Blog(request.body)
	const body = request.body

	if(!body.title || !body.url){
		response.status(400).json({ error: "Error: title or URL is missing." })
	}

	const user = request.user

	/*blog
		.save()
		.then(result => {
			response.status(201).json(result)
		})*/
	
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		user: user._id,
		likes: 0
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async(request, response)=>{
	if(!request.user){
		return response.status(401).json({ error: "Error: token is invalid or missing." })
	}
	const blog = await Blog.findById(request.params.id)

	if(blog.user.toString() !== request.user.id.toString()){
		return response.status(401).json({ error: "Error: Unathorized token." })
	}
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogsRouter.put("/:id", async(request, response)=>{
	const {title, author, url, likes} = request.body

	const newLikes = await Blog.findByIdAndUpdate(request.params.id, {title, author, url, likes}, {new: true})

	if(newLikes){
		response.json(newLikes.toJSON())
	}
	else{ response.status(404).end }
	//response.json(newBlog.toJSON())
})

module.exports = blogsRouter