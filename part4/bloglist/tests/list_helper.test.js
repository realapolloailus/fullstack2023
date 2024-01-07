const listHelper = require("../utils/list_helper")


test("dummy returns one", () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe("total likes", () => {
	const listWithOneBlog = [
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0
		}
	]

	test("when list has only one blog, equals the likes of that", () => {
		const result = listHelper.totalLikes(listWithOneBlog)
		expect(result).toBe(5)
	})

	test("when using the above list of blogs, equals the correct sum of their likes", () => {
		const result = listHelper.totalLikes(initialBlogs)
		expect(result).toBe(7+12+5+10+0+2)
	})


})

describe("total likes", () => {
	const expected = {
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		likes: 12
	}

	test("when using the above list of blogs, returns info for the most liked (the one with 12 likes)", () => {
		const result = listHelper.favoriteBlog(initialBlogs)
		expect(result).toEqual(expected)
	})
})