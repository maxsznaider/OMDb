import React, { useState } from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import {
  addToStoreFavorites,
  removeFromStoreFavorites,
} from "../store/currentFavorites"
import { Link } from "react-router-dom"

const Icon = ({ movie }) => {
  const currentUser = useSelector((state) => state.currentUser)
  const currentFavorites = useSelector((state) => state.currentFavorites)

  const dispatch = useDispatch()

  const addToFavorites = function () {
    axios
      .post("/api/addtofavorites", {
        apiId: movie.imdbID.slice(2),
        Poster: movie.Poster,
        Title: movie.Title,
        Year: movie.Year,
        userId: currentUser.id,
      })
      .then(() =>
        dispatch(
          addToStoreFavorites({
            apiId: movie.imdbID.slice(2),
            Poster: movie.Poster,
            Title: movie.Title,
            Year: movie.Year,
          })
        )
      )
  }

  const removeFromFavorites = function () {
    axios
      .post("/api/removefromfavorites", {
        apiId: movie.imdbID.slice(2),
        userId: currentUser.id,
      })
      .then(() =>
        dispatch(
          removeFromStoreFavorites({
            apiId: movie.imdbID.slice(2),
          })
        )
      )
  }

  if (Object.keys(movie).length === 0 || typeof currentUser.id !== "number")
    return null
  if (
    currentFavorites
      .map((favorite) => favorite.apiId)
      .includes(movie.imdbID.slice(2))
  )
    return (
      <div className="test" onClick={() => removeFromFavorites()}>
        <i className="add-icon fas fa-trash-alt fa-2x"></i>
      </div>
    )
  else
    return (
      <div className="test" onClick={() => addToFavorites()}>
        <i className="add-icon fas fa-plus-square fa-2x"></i>
      </div>
    )
}

const Search = (props) => {
  const [searchResults, setSearchResults] = useState("loading")

  React.useEffect(() => {
    axios
      .get(
        `https://www.omdbapi.com/?apikey=a82ccc73&s=${props.match.params.query}`
      )
      .then(({ data }) => {
        if (data.Response === "False") setSearchResults([])
        else setSearchResults(data.Search)
      })
      .catch((err) => console.log(err))
    return () => setSearchResults("loading")
  }, [props.match.params.query])

  return (
    <>
      <div className="results-title">
        <h1>
          {searchResults.length === 0
            ? "No Results"
            : searchResults === "loading"
            ? "Loading"
            : "Search Results"}
        </h1>
        <hr />
      </div>
      <div className="results-container">
        {Array.isArray(searchResults) ? (
          searchResults.map((movie, index) => (
            <div className="single-result" key={index}>
              <Icon movie={movie} />
              <Link className="picture" to={`/movies/${movie.imdbID.slice(2)}`}>
                {movie.Poster !== "N/A" ? (
                  <img src={movie.Poster} alt={movie.Title} />
                ) : (
                  <div className="no-picture">
                    <h1>No Poster Available</h1>
                  </div>
                )}
              </Link>
              <hr />
              <h5>
                {movie.Title} <span className="year">({movie.Year})</span>
              </h5>
            </div>
          ))
        ) : (
          <div className="spinner-box">
            <div className="circle-border">
              <div className="circle-core"></div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Search
