import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {FaStar} from 'react-icons/fa'
import Loader from '../../assests/img/loader.svg'


const MovieDetails = () => {
    const [loading,setLoading] = useState(false)
    const [movie,setMovie] = useState({})
    const {title} = useParams()
    useEffect(()=>{
        setLoading(true)
        fetch(`https://www.omdbapi.com/?t=${title}&apikey=22e936a5`)
        .then(res=>res.json())
        .then(data=>{
            setMovie(data)
            setLoading(false)
        })
    },[title])
    if(loading){
        return <img className='mx-auto mt-40' src={Loader} alt="loader" />
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-6 gap-4 md:mt-20 mt-10'>
            <div className='col-start-2 col-span-4'>
                <div className='md:flex block justify-between'>
                    <div>
                        <h2 className='text-4xl font-semibold'>{movie.Title}</h2>
                        <p className='text-gray-500 py-3 font-semibold'>{movie.Year} . {movie.Runtime}</p>
                    </div>
                    <div className='mb-5 md:mb-0'>
                        <h3>Imdb Rating</h3>
                        <p className='font-semibold text-xl'> <FaStar className='inline-block mb-1 text-yellow-500' /> {movie?.imdbRating} <span className='font-normal text-lg'>/ 10</span></p>
                    </div>
                </div>
                <img src={movie.Poster} alt="poster" />
                <div className='py-5' >
                    <h3 className='font-semibold text-xl'>Genre <span className='font-normal text-lg text-blue-500'>{movie.Genre}</span></h3>
                    <p className='py-2 text-lg'>{movie.Plot}</p>
                    <h4 className='font-semibold text-xl'>Director <span className='font-normal text-lg text-blue-500'>{movie.Director}</span></h4>
                    <h4 className='font-semibold text-xl'>Writer <span className='font-normal text-lg text-blue-500'>{movie.Writer}</span></h4>
                    <h4 className='font-semibold text-xl'>Actors <span className='font-normal text-lg text-blue-500'>{movie.Actors}</span></h4>
                    <Link to={"/"}>
                    <button className='text-cyan-500 border-2 border-cyan-500  px-8 py-2 mt-5 rounded font-semibold'>Back To Home</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;