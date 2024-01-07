const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

const jwt = require("jsonwebtoken")

const Blog = require("../models/blog")
const User = require("../models/user")
const helper = require("./test_helper")

let token = null


beforeEach(async () => {  
    await Blog.deleteMany({})  
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
    await Blog.insertMany(helper.initialBlogs)

    // const blogObject = blogs.map(b => new Blog({
    //   title: b.title,
    //   author: b.author,
    //   url: b.url,
    //   likes: b.likes ? b.likes : 0
    // }))
    const userForToken = {
      username: helper.initialUsers[0].username,
      id: helper.initialUsers[0]._id,
    }
    token = await jwt.sign(userForToken, process.env.SECRET)
  })
    //await blogObject.save()  
    //blogObject = new Blog(blogs[1])  
//     for(let i = 0; i<blogObject.length; i++){
      
//       await blogObject[i].save()
//     }
// })

// const retrieveBlogs = async () =>{ //helper function to retrieve blogs from db
//   const blogsFound = await Blog.find({})
//   return blogsFound.map(b => b.toJSON())
// }

describe("Verify that GET requests work as intended:", () => {

  test("blogs are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    test("correct number of blogs are returned", async () =>  {
        const response = await api
            .get("/api/blogs")
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

  
  test("blogs include a specific requested blog", async () => {
    const response = await api.get("/api/blogs")
    const titles = response.body.map(r => r.title)
    expect(titles).toContainEqual(
      "React patterns"
    )
  })

  test("blog has id", async () => {
    const response = await api.get("/api/blogs")
    response.body.forEach(blog => expect(blog.id).toBeDefined())
  })
})

describe("Blog ID tests:", () => {
  test("succeeds with valid ID", async()=>{
    const BlogsAtStart = await helper.blogsInDb()
    const BlogInQuestion = BlogsAtStart[0]

    const res = await api
      .get(`/api/blog/${BlogInQuestion.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/)
      
    const Blog_JSON = JSON.parse(JSON.stringify(BlogInQuestion))

    expect(res.body).toEqual(Blog_JSON)
  })

  test("fails with status code 400 if ID is invalid", async() => {
    const invalidID = "29382083972079"
    await api
      .get(`/api/blogs/${invalidID}`)
      .expect(400)
  })

})

describe("Verify that POST requests work as intended:", () =>{
  test("that new entires get added successfully WITH TOKEN", async() =>{
    const blogToAdd ={
      title: "Test blog from John",
      author: "John Tester",
      url: "www.JohnTesterBlogs.com",
    }

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blogToAdd)
      .expect(201)  //expect successful addition
      .expect("Content-Type", /application\/json/)

      //length increases by 1
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
      
      //verify the title is in the DB
      const allTitles = blogsAtEnd.map(blog => blog.title)
      expect(allTitles).toContainEqual(
        "Test blog from John"
      )

    test("that a new entry with 0 likes gets added successfully", async() =>{
        const blogToAdd ={
          title: "0 likes :(",
          author: "Lou Surr",
          url: "www.ihavenofriends.com",
        }
    
        await api
          .post("/api/blogs")
          .send(blogToAdd)
          .expect(201)
    
          const totalBlogs = await helper.blogsInDb()
          expect(totalBlogs).toHaveLength(helper.initialBlogs.length + 1)
      
          const likesOnNewBlog = totalBlogs[totalBlogs.length - 1].likes
          expect(likesOnNewBlog).toEqual(0)
      })

      test("that entries without title and url CAN'T be sent", async()=>{

        const blogToAdd ={
          author: "John No",
        }
    
        await api
          .post("/api/blogs")
          .set("Authorization", `Bearer ${token}`)
          .send(blogToAdd)
          .expect(400)

          const totalBlogs = await helper.blogsInDb()
          expect(totalBlogs).toHaveLength(helper.initialBlogs.length)
      })
    
      test("blogs without an author can be added", async () => {
        const newBlog = {
          title: "Oops! Author forgot to add himself",
          url: "NoAuthor.com"
        }
    
        await api
          .post("/api/blogs")
          .set("Authorization", `Bearer ${token}`)
          .send(newBlog)
          .expect(201)
    
        const totalBlogs = await helper.blogsInDb()
        expect(totalBlogs).toHaveLength(helper.initialBlogs.length + 1)
    
        const allTitles = totalBlogs.map(blog => blog.title)
        expect(allTitles).toContainEqual(
          "No author post test blog"
        )
      })
  })
})

describe("Verify that DELETE requests work as intended:", ()=>{
  test("that a blog can be deleted from the database", async()=>{
    const blogsInDB = await helper.blogsInDb()
    const toDelete = blogsInDB[0]
    
    await api
      .delete(`/api/blogs/${toDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204)

    const blogsNow = await helper.blogsInDb()
    expect(blogsNow).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const allTitles = blogsNow.map(r => r.title)
    expect(allTitles).not.toContainEqual(toDelete.title)
  })

  test("fails when lacking an authorized token", async () => {
    const blogsInDB = await helper.blogsInDb()
    const toDelete = blogsInDB[0]

    await api
      .delete(`/api/blogs/${toDelete.id}`)
      .set("Authorization", "Bearer 123456789")
      .expect(401)

    const blogsNow = await helper.blogsInDb()

    expect(blogsNow).toHaveLength(
      helper.initialBlogs.length
    )

    const allTitles = blogsNow.map(r => r.title)

    expect(allTitles).toContainEqual(toDelete.title)
  })
})

describe("Verify that PUT requests work as intended:", () => {

  test("succeeds at updating a blogs likes", async () => {
    const blogsInDB = await helper.blogsInDb()
    const blogToUpdate = blogsInDB[0]
    blogToUpdate.likes += 1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsNow = await helper.blogsInDb()
    expect(blogsNow).toHaveLength(helper.initialBlogs.length)
  })
})


afterAll(async () => {
	await mongoose.connection.close()
})

  
