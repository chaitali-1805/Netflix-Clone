import React, { useEffect, useState } from 'react'
import axios from './axios';
import requests from './requests';
import './Row.css';

const base_url = "https://image.tmdb.org/t/p/original"

function Row({ title , fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);

    // Snippet of code which runs based on a specific condition/variable
    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            console.log(request);
            setMovies(request.data.results);
            return requests;
        }
        fetchData();
        // if [], run once when the row loads the it dont loads
        // if it has [movies] the it loads every time when movies are changes
    }, [fetchUrl]);

    console.log(movies);
    return (
        <div className="row">
            {/* title */}
            <h2>{title}</h2>
            <div className="row__posters">
                {/* various row posters */}
                { movies.map(movie => (
                    <img 
                        key = {movie.id}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path: movie.backdrop_path}`} 
                        alt={movie.name} />
                ))}
            </div>
            {/* container -> posters */}

        </div>
    )
}

export default Row
