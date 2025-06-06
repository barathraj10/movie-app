import React from 'react'

const MovieCard = ({movie:{title,id,overview, poster_path,vote_average,release_date, original_language},onClick}) => {
  return (
    <div className='movie-card cursor-pointer hover:scale-105 transition duration-300' onClick={onClick}>
      <img src={poster_path? `https://image.tmdb.org/t/p/w500/${poster_path}`:'/no-movie.png'} alt={title}></img>
      <h3 className='text-white mt-4' key={id}>{title}</h3>
        <div className='content'>
           <div className='rating'>
                <img src='star.svg'></img>
                <p>{vote_average ? `${vote_average.toFixed(1)}/10`:'N/A'}</p>
            </div>
            <p className='text-white b-[300px]'>|</p>
            <p className='text-white capitalize'>{original_language}</p>

            <p className='text-white b-[300px]'>|</p>
            <p className='year'>{release_date ? release_date.split('-')[0]:'N/A'}</p>
            
        </div>
    </div>
  )
}

export default MovieCard
