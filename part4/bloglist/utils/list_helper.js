const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	let initVal = 0
	return blogs.length === 0
		? 0
		: blogs.reduce( (sum, currentVal ) => sum+currentVal.likes, initVal )
}

const favoriteBlog = (blogs) => {
	let maxVal = 0
	const helper=(prev, curr)=>{
		maxVal = Math.max(prev, curr)
	}

	let i=0
	while(i<blogs.length){
		helper(maxVal, (blogs[i].likes))
		i += 1
	}
	return blogs.find(blog=> (blog.likes === maxVal))
}

const mostBlogs = (blogs) =>{
	if(blogs.length===0) {return undefined}

	const authors = blogs.map(blog => blog.author)
	const numBlogsUnderAuthor = {}

	authors.forEach(a => {
		numBlogsUnderAuthor[a] = (numBlogsUnderAuthor[a]||0)+1
	})

	const res = Math.max(...Object.values(numBlogsUnderAuthor))

	return {author: (Object.entries(numBlogsUnderAuthor).filter(([key, value]) => [key, value][1] ===  res))[0][0], blogs: res}

}

const mostLikes = (blogs) =>{
	if(blogs.length===0) {return undefined}

	const authors = blogs.map(blog => blog.author)
	const numLikesUnderAuthor = {}

	authors.forEach(b => {
		numLikesUnderAuthor[b.author] = (numLikesUnderAuthor[b.author]||0)+b.likes
	})

	const res = Math.max(...Object.values(numLikesUnderAuthor))

	return {author: (Object.entries(numLikesUnderAuthor).filter(([key, value]) => [key, value][1] ===  res))[0][0], blogs: res}

}

module.exports = {
	dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}