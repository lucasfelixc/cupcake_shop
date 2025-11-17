
import React, { useState } from 'react';
import { useCart } from '../App';

interface CheckoutPageProps {
  setPage: (page: 'success') => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ setPage }) => {
    const { clearCart, totalPrice } = useCart();
    const [formState, setFormState] = useState({
        name: '',
        address: '',
        city: '',
        zip: '',
        card: '',
        expiry: '',
        cvv: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would process payment here.
        // For this demo, we just clear the cart and show success.
        clearCart();
        setPage('success');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-pink-700 mb-6 text-center">Checkout</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-xl shadow-lg">
                {/* Shipping Information */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-pink-800 border-b pb-2">Shipping Information</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" name="name" onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input type="text" name="address" onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input type="text" name="city" onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                        <input type="text" name="zip" onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500" />
                    </div>
                </div>

                {/* Payment Information */}
                <div className="space-y-4">
                     <h3 className="text-xl font-semibold text-pink-800 border-b pb-2">Payment Details</h3>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Card Number</label>
                        <input type="text" name="card" placeholder="**** **** **** ****" onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500" />
                    </div>
                    <div className="flex space-x-4">
                         <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Expiry (MM/YY)</label>
                            <input type="text" name="expiry" placeholder="MM/YY" onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500" />
                        </div>
                         <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">CVV</label>
                            <input type="text" name="cvv" placeholder="123" onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500" />
                        </div>
                    </div>
                     <div className="border-t pt-4 mt-4">
                        <p className="text-xl font-bold text-right">Total: <span className="text-pink-600">${totalPrice.toFixed(2)}</span></p>
                    </div>
                </div>
                
                <div className="md:col-span-2 text-center">
                    <button type="submit" className="w-full max-w-xs bg-pink-600 text-white px-10 py-3 rounded-full hover:bg-pink-700 text-lg font-semibold transition-transform transform hover:scale-105">
                        Place Order
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;
