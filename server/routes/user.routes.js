const express = require("express")
const { register, login, logout, resetPassword } = require("../controller/user.controller")
const cookieparser = require("cookie-parser")

const router = express.Router();
router.use(express.json())
router.use(cookieparser())

router.post("/registerUser", register)
router.post("/login", login)
router.get("/logout", logout)
router.post("/:id/reset", resetPassword)

module.exports={ 
    router 
}