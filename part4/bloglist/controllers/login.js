const jwt = require("jsonwebtoken")
const User = require("../models/user")
const bcrypt = require("bcrypt")

const loginRouter = require("express").Router()

loginRouter.get("/", async(request, response)=>{
    const users = await User.find({})
        .populate("blogs", { title: 1, author: 1, url: 1 })

    response.json(users.map(u=>u.toJSON()))
})

loginRouter.post("/", async(request, response)=>{
    const body = request.body

    const user = await User.findOne({username: body.username})
    const loggedIn = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

    if(!(user && loggedIn)){
        return response.status(401).json({ error: "Error: incorrect username or password." })
    }

    const tokenUser = {
        username: user.username,
        id: user._id
    }

    // eslint-disable-next-line no-undef
    const token = jwt.sign(tokenUser, process.env.SECRET, {expiresIn: 7200})

    response.status(200).send({
        token, username: user.username, name: user.name
    })

})

module.exports = loginRouter