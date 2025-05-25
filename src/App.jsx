import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Loading from './components/Loading';
import MovieCard from './components/MovieCard';
import { useDebounce} from 'react-use';
import { updateCount } from './appwrite';

const API_BASE='https://api.themoviedb.org/3';

const API_KEY=import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS={
  method:'GET',
  headers:{
    accept:'application/json',
    Authorization:`Bearer ${API_KEY}`
  }
}



const App = () => {

  const [searchTerm, setSearchTerm]=useState('');
  const [errorMessage, setErrorMessage]=useState('');
  const [movies,setMovies]=useState([]);
  const [isLoading, setIsLoading]=useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm]=useState('');

  useDebounce(()=>setDebouncedSearchTerm(searchTerm),500,[searchTerm]);
  
  const fetchMovies=async(query='')=>{
    
    setIsLoading(true);
    setErrorMessage('');

    try{
      const endpoint=query ?  `${API_BASE}/search/movie?query=${query}` :`${API_BASE}/discover/movie?sport_by=popularity.desc`;
      const response= await fetch(endpoint, API_OPTIONS);
      if(!response.ok){
        throw new Error();
      }
      const data=await response.json();
      if(data.Response==='False'){
        setErrorMessage(data.error||'Failed to Fetch Movie');
        setMovies([]);
        return;
      }
      setMovies(data.results || []);

    }
    catch(error){
      console.log(`Failed To Load Movies: ${error}`);
      setErrorMessage("Error Fetching Movie");
    }
    finally{
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    fetchMovies(debouncedSearchTerm);
  },[debouncedSearchTerm]);

  return (
    <main>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src='./hero.png' alt='Hero Background'></img>
          <h1>
            Find <span className='text-gradient'>Movies</span> you'll enjoy
          </h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <h1 className='text-white'>{searchTerm}</h1>
        </header>
        <section className='all-movies'>
          <h2 className='text-blue-500 mt-[40px]'>All Movies</h2>
          {isLoading ? (
            <Loading className='text-white-600'/>
          ): errorMessage?(
            <p className='text-red-500'>{errorMessage}</p>
          ):(
            <ul>
              {movies.map((movie)=>(
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </section>

        <footer>
          <p className='text-center text-white mt-4'>&copy; 2025 Barath Raj. All Rights Reserved.</p>
        </footer>
      </div>
    </main>
  )
}

export default App
