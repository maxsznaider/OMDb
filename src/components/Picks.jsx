import React from "react"
import { Link } from "react-router-dom"

const Picks = () => (
  <>
    <h1 className="picks-title">
      Editor's Picks
      <hr />
    </h1>

    <div className="picks">
      <div className="single-pick">
        <Link to={"/movies/0078788"}>
          <img
            alt={"Apocalypse Now"}
            src="https://m.media-amazon.com/images/M/MV5BMDdhODg0MjYtYzBiOS00ZmI5LWEwZGYtZDEyNDU4MmQyNzFkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
          />
        </Link>
        <hr />
        <h5>Apocalypse Now</h5>
      </div>
      <div className="single-pick">
        <Link to={"/movies/0468569"}>
          <img
            alt={"The Dark Knight"}
            src="https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg"
          />
        </Link>
        <hr />
        <h5>The Dark Knight</h5>
      </div>
      <div className="single-pick">
        <Link to={"/movies/0071315"}>
          <img
            alt={"Chinatown"}
            src="https://m.media-amazon.com/images/M/MV5BOGMwYmY5ZmEtMzY1Yi00OWJiLTk1Y2MtMzI2MjBhYmZkNTQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
          />
        </Link>
        <hr />
        <h5>Chinatown</h5>
      </div>
      <div className="single-pick">
        <Link to={"/movies/1798709"}>
          <img
            alt={"Her"}
            src="https://m.media-amazon.com/images/M/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjEwMDE@._V1_SX300.jpg"
          />
        </Link>
        <hr />
        <h5>Her</h5>
      </div>
      <div className="single-pick">
        <Link to={"/movies/5027774"}>
          <img
            alt={"Three Billboards Outside Ebbing, Missouri"}
            src="https://m.media-amazon.com/images/M/MV5BMjI0ODcxNzM1N15BMl5BanBnXkFtZTgwMzIwMTEwNDI@._V1_SX300.jpg"
          />
        </Link>
        <hr />
        <h5>Three Billboards Outside Ebbing, Missouri</h5>
      </div>
    </div>
  </>
)

export default Picks
