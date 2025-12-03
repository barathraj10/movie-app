// components/MovieDetails.jsx
import React from 'react';

const MovieDetails = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="bg-primary h-full p-5 fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-dark-100 p-6 h-full overflow-y-scroll scrollbar-hide rounded-lg w-[500px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-600 font-bold text-xl"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-auto h-[50vh] mx-auto rounded mb-4"
        />
        
          <div className="flex flex-row gap-5 mx-5 text-white">
            <div className='flex flex-row gap-1'>
              <img src='star.svg'></img>
              <p>{movie.vote_average ? `${movie.vote_average.toFixed(1)}/10`:'N/A'}</p>
            </div>
            <div className='flex flex-row gap-1'>
              <p className='text-white b-[300px]'>|</p>
              <p className='year'>{movie.release_date ? movie.release_date.split('-')[0]:'N/A'}</p>
            </div>
          </div>
        <p className="text-white m-5 contain-content">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
