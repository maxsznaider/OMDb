const express = require("express")
const volleyball = require("volleyball")
const routes = require("./routes/index.js")
const sessions = require("express-session")
const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const db = require("./db.js")
const cookieParser = require("cookie-parser")
const { User } = require("./models/")

const app = express()

const logger = volleyball.custom({ debug: true })
app.use(logger)

app.use(express.json())

app.use(cookieParser())

app.use(
  sessions({
    secret: "omdb",
    resave: true,
    saveUninitialized: true,
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.use(
  new localStrategy(function (username, password, done) {
    User.findOne({ where: { username } })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Incorrect username." })
        }

        user.hash(password, user.salt).then((hash) => {
          if (hash !== user.password) {
            return done(null, false, { message: "Incorrect password." })
          }

          return done(null, user) // success :D
        })
      })
      .catch(done) // done(err)
  })
)

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then((user) => {
      done(null, user)
    })
    .catch(done)
})

app.use("/api", routes)

db.sync({force:false}).then(() =>
  app.listen(3001, () => console.log("Listening on PORT 3001"))
)
