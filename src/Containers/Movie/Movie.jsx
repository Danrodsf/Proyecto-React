import React, { useState, useEffect } from 'react';

const Movie = () => {

    let genre = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Science Fiction",
        10770: "TV Movie",
        53: "Thriller",
        10752: "War",
        37: "Western"
    }

    const [movie, setMovie] = useState(JSON.parse(localStorage.getItem("ChoosenMovie")))

    useEffect(() => {

        console.log(movie);

    }, [])

    const order = () => {

        console.log(`you have rented ${movie.id}`)

    }

    return (
        <div className="view">
            <div className="movie_container">
                <div className="movie">
                    <img alt={movie.id} className="poster" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
                    <h2>{JSON.stringify(movie.title)}</h2>
                    {movie.genre_ids.map(gen => (
                        <div key={gen} className="genres">
                            <p>{genre[gen]}</p>
                        </div>
                    ))}
                    <p>Release Date: {JSON.stringify(movie.release_date)}</p>
                    <p>Vote Avg: {JSON.stringify(movie.vote_average)}</p>
                    <button onClick={() => order()}>Rent</button>
                </div>
            </div>
        </div>
    )
};

export default Movie;