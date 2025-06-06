import React from 'react'

const Genre = ({ genre: { id, name },onClick,thumbnail }) => {
  return (
    <div onClick={onClick} className="movie-card cursor-pointer hover:shadow-lg hover:shadow-blue-300 transition duration-300 text-center p-4 border border-gray-700 hover:border-blue-400 rounded-lg">
      {thumbnail ? (
        <img src={thumbnail} alt={name} className="mx-auto  object-cover" />
      ) : (
        <div className="w-full h-[120px] bg-gray-300 flex items-center justify-center text-sm text-gray-700">
          No Image
        </div>
      )}
      <h3 className="text-white text-sm font-medium" key={id}>
        {name}
      </h3>
    </div>
  )
}

export default Genre
