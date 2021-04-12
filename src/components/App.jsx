import React from "react"
import NavBar from "./NavBar"
import Picks from "./Picks"
import Search from "./Search"
import SingleFilm from "./SingleFilm"
import NewUser from "./NewUser"
import Login from "./Login"
import Favorites from "./Favorites"
import { Route, Switch } from "react-router"

export default class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="main-container">
          <Switch>
            <Route path="/movies/:movie" render={({match}) => <SingleFilm match={match}/>} />
            <Route path="/search/:query" render={({match}) => <Search match={match}/>} />
            <Route path="/signup" render={() => <NewUser />} />
            <Route path="/login" render={() => <Login />} />
            <Route path="/favorites" render={() => <Favorites />} />
            <Route path="/" render={() => <Picks />} />
          </Switch>
          </div>
      </div>
    )
  }
}
