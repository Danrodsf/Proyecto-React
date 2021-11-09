import React, { useState, useEffect } from 'react';

const Movie = () => {

    const [movie, setMovie] = useState(JSON.parse(localStorage.getItem("ChoosenMovie")))

    useEffect(() => {

        console.log(movie);

    }, [])

    const order = () => {

        console.log(`you have rented ${movie.id}`)

    }

    return (
        <div className="view">
            <h4>Movie Number: {JSON.stringify(movie.id)}</h4>
            <h2>{JSON.stringify(movie.title)}</h2>
            <p>Genre: {JSON.stringify(movie.genre)}</p>
            <p>Available City: {JSON.stringify(movie.city)}</p>
            <p>Cast: {JSON.stringify(movie.cast)}</p>
            <button onClick={() => order()}>Rent</button>
        </div>
    )
};

export default Movie;