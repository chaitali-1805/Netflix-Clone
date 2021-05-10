import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube';
import axios from './axios';
import requests from './requests';
import './Row.css';
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original"

function Row({ title , fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    // Snippet of code which runs based on a specific condition/variable
    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            // console.log(request);
            setMovies(request.data.results);
            return requests;
        }
        fetchData();
        // if [], run once when the row loads the it dont loads
        // if it has [movies] the it loads every time when movies are changes
    }, [fetchUrl]);
    // console.log(movies);
    
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        // console.log(movie)
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            console.log(movie);
            movieTrailer(movie?.name || "")
            .then((url) => {
                console.log(movie.id);
                console.log(url);
                const urlParams = new URLSearchParams(new URL(url).search);
                console.log(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            })
            .catch((error) => console.log(error));
        }
    };
    
    return (
        <div className="row">
            {/* title */}
            <h2>{title}</h2>
            <div className="row__posters">
                {/* various row posters */}
                { movies.map(movie => (
                    <img 
                        key = {movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path: movie.backdrop_path}`} 
                        alt={movie.name} />
                ))}
            </div>
            {/* container -> posters */}
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
