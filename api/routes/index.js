const express = require("express")
const passport = require("passport")
const router = express.Router()
const { User, Favorite } = require("../models")

router.post("/signup", function (req, res) {
  User.create(req.body).then((newUser) => {
    res.send(newUser)
  })
})

router.post("/addtofavorites", function (req, res) {
  Favorite.create(req.body).then(() => {
    res.end()
  })
})

router.post("/removefromfavorites", function (req, res) {
  let { apiId, userId } = req.body
  Favorite.destroy({ where: { apiId, userId } }).then(() => {
    res.end()
  })
})

router.post("/loadfavorites", function (req, res) {
  let { userId } = req.body
  Favorite.findAll({ where: { userId } }).then((favorites) => {
    res.send(favorites)
  })
})

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user)
})

router.post("/logout", (req, res) => {
  req.logOut()
  res.sendStatus(200)
})

router.get("/me", (req, res) => {
  if (!req.user) {
    return res.sendStatus(401)
  }
  res.send(req.user)
})

module.exports = router
