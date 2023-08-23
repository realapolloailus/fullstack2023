const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce( (totalLikes, b) => totalLikes+b.likes, 0)
}

module.exports = {
	dummy, totalLikes
}