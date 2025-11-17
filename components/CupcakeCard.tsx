
import React from 'react';
import { Cupcake } from '../types';
import { useCart } from '../App';

interface CupcakeCardProps {
    cupcake: Cupcake;
}

const CupcakeCard: React.FC<CupcakeCardProps> = ({ cupcake }) => {
    const { addToCart } = useCart();
    
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
            <img src={cupcake.image} alt={cupcake.name} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-pink-800">{cupcake.name}</h3>
                <p className="text-gray-600 mt-2 flex-grow">{cupcake.description}</p>
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-2xl font-bold text-pink-600">${cupcake.price.toFixed(2)}</span>
                    <button
                        onClick={() => addToCart(cupcake.id)}
                        className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors duration-200 font-semibold"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CupcakeCard;
