import React, { useEffect, useState, Suspense } from 'react'
import Search from './components/Search'
import Loading from './components/Loading';
import MovieCard from './components/MovieCard';
import { useDebounce} from 'react-use';
import { updateCount } from './appwrite';
import PageLoading from './components/Genre';
import Genre from './components/Genre';


const MovieDetails=React.lazy(()=>import("./components/MovieDetails"));
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
  const [selectedMovie, setSelectedMovie]=useState(null);
  const [genre, setGenre]=useState(null);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [genreThumbnails, setGenreThumbnails] = useState({});



  useDebounce(()=>setDebouncedSearchTerm(searchTerm),1000,[searchTerm]);

  const fetchThumbnailForGenre = async (genreId) => {
  try {
    const res = await fetch(
      `${API_BASE}/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`,
      API_OPTIONS
    );
    const data = await res.json();
    const firstMovie = data.results?.[0];
    if (firstMovie) {
      setGenreThumbnails(prev => ({
        ...prev,
        [genreId]: `https://image.tmdb.org/t/p/w500${firstMovie.poster_path}`,
      }));
    }
  } catch (err) {
    console.error(`Failed to fetch thumbnail for genre ${genreId}:`, err);
  }
};


  const fetchGenre = async (setGenre) => {
  try {
    const response = await fetch(`${API_BASE}/genre/movie/list`, API_OPTIONS);
    const data = await response.json();
    setGenre(data.genres);

    // Fetch a sample thumbnail for each genre
    data.genres.forEach(g => fetchThumbnailForGenre(g.id));
  } catch (error) {
    console.log(error);
  }
};

  useEffect(()=>{
    fetchGenre(setGenre);
  },[setGenre])
  const fetchMovies=async(query='')=>{
    
    setIsLoading(true);
    setErrorMessage('');

    try{
      const endpoint=query ?  `${API_BASE}/search/movie?query=${query}` :selectedGenreId!=null?`${API_BASE}/discover/movie?with_genres=${selectedGenreId}&sort_by=popularity.desc`
                      :`${API_BASE}/discover/movie?sort_by=popularity.desc`;
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
      console.log(data);

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

  useEffect(() => {
  if (selectedGenreId !== null) {
    fetchMovies();
  }
}, [selectedGenreId]);


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
          <Suspense fallback={<div><p className='text-white'>Loading Details...</p></div>}>
            {selectedMovie && <MovieDetails movie={selectedMovie} onClose={()=>setSelectedMovie(null)}/>}
          </Suspense>
          <h2 className='text-white mt-[40px]'>Explore Different Genres</h2>

{genre && (
  <div className="relative mt-4">
    {/* Fading left edge */}
    <div className="absolute left-0 top-0 h-full w-12 z-10 pointer-events-none bg-gradient-to-r from-blue-400 to-transparent opacity-30" />

    {/* Fading right edge */}
    <div className="absolute right-0 top-0 h-full w-12 z-10 pointer-events-none bg-gradient-to-l from-blue-400 to-transparent opacity-30" />

    {/* Marquee scroll container */}
    <div className="overflow-x-auto hide-scrollbar">
      <div className="whitespace-nowrap">
         {genre.map((item) => (
                <div className="inline-block mr-4 w-[150px] ">
                  <Genre key={item.id}  thumbnail={genreThumbnails[item.id]} genre={item} onClick={()=>setSelectedGenreId(item.id)}/>
                </div>
              ))}
      </div>
    </div>
  </div>
      )}

          <h2 className='text-blue-500 mt-[40px]'>Popular Movies</h2>
          {isLoading ? (
            <Loading className='text-white-600'/>
          ): errorMessage?(
            <p className='text-red-500'>{errorMessage}</p>
          ):(
            <ul>
              {movies.map((movie)=>(
                  <MovieCard  key={movie.id} movie={movie} onClick={()=>setSelectedMovie(movie)}/>
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
