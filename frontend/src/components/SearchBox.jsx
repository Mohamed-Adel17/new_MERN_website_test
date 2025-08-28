
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Sample search suggestions (in a real app, these would come from backend)
  const searchSuggestions = [
    'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Toys',
    'Smartphones', 'Laptops', 'Headphones', 'Shoes', 'Dresses', 'Furniture'
  ];

  useEffect(() => {
    // Load search history from localStorage
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      // Save to search history
      const newHistory = [keyword, ...searchHistory.filter(item => item !== keyword)].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      
      navigate(`/search/${keyword}`);
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setKeyword(suggestion);
    navigate(`/search/${suggestion}`);
    setIsFocused(false);
  };

  const handleHistoryClick = (historyItem) => {
    setKeyword(historyItem);
    navigate(`/search/${historyItem}`);
    setIsFocused(false);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <form onSubmit={submitHandler} className="relative">
        <div className="relative">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {/* Search Input */}
          <input
            type="text"
            name="q"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search for products, brands, and more..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
          />
          
          {/* Search Button */}
          <button 
            type="submit" 
            className="absolute inset-y-0 right-0 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition-colors duration-200 font-medium"
          >
            Search
          </button>
        </div>
      </form>

      {/* Search Suggestions & History Dropdown */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="p-3 border-b border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-gray-700">Recent Searches</h4>
                <button
                  onClick={clearHistory}
                  className="text-xs text-gray-500 hover:text-red-500 transition-colors"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-1">
                {searchHistory.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleHistoryClick(item)}
                    className="w-full text-left px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          <div className="p-3">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Popular Searches</h4>
            <div className="grid grid-cols-2 gap-2">
              {searchSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors hover:text-blue-600"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-3 bg-gray-50 rounded-b-lg">
            <div className="flex space-x-2">
              <span className="text-xs text-gray-500">Quick:</span>
              <button
                onClick={() => handleSuggestionClick('Electronics')}
                className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
              >
                Electronics
              </button>
              <span className="text-xs text-gray-400">•</span>
              <button
                onClick={() => handleSuggestionClick('Fashion')}
                className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
              >
                Fashion
              </button>
              <span className="text-xs text-gray-400">•</span>
              <button
                onClick={() => handleSuggestionClick('Home & Garden')}
                className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
