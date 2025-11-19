import React, { useState, useEffect } from 'react';
import { Star, Send, Trash2 } from 'lucide-react';
import Nav from '../Nav';
import { nanoid } from 'nanoid';

const ProductRating = () => {
    const [rating, setRating] = useState(10);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        const savedComments = localStorage.getItem('product-comments');
        if (savedComments) {
            setComments(JSON.parse(savedComments));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        const newComment = {
            id: nanoid(),
            rating,
            name: name,
            text: comment,
            date: new Date().toLocaleDateString(),
        };

        const updatedComments = [newComment, ...comments];
        setComments(updatedComments);
        localStorage.setItem('product-comments', JSON.stringify(updatedComments));
        setComment('');
        setName('')
        setRating();
    };

    const handleDelete = (id) => {
        const updatedComments = comments.filter((c) => c.id !== id);
        setComments(updatedComments);
        localStorage.setItem('product-comments', JSON.stringify(updatedComments));
    };

    return (
        <>
            <Nav />
            <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white p-4 md:p-8">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">

                    {/* Rating Form */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg h-fit">
                        <h2 className="text-2xl font-bold mb-6 text-center">Rate this Product</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <input className='my-4 border-1 rounded-sm border-gray-300 p-2 w-full' type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)}></input>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Select Rating (1-10)
                                </label>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                        <button
                                            key={num}
                                            type="button"
                                            onClick={() => setRating(num)}
                                            className={`w-10 h-10 rounded-full font-bold transition-all ${rating === num
                                                ? 'bg-blue-600 text-white scale-110 shadow-md'
                                                : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-slate-600'
                                                }`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Your Review
                                </label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write your thoughts here..."
                                    rows="4"
                                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
                            >
                                <Send size={20} />
                                Submit Review
                            </button>
                        </form>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            Recent Reviews
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-slate-700 px-2 py-1 rounded-full">
                                {comments.length}
                            </span>
                        </h3>

                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 thin-scrollbar">
                            {comments.length === 0 ? (
                                <p className="text-center text-gray-500 dark:text-gray-400 py-8 italic">
                                    No reviews yet. Be the first to share your thoughts!
                                </p>
                            ) : (
                                comments.map((review) => (
                                    <div
                                        key={review.id}
                                        className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 animate-fade-in relative group"
                                    >
                                        <button
                                            onClick={() => handleDelete(review.id)}
                                            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Delete review"
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                        <div className="flex flex-col gap-2 mb-2">

                                            <div className='flex flex-row gap-4'>
                                                <h1 className='font-bold text-xl'>  {review.name}</h1>

                                                <div className="flex gap-6 items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-sm">

                                                    <p>{review.rating}</p>

                                                </div>



                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                {review.text}
                                            </p>
                                        </div>


                                        <span className="text-xs text-gray-400">{review.date}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ProductRating;
