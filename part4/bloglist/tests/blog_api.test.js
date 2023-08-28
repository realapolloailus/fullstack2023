const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

const Blog = require("../models/blog")


const blogs = [
  {
      title: "Day in the Life of Joe Schmoe",
      author: "Davey Crockett",
      url: "myspace.com/emoblogs-official/dayinthelifeofjoeschmoe",
      likes: 3,
      __v: 0
  },
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

beforeEach(async () => {  
    await Blog.deleteMany({})  
    
    //let blogObject = new Blog(blogs[0])  
    const blogObject = blogs.map(b => new Blog({
      title: b.title,
      author: b.author,
      url: b.url,
      likes: b.likes ? b.likes : 0
    }))
    //await blogObject.save()  
    //blogObject = new Blog(blogs[1])  
    for(let i = 0; i<blogObject.length; i++){
      
      await blogObject[i].save()
    }
})

const retrieveBlogs = async () =>{ //helper function to retrieve blogs from db
  const blogsFound = await Blog.find({})
  return blogsFound.map(b => b.toJSON())
}

describe("Verify that GET requests work as intended:", () => {

  test("blogs are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    }, 100000)

    test("correct number of blogs are returned", async () =>  {
        const response = await api
            .get("/api/blogs")
        expect(response.body).toHaveLength(blogs.length)
    }, 100000)

    test("that database uses 'id' instead of '_id'", async() =>{
      const response = await api
          .get("/api/blogs")
      expect(response.body[0].id).toBeDefined()
  })

  /test("that there are posts with no likes in the database", async()=>{
    const blogsToInspect = await retrieveBlogs()
    const numLikes = blogsToInspect.map(b => b.likes)
    expect(numLikes).toContain(0)
  })
})

describe("Verify that POST requests work as intended:", () =>{
  test("that new entires get added successfully", async() =>{
    const blogToAdd ={
      title: "Test blog",
      author: "Apollo Ailus",
      url: "www.worldwideweb.com",
      likes: 4,
    }

    await api
      .post("/api/blogs")
      .send(blogToAdd)
      .expect(201)  //expect successful addition
  })

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
  })

  test("that entries without title and url can be sent", async()=>{

    const blogToAdd ={
      author: "John Smith",
      likes: "8",
    }

    await api
      .post("/api/blogs")
      .send(blogToAdd)
      .expect(400)
  })
})

describe("Verify that DELETE requests work as intended:", ()=>{
  test("that a blog can be deleted from the database", async()=>{
    const blogsInDB = await retrieveBlogs()
    const toDelete = blogsInDB[0]
    
    await api
      .delete(`/api/blogs/${toDelete.id}`)
      .expect(204)

    const blogsNow = await retrieveBlogs()
    expect(blogsNow).not.toContain(toDelete.title)
  })
})

afterAll(async () => {
	await mongoose.connection.close()
})

  
