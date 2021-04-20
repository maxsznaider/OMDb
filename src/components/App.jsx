import React from "react"
import axios from "axios"
import NavBar from "./NavBar"
import Picks from "./Picks"
import Search from "./Search"
import SingleFilm from "./SingleFilm"
import NewUser from "./NewUser"
import Login from "./Login"
import Favorites from "./Favorites"
import { Route, Switch } from "react-router"
import { getCurrentUser } from "../store/currentUser"
import { loadStoreFavorites } from "../store/currentFavorites"
import { useDispatch } from "react-redux"

const App = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    axios
      .get("/api/me")
      .then((res) => res.data)
      .then((user) => {
        dispatch(getCurrentUser(user))
        console.log(user)
        return axios
        .post("/api/loadfavorites", {
          userId: user.id,
        })
      }).then((favorites) => {
        dispatch(loadStoreFavorites(favorites.data))
      })
      .catch(()=>console.log("Not Logged In"))
  }, [])

  return (
    <div>
      <NavBar />
      <div className="main-container">
        <Switch>
          <Route
            path="/movies/:movie"
            render={({ match }) => <SingleFilm match={match} />}
          />
          <Route
            path="/search/:query"
            render={({ match }) => <Search match={match} />}
          />
          <Route path="/signup" render={() => <NewUser />} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/favorites" render={() => <Favorites />} />
          <Route path="/" render={() => <Picks />} />
        </Switch>
      </div>
    </div>
  )
}

export default App
