// Header.jsx
import { Menu, ShoppingCart } from 'lucide-react';
import React, { useState, useEffect } from 'react'
import chili from '../assets/chili-pepper.png'

function Header({ onCartClick, cartItemCount }) {
    const [header, setHeader] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    useEffect(() => {
        const scrollYPos = window.addEventListener('scroll', () => {
            window.scrollY > 50 ? setHeader(true) : setHeader(false);
        });
        return () => window.removeEventListener('scroll', scrollYPos)
    })

    return (
        <header className={`sticky mx-auto top-0 z-30 bg-orange-100 border-2 border-orange-200 transition-all ${header ? 'py-4 bg-orange-100 shadow-lg ' : 'py-6'} `}>
            <div className="max-w-7xl mx-auto ">
                {/* MobileNav */}
                <div className='flex md:hidden justify-between px-4'>
                    <a href="#hero-section" className="text-primary  flex gap-1 items-center">
                        <img src={chili} width={30} height={30} alt='chilli' />
                        <h1 className='text-red-500 font-bold text-xl '>Spicy<span className="text-gray-800 font-semibold">Bites</span></h1>
                    </a>
                    <div className='flex gap-8'>
                        <button onClick={onCartClick} className='relative flex items-center'>
                            <ShoppingCart className='h-6 w-6' />
                            {cartItemCount > 0 && (<span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{cartItemCount}</span>)}
                        </button>
                        <button className='' onClick={() => setMobileNavOpen(prev => !prev)}>
                            <Menu className='' />
                        </button>
                    </div>
                </div>
                {mobileNavOpen && (
                    <ul onClick={() => setMobileNavOpen(false)} className='md:hidden p-4  bg-orange-100 rounded-lg font-semibold text-xl mt-2 flex flex-col gap-2 text-center'>
                        <a href={'#hero-section'}>Home</a>
                        <a href={'#menu'}>Menu</a>
                        <a href={'#about'}>About</a>
                        <a href={'#contact'}>Contact</a>
                        <a href={'#menu'}>int API</a>
                    </ul>
                )}
                {/* computerNav */}
                <div className='hidden md:flex justify-between items-center px-10 '>
                    <a href="#hero-section" className="text-primary font-semibold flex gap-1 items-center">
                        <img src={chili} className='w-10' />
                        <div className='text-red-500 text-xl font-bold'>Spicy<span className="text-gray-800 font-semibold">Bites</span></div>
                    </a>
                    <div className='flex items-center gap-x-6'>
                        <ul className="flex items-center cursor-pointer gap-8 text-black font-semibold">
                            <a href={'#hero-section'} className='hover:text-red-500 transition-all'>Home</a>
                            <a href={'#menu'} className='hover:text-red-500 transition-all'>Menu</a>
                            <a href={'#about'} className='hover:text-red-500 transition-all'>About</a>
                            <a href={'#contact'} className='hover:text-red-500 transition-all'>Contact</a>
                            <a href={'#menu'} className='hover:text-red-500 transition-all'>int API</a>
                            <div className="flex items-center gap-4">
                                <a href="#menu" className='bg-red-500 px-3 py-2 rounded-lg text-white hover:bg-red-600 hover:scale-110 transition-all'>
                                    Order Now
                                </a>
                                <button onClick={onCartClick} className="relative flex items-center hover:text-red-500 transition-all">
                                    <ShoppingCart className='h-6 w-6' />
                                    {cartItemCount > 0 && (<span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{cartItemCount}</span>)}
                                </button>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header