const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async(request, response) => {
	const blogs = await Blog
		.find({})
	response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post("/", async(request, response) => {
	//const blog = new Blog(request.body)
	const body = request.body

	/*blog
		.save()
		.then(result => {
			response.status(201).json(result)
		})*/
	
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	})

	if(!blog.title && !blog.url){
		response.status(400).end()
	}
	else{
		if(!blog.likes){
			blog.likes = 0
		}
	}

	const newBlog = await blog.save()
	response.status(201).json(newBlog.toJSON())
})

module.exports = blogsRouter