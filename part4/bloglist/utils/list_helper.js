const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce( (totalLikes, b) => totalLikes+b.likes, 0)
}

const favoriteBlog = (blogs) => {
	const sortedBlogs = blogs.sort( (a, b) => a.likes > b.likes ? -1 : 1 )
	const mostLiked = sortedBlogs[0]
	return{
		"title": mostLiked.title,
		"author": mostLiked.author,
		"likes": mostLiked.likes
	}
}

module.exports = {
	dummy, totalLikes, favoriteBlog
}