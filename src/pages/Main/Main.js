import cogoToast from 'cogo-toast';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../assests/img/loader.svg'

const Main = () => {
    const [text,setText]= useState("")
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("")
    const movieList = JSON.parse(sessionStorage.getItem("movies"))
    const inputText= sessionStorage.getItem("input")
    


    const handleSearch=()=>{
        setLoading(true)
        if(text === ""){
            return cogoToast.error("Please Type A Movie Name") && setLoading(false)
        }

        fetch(`https://www.omdbapi.com/?s=${text}&apikey=22e936a5`)
        .then(res=>res.json())
        .then(data=>{
            if(data.Search){
            sessionStorage.setItem("input",text)
            sessionStorage.setItem("movies",JSON.stringify(data.Search))
            setError("")
            setLoading(false)
            }else{
                setError(data.Error)
                sessionStorage.removeItem("movies")
                setLoading(false)
            }
        })
    }

    if(loading){
        return <img className='mx-auto mt-40' src={Loader} alt="loader" />
    }
    

    return (
        <div className='mt-10 px-5'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10'>
                <div></div>
               <div className='relative'>
                    <input defaultValue={inputText} className='focus:outline-none border-[1px] border-gray-400 h-10 pl-3 w-full rounded-full pr-[120px]' type="text" placeholder='Type Movie' onChange={(e)=>setText(e.target.value)}  />
                    <button className='absolute bg-teal-600 text-white py-2 px-8 rounded-full font-semibold right-[0px] focus:ring-2 ring-cyan-600' onClick={handleSearch}>Search</button>
               </div>
            </div>
            {
                error && <div>
                    {error}
                </div>
            }
            {
                movieList?.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    movieList?.map(movie=><div className='shadow mb-5' key={movie.imdbID}>
                    <img className='w-full h-[450px]' src={movie.Poster} alt="movie img" />
                    <div className='pl-2 pt-4 pb-2 flex flex-col'>
                        <h3 className='text-2xl '>{movie.Title}</h3>
                        <p className='my-1'>Release Year: {movie.Year}</p>
                        <div>
                            <Link to={`/movie-details/${movie.Title}`} >
                             <button className='bg-teal-600 text-white py-2 px-8 font-semibold mt-2 rounded'>See Details</button>
                             </Link>
                        </div>
                    </div>
                </div>)
                }
                </div> : <div className='text-center py-14 text-gray-400'>Nothing to show !</div>
            }
            
        </div>
    );
};

export default Main;


