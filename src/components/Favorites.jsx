import React from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import {
  removeFromStoreFavorites,
} from "../store/currentFavorites"
import { Link } from "react-router-dom"

const Icon = ({ movie }) => {
  const currentUser = useSelector((state) => state.currentUser)

  const dispatch = useDispatch()

  const removeFromFavorites = function () {
    axios
      .post("/api/removefromfavorites", {
        apiId: movie.apiId,
        userId: currentUser.id,
      })
      .then(() =>
        dispatch(
          removeFromStoreFavorites({
            apiId: movie.apiId,
          })
        )
      )
  }

  if (Object.keys(movie).length === 0) return null
  else
    return (
      <div className="test" onClick={() => removeFromFavorites()}>
        <i className="add-icon fas fa-trash-alt fa-2x"></i>
      </div>
    )
}

const Favorites = () => {
  const currentFavorites = useSelector((state) => state.currentFavorites)

  return (
    <>
      <div className="results-title">
        <h1>{currentFavorites.length === 0 ? "No Favorites" : "Your Favorites"}</h1>
        <hr />
      </div>
      <div className="results-container">
        {currentFavorites.length > 0
          ? currentFavorites.map((movie, index) => (
              <div className="single-result" key={index}>
                <Icon movie={movie} />
                <Link to={`/movies/${movie.apiId}`}>
                  <img src={movie.Poster} alt={movie.Title}/>
                </Link>
                <hr />
                <h5>
                  {movie.Title} <span className="year">({movie.Year})</span>
                </h5>
              </div>
            ))
          : null}
      </div>
    </>
  )
}

export default Favorites
