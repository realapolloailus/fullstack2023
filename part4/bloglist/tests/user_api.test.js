const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)
const User = require("../models/user")

describe("Create new users successfully:", ()=>{

    beforeEach(async()=>{
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash("secret", 10)
        
        const user = new User({
            username: "sudo",
            passwordHash
        })
        await user.save()
    
    })

    test("when a new user is created", async(request, response)=>{
        const initUsers = await helper.currentUsers()

        const newUser ={
            username:  "Drake",
            name: "Aubrey Drake Graham",
            password: "password"
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        const endUsers = await helper.currentUsers()
        expect(endUsers).toHaveLength(initUsers.length+1)

        const usernames = endUsers.map(u => u.username)
        expect(usernames).toContain(newUser.username)
            
    }, 10000)

    test("when a user with too short of a username is created", async(request, response)=>{
        const initUsers = await helper.currentUsers()

        const newUser ={
            username:  "Dr",
            name: "Aubrey Drake Graham",
            password: "password"
        }

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)

        expect(result.body.error).toContain("Error: username is too short.")

        const endUsers = await helper.currentUsers()
        expect(endUsers).toHaveLength(initUsers.length)

        const usernames = endUsers.map(u => u.username)
        expect(usernames).not.toContain(newUser.username)
    },10000)

    test("when a user with no username is created", async(request, response)=>{
        const initUsers = await helper.currentUsers()

        const newUser ={
            name: "Aubrey Drake Graham",
            password: "password"
        }

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)

        const endUsers = await helper.currentUsers()
        expect(endUsers).toHaveLength(initUsers.length)

        const usernames = endUsers.map(u => u.username)
        expect(usernames).not.toContain(newUser.username)
    },10000)

    test("when a user with too short of a password is created", async(request, response)=>{
        const initUsers = await helper.currentUsers()

        const newUser ={
            username:  "Draco",
            name: "Draco Malfoy",
            password: "p"
        }

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)

        expect(result.body.error).toContain("Error: password is too short or hasn't been set up yet.")

        const endUsers = await helper.currentUsers()
        expect(endUsers).toHaveLength(initUsers.length)

        const usernames = endUsers.map(u => u.username)
        expect(usernames).not.toContain(newUser.username)
    },10000)

    test("when a user with no password is created", async(request, response)=>{
        const initUsers = await helper.currentUsers()

        const newUser ={
            username:  "Draco",
            name: "Draco Malfoy",
        }

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)

        expect(result.body.error).toContain("Error: password is too short or hasn't been set up yet.")

        const endUsers = await helper.currentUsers()
        expect(endUsers).toHaveLength(initUsers.length)

        const usernames = endUsers.map(u => u.username)
        expect(usernames).not.toContain(newUser.username)
    },10000)
})

afterAll(()=>{ mongoose.connection.close() })