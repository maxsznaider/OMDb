import React, { useState } from "react"
import axios from "axios"
import { getCurrentUser } from "../store/currentUser"
import { useDispatch } from "react-redux"
import { loadStoreFavorites } from "../store/currentFavorites"
import { useHistory } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const history = useHistory()
  const [error, setError] = useState("")
  const [showButtonSpinner, setShowButtonSpinner] = useState(false)

  React.useEffect(() => {
    setError("")
  }, [username, password])

  const handleSubmit = function (event) {
    event.preventDefault()
    setShowButtonSpinner(true)
    axios
      .post("/api/login", {
        username,
        password,
      })
      .then((user) => {
        dispatch(getCurrentUser(user.data))
        return axios
          .post("/api/loadfavorites", {
            userId: user.data.id,
          })
          .then((favorites) => {
            dispatch(loadStoreFavorites(favorites.data))
            history.push("/favorites")
          })
      })
      .catch((error) => {
        if (error.response.data === "Unauthorized")
          setError("Invalid username or password.")
        else setError(error.response.data)
        setShowButtonSpinner(false)
      })
  }
  return (
    <div className="sign-up-or-log-in">
      <h2>
        Welcome back
        <hr />
      </h2>
      <form onSubmit={handleSubmit}>
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
        <button>
          {showButtonSpinner ? <div className="small-spinner"></div> : "Log In"}
        </button>
      </form>
      {error && <div className="sign-up-or-log-in-error">{error}</div>}
    </div>
  )
}

export default Login
