import React, { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { getCurrentUser } from "../store/currentUser"
import { clearStoreFavorites } from "../store/currentFavorites"
import { useHistory } from "react-router-dom"

const NewUser = () => {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [showButtonSpinner, setShowButtonSpinner] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  React.useEffect(() => {
    setError("")
  }, [email, firstName, lastName, username, password])

  const handleSubmit = function (event) {
    event.preventDefault()
    setShowButtonSpinner(true)
    axios
      .post("/api/signup", {
        email,
        firstName,
        lastName,
        username,
        password,
      })
      .then((newUser) => {
        dispatch(getCurrentUser({id:newUser.data.id}))
        dispatch(clearStoreFavorites())
        history.push("/")
      }).catch((error)=>{
        setError(error.response.data)
        setShowButtonSpinner(false)
      })
  }
  return (
    <div className="sign-up-or-log-in">
      <h2>
        Sign up to save your own list of favorite movies
        <hr />
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="text"
          placeholder="First name"
          name="first_name"
          onChange={(event) => setFirstName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Last name"
          name="last_name"
          onChange={(event) => setLastName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button>{showButtonSpinner ? <div className="small-spinner"></div>: "Sign Up"}</button>
      </form>
      {error && <div className="sign-up-or-log-in-error">{error}</div>}
    </div>
  )
}

export default NewUser
