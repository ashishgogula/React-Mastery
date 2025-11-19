import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Nav from '../Nav';

const DEFAULT_SUGGESTIONS = [
    "Apple", "Apricot", "Avocado", "Banana", "Blackberry", "Blueberry",
    "Cherry", "Coconut", "Cranberry", "Date", "Dragonfruit", "Durian",
    "Elderberry", "Fig", "Grape", "Grapefruit", "Guava", "Kiwi", "Lemon",
    "Lime", "Mango", "Melon", "Nectarine", "Orange", "Papaya", "Peach",
    "Pear", "Pineapple", "Plum", "Pomegranate", "Raspberry", "Strawberry",
    "Tangerine", "Watermelon"
];

const Autocomplete = ({ suggestions = DEFAULT_SUGGESTIONS }) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        // Close suggestions when clicking outside
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.length > 0) {
            const filtered = suggestions.filter((item) =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
    };

    const clearInput = () => {
        setInputValue('');
        setFilteredSuggestions([]);
        setShowSuggestions(false);
    };

    return (
        <>
            <Nav />
            <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white p-8 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-8">Autocomplete Search</h1>

                <div ref={wrapperRef} className="w-full max-w-md relative">
                    <div className="relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            onFocus={() => inputValue && setShowSuggestions(true)}
                            placeholder="Search fruits..."
                            className="w-full p-4 pl-12 pr-10 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-lg"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />

                        {inputValue && (
                            <button
                                onClick={clearInput}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>

                    {showSuggestions && (
                        <div className="absolute w-full max-h-100 scroll-y mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden z-10 animate-fade-in">
                            {filteredSuggestions.length > 0 ? (
                                <ul>
                                    {filteredSuggestions.map((suggestion, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => handleSuggestionClick(suggestion)}
                                                className="w-full text-left px-4 py-3 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
                                            >
                                                <Search size={14} className="text-gray-400" />
                                                <span dangerouslySetInnerHTML={{
                                                    __html: suggestion.replace(
                                                        new RegExp(`(${inputValue})`, 'gi'),
                                                        (match) => `<span class="font-bold text-blue-600 dark:text-blue-400">${match}</span>`
                                                    )
                                                }} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-4 text-center text-gray-500 dark:text-gray-400 italic">
                                    No matches found
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-12 text-center text-gray-500 dark:text-gray-400 max-w-lg">
                    <p>Try searching for "Apple", "Banana", or "Mango".</p>
                    <p className="text-sm mt-2">Click outside to close suggestions.</p>
                </div>
            </div>
        </>
    );
};

export default Autocomplete;
