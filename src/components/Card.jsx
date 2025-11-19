// Card.jsx
import React from 'react'

// Tambahkan prop 'onAddToCart' di sini
const Card = ({ menu, onAddToCart }) => {
  return (
    <div className='rounded-lg border-red-500 flex flex-col items-center space-y-4 py-4 px-6 bg-orange-50 shadow-orange-500 shadow-md'>
      <img src={menu.pizza} alt="food" className='w-48'/>
      <h2 className='text-2xl font-semibold'>{menu.name}</h2>
      <p>{menu.desc}</p>
      {/* Tambahkan event handler onClick untuk memanggil fungsi onAddToCart */}
      <button 
        onClick={() => onAddToCart(menu)} 
        className='px-3 py-2 bg-red-500 text-white rounded-lg w-full'>
        Order Now
      </button>
    </div>
  )
}

export default Card