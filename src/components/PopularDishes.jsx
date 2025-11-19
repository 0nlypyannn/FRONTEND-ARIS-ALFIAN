import React, { useState } from 'react';
import Card from './Card';
import menu from '../data/menu'; // Mengimpor data menu
import Categories from './Categories'; // Mengimpor komponen Categories

const PopularDishes = ({ onAddToCart }) => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredMenu = activeCategory === 'All'
        ? menu
        : menu.filter(item => item.category === activeCategory);

    return (
        <div className='py-10 px-5 lg:px-0 lg:py-20 bg-gray-800' id='menu'>
            <div className='text-center max-w-7xl mx-auto'>
                <h1 className='text-3xl lg:text-4xl font-bold text-red-500'>Popular Dishes</h1>
                <p className='lg:text-xl text-sm pt-2 text-white'>Check out our most popular and highly-rated dishes.</p>
                
                {/* Menambahkan komponen Categories di sini */}
                <Categories 
                  onCategorySelect={setActiveCategory} 
                  activeCategory={activeCategory} 
                />
                
                <div className='grid grid-cols-1 lg:grid-cols-3 pt-11 gap-7'>
                    {filteredMenu.map((item) => (
                        <Card key={item.id} menu={item} onAddToCart={onAddToCart}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularDishes;