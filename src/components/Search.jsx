import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
   <div className='search'>
     <div>
        <input 
           type='text'
           placeholder='Search Through Thousands of Movies'
           value={searchTerm}
           onChange={(e)=>{setSearchTerm(e.target.value)}}
        />
        <img src="search.svg" alt="Search"></img>
        
     </div>
   </div>
  )
}

export default Search
