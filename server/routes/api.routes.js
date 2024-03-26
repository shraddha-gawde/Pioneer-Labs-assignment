const express = require("express")
const { register, login, logout, resetPassword, user } = require("../controller/user.controller")
const { data } = require("../controller/data.controller")
const { authentication } = require("../middlewares/auth.middleware")
const cookieparser = require("cookie-parser")

const router = express.Router();
router.use(express.json())
router.use(cookieparser())

router.post("/users/registerUser", register)
router.post("/users/login", login)
router.get("/users/logout", logout)
router.post("/users/:id/reset", resetPassword)

router.use(authentication)

router.get("/users/", user)
router.get("/data", data)

module.exports={ 
    router 
}