import React, { useState } from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import {
  addToStoreFavorites,
  removeFromStoreFavorites,
} from "../store/currentFavorites"

const Metascore = ({ selectedMovie }) => {
  if (selectedMovie.Metascore < 40)
    return (
      <div className="metascore">
        <span className="score red">{selectedMovie.Metascore}</span>Metascore
      </div>
    )
  if (selectedMovie.Metascore >= 40 && selectedMovie.Metascore < 60)
    return (
      <div className="metascore">
        <span className="score yellow">{selectedMovie.Metascore}</span>Metascore
      </div>
    )
  if (selectedMovie.Metascore > 60)
    return (
      <div className="metascore">
        <span className="score green">{selectedMovie.Metascore}</span>Metascore
      </div>
    )
  if (!selectedMovie.Metascore || selectedMovie.Metascore === "N/A")
    return <div className="metascore">Metascore Not Available</div>
}

const Icon = ({ selectedMovie }) => {
  const currentUser = useSelector((state) => state.currentUser)
  const currentFavorites = useSelector((state) => state.currentFavorites)

  const dispatch = useDispatch()

  const addToFavorites = function () {
    axios
      .post("/api/addtofavorites", {
        apiId: selectedMovie.imdbID.slice(2),
        Poster: selectedMovie.Poster,
        Title: selectedMovie.Title,
        Year: selectedMovie.Year,
        userId: currentUser.id,
      })
      .then(() =>
        dispatch(
          addToStoreFavorites({
            apiId: selectedMovie.imdbID.slice(2),
            Poster: selectedMovie.Poster,
            Title: selectedMovie.Title,
            Year: selectedMovie.Year,
          })
        )
      )
  }

  const removeFromFavorites = function () {
    axios
      .post("/api/removefromfavorites", {
        apiId: selectedMovie.imdbID.slice(2),
        userId: currentUser.id,
      })
      .then(() =>
        dispatch(
          removeFromStoreFavorites({
            apiId: selectedMovie.imdbID.slice(2),
          })
        )
      )
  }

  if (
    Object.keys(selectedMovie).length === 0 ||
    typeof currentUser.id !== "number"
  )
    return null
  if (
    currentFavorites
      .map((favorite) => favorite.apiId)
      .includes(selectedMovie.imdbID.slice(2))
  )
    return (
      <span onClick={removeFromFavorites} className="add-to-favorites">
        <i className="single-movie-icon fas fa-trash-alt"></i> Remove from
        Favorites
      </span>
    )
  else
    return (
      <span onClick={addToFavorites} className="add-to-favorites">
        <i className="single-movie-icon fas fa-plus"></i> Add to Favorites
      </span>
    )
}

const SingleFilm = (props) => {
  const [selectedMovie, setSelectedMovie] = useState("")

  React.useEffect(() => {
    axios
      .get(
        `http://www.omdbapi.com/?i=tt${props.match.params.movie}&apikey=a82ccc73&plot=full`
      )
      .then(({ data }) => {
        let characters
        if (data.Writer.length < 190 && data.Title.length < 30)
          setSelectedMovie(data)
        if (data.Writer.length > 84 && data.Title.length >= 30) characters = 84
        if (data.Writer.length > 172 && data.Title.length < 30) characters = 172
        data.Writer = data.Writer.split(" ")
        let counter = 0
        let limit = 0
        for (let i = 0; i < data.Writer.length; i++) {
          counter += data.Writer[i].length
          if (counter >= characters) {
            limit = i + 1
            break
          }
        }
        data.Writer = data.Writer.slice(0, limit).join(" ") + " ..."
        setSelectedMovie(data)
      })
      .catch((err) => console.log(err))
    return () => setSelectedMovie("")
  }, [])

  return (
    <>
      {typeof selectedMovie === "object" ? (
        <div>
          <div className="poster-and-main-credits">
            <div className="poster">
              {selectedMovie.Poster !== "N/A" ? (
                <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
              ) : null}
            </div>
            <div className="title-and-main-credits">
              <div>
                <div className="movie-title">
                  <span>
                    {selectedMovie.Title}{" "}
                    <span className="year">({selectedMovie.Year})</span>
                  </span>
                  <Icon selectedMovie={selectedMovie} />
                </div>
                <div className="specs">
                  {selectedMovie.Rated} | {selectedMovie.Runtime} |{" "}
                  {selectedMovie.Genre} | {selectedMovie.Released} (
                  {selectedMovie.Country}){" "}
                </div>
                <hr />
              </div>
              <Metascore selectedMovie={selectedMovie} />
              <div className="main-credits">
                <div>Director: {selectedMovie.Director}</div>
                <div>Writers: {selectedMovie.Writer}</div>
                <div>Stars: {selectedMovie.Actors}</div>
              </div>
            </div>
          </div>
          <div className="plot">
            <h1>Storyline</h1>
            <p>{selectedMovie.Plot}</p>
          </div>
          <br />
        </div>
      ) : (
        <div className="spinner-box">
          <div className="circle-border">
            <div className="circle-core"></div>
          </div>
        </div>
      )}
    </>
  )
}

export default SingleFilm
