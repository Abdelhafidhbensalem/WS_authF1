const express = require("express")
const User = require("../models/User")
const { validator, registerCheck, loginCheck } = require("../middlewares/validator")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const isAuth = require("../middlewares/passport")
const router = express.Router()
const isAdmin = require("../middlewares/isAdmin")
//test
router.get("/test", (req, res) => {
    res.send("hello abs")
})
//register
router.post("/register", registerCheck(), validator, async (req, res) => {
    const { email, password } = req.body
    try {
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).send({ msg: "user already exist, please login" })
        }
        const newUser = new User({ ...req.body })
        const hashedPassword = await bcrypt.hash(password, 10)
        newUser.password = hashedPassword
        await newUser.save()
        res.send({ user: newUser, msg: "user successfully registered" })
    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
})

//login user
router.post("/login", loginCheck(), validator, async (req, res) => {
    const { email, password } = req.body
    try {
        const existUser = await User.findOne({ email })
        if (!existUser) {
            return res.status(400).send({ msg: "bad credantial " })
        }
        const isMatched = await bcrypt.compare(password, existUser.password)
        //console.log(isMatched);
        if (!isMatched) {
            return res.status(400).send({ msg: "bad credantial !" })
        }
        const payload = {
            _id: existUser._id,
            name: existUser.fullName
        }
        const token = await jwt.sign(payload, process.env.secret)
        //console.log(token);
        existUser.password = undefined
        res.send({ user: existUser, token: token })
    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
})

// get current user
router.get("/current", isAuth(), async (req, res) => {
    console.log(req.user);
    res.send({user:req.user})
})

//get all users (acces admin)

router.get("/allUsers", isAuth(), isAdmin, async (req, res) => {
    try {
        const allUsers = await User.find()
        res.send({ allUsers })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router
