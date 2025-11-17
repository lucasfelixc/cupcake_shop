
import React from 'react';
import { useAuth, useCart } from '../App';

interface HeaderProps {
    setPage: (page: 'shop' | 'cart' | 'checkout' | 'success') => void;
}

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const Header: React.FC<HeaderProps> = ({ setPage }) => {
    const { logout } = useAuth();
    const { itemCount } = useCart();

    return (
        <header className="bg-white shadow-md sticky top-0 z-10">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setPage('shop')}>
                     <span className="text-3xl">🧁</span>
                     <h1 className="text-2xl font-bold text-pink-600 tracking-tight">Cupcake Corner</h1>
                </div>
                <nav className="flex items-center space-x-6">
                    <button onClick={() => setPage('shop')} className="text-gray-600 hover:text-pink-600 transition-colors duration-200">Shop</button>
                    <button onClick={() => setPage('cart')} className="relative text-gray-600 hover:text-pink-600 transition-colors duration-200">
                        <CartIcon />
                        {itemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {itemCount}
                            </span>
                        )}
                    </button>
                    <button onClick={logout} className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-transform duration-200 transform hover:scale-105">
                        Logout
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
