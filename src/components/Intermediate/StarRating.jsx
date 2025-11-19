import React, { useState } from 'react';
import { Star } from 'lucide-react';
import Nav from '../Nav';

const StarRating = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <>
            <Nav />
            <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
                <h1 className="text-3xl font-bold mb-8">Star Rating</h1>

                <div className="flex gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            className="focus:outline-none transition-transform hover:scale-110"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                        >
                            <Star
                                size={48}
                                className={`transition-colors duration-200 ${star <= (hover || rating)
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300 dark:text-gray-600'
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                {rating > 0 && (
                    <div className="text-xl font-medium animate-fade-in">
                        You selected {rating} star{rating !== 1 ? 's' : ''}
                    </div>
                )}
            </div>
        </>
    );
};

export default StarRating;
