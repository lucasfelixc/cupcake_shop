
import React from 'react';

interface OrderSuccessPageProps {
  setPage: (page: 'shop') => void;
}

const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({ setPage }) => {
    return (
        <div className="text-center py-20 max-w-2xl mx-auto bg-white p-10 rounded-xl shadow-lg">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-pink-700 mb-4">Thank You For Your Order!</h2>
            <p className="text-gray-600 mb-6">
                Your order has been placed successfully. A confirmation email (not really!) has been sent. We hope you enjoy your delicious cupcakes!
            </p>
            <button
                onClick={() => setPage('shop')}
                className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 text-lg font-semibold transition-transform transform hover:scale-105"
            >
                Back to Shop
            </button>
        </div>
    );
};

export default OrderSuccessPage;
