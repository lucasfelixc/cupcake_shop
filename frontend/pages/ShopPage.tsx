
import React from 'react';
import { CUPCAKES_DATA } from '../constants';
import CupcakeCard from '../components/CupcakeCard';

const ShopPage: React.FC = () => {
    return (
        <div>
            <h2 className="text-4xl font-bold text-center text-pink-700 mb-8">Our Delicious Cupcakes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {CUPCAKES_DATA.map(cupcake => (
                    <CupcakeCard key={cupcake.id} cupcake={cupcake} />
                ))}
            </div>
        </div>
    );
};

export default ShopPage;
