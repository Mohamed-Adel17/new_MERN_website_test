
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Rating from './Rating';
import ErrorBoundary from './ErrorBoundary';
import { addToCart } from '../slices/cartSlice';

const Product = ({ product }) => {
  const dispatch = useDispatch();

  // Add safety checks for product data
  if (!product || !product._id) {
    return (
      <div className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-4">
        <div className="text-center text-gray-500">Product data not available</div>
      </div>
    );
  }

  const addToCartHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ ...product, qty: 1 }));
  };

  return (
    <ErrorBoundary>
      <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden">
        <Link to={`/product/${product._id}`} className="block">
          {/* Product Image */}
          <div className="relative overflow-hidden bg-gray-100">
            <img 
              src={product.image || 'https://picsum.photos/400/400?random=1'} 
              alt={product.name || 'Product'} 
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000)}`;
              }}
            />
            {/* Quick View Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium text-sm">
                  Quick View
                </span>
              </div>
            </div>
            
            {/* Badge for new products or discounts */}
            {product.countInStock === 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Out of Stock
              </div>
            )}
            {product.countInStock > 0 && product.countInStock < 10 && (
              <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Low Stock
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            {/* Product Name */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {product.name || 'Product Name'}
            </h3>

            {/* Rating */}
            <div className="mb-3">
              <Rating value={product.rating || 0} text={`${product.numReviews || 0} reviews`} />
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">${product.price || 0}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>
              
              {/* Stock Status */}
              <div className="text-right">
                {product.countInStock > 0 ? (
                  <span className="text-sm text-green-600 font-medium">
                    In Stock ({product.countInStock})
                  </span>
                ) : (
                  <span className="text-sm text-red-600 font-medium">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Category */}
            {product.category && (
              <div className="mb-3">
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  {typeof product.category === 'object' ? product.category.name : product.category}
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = `/product/${product._id}`;
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                >
                  View Details
                </button>
                <button
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors border border-gray-200 rounded-lg hover:border-red-200"
                  title="Add to Wishlist"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              {product.countInStock > 0 && (
                <button
                  onClick={addToCartHandler}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors text-center text-sm"
                >
                  🛒 Add to Cart
                </button>
              )}
            </div>
          </div>
        </Link>
      </div>
    </ErrorBoundary>
  );
};

export default Product;
