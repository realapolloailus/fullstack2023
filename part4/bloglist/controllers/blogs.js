const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

const jwt = require("jsonwebtoken")

blogsRouter.get("/", async(request, response) => {
	const blogs = await Blog
		.find({})
		.populate("user", { username: 1, name: 1 })
	response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post("/", async(request, response) => {
	const body = request.body
	const user = request.user
	if(!user){
		return response.status(401).json({error: "Error: token is invalid or missing!"})
	}
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		user: user,
		likes: body.likes
	})

	if(!blog.title && !blog.url){
		response.status(400).end()
	}
	else{
		if(!blog.likes){ blog.likes = 0 }
	}

	const newBlog = await blog.save()
	user.blogs = user.blogs.concat(newBlog._id)
	await user.save()
	response.status(201).json(newBlog.toJSON())
})

blogsRouter.delete("/:id", async(request, response)=>{
	const blog = await Blog.findById(request.params.id)
	if(!blog){
		return response.status(204).end()
	}
		const user = request.user
		if(user.id.toString() === blog.user.toString()){
			await Blog.findByIdAndRemove(request.params.id)
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