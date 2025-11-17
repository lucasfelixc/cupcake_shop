
import React from 'react';
import { useCart } from '../App';
import { CartItem } from '../types';

interface CartPageProps {
  setPage: (page: 'shop' | 'checkout') => void;
}

const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();
    
    return (
        <div className="flex items-center justify-between border-b py-4">
            <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-cover"/>
                <div>
                    <h4 className="font-bold text-lg text-pink-800">{item.name}</h4>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-lg">-</button>
                    <span className="px-4 py-1">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-lg">+</button>
                </div>
                <p className="font-bold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

const CartPage: React.FC<CartPageProps> = ({ setPage }) => {
    const { cart, totalPrice } = useCart();

    if (cart.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold text-pink-700 mb-4">Your Cart is Empty</h2>
                <p className="text-gray-600 mb-6">Looks like you haven't added any delicious cupcakes yet.</p>
                <button
                    onClick={() => setPage('shop')}
                    className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 text-lg font-semibold transition-transform transform hover:scale-105"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }
    
    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-pink-700 mb-6 border-b pb-4">Your Shopping Cart</h2>
            <div className="space-y-4">
                {cart.map(item => <CartItemRow key={item.id} item={item}/>)}
            </div>
            <div className="mt-8 flex justify-end items-center">
                <div className="text-right">
                    <p className="text-xl">
                        <span className="font-medium text-gray-600">Total:</span>
                        <span className="font-bold text-2xl text-pink-800 ml-4">${totalPrice.toFixed(2)}</span>
                    </p>
                    <button 
                        onClick={() => setPage('checkout')}
                        className="mt-4 bg-pink-600 text-white px-10 py-3 rounded-full hover:bg-pink-700 text-lg font-semibold transition-transform transform hover:scale-105"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
