
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/Carousel';
import Meta from '../components/Meta';
import ErrorBoundary from '../components/ErrorBoundary';

import { listProducts } from '../slices/productSlice';

const HomePage = () => {
  const { keyword, pageNumber } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.product);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts({ keyword, pageNumber }));
  }, [dispatch, keyword, pageNumber]);

  // Real categories from database
  const categories = [
    { name: 'Electronics', icon: '📱', count: '2', color: 'bg-blue-500' },
    { name: 'Clothing', icon: '👕', count: '0', color: 'bg-pink-500' },
    { name: 'Books', icon: '📚', count: '0', color: 'bg-purple-500' },
    { name: 'Home & Garden', icon: '🏠', count: '0', color: 'bg-green-500' },
    { name: 'Toys & Games', icon: '🎮', count: '2', color: 'bg-yellow-500' },
  ];
  
  // Debug logging
  console.log('HomePage - categories:', categories);
  console.log('HomePage - products:', products);
  console.log('HomePage - loading:', loading);
  console.log('HomePage - error:', error);

  return (
    <ErrorBoundary>
      <>
        <Meta />
        
        {/* Hero Section */}
        {!keyword && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 mb-12">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-5xl font-bold mb-4">
                Welcome to Adel's Store
              </h1>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Discover amazing products at unbeatable prices. Quality guaranteed with fast shipping and excellent customer service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/search"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Shop Now
                </Link>
                <Link
                  to="/register"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Join Us
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Categories Section */}
        {!keyword && (
          <section className="mb-12">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {categories.map((category, index) => {
                  // Calculate actual product count for this category
                  const productCount = products ? products.filter(product => {
                    if (product.category && typeof product.category === 'object') {
                      return product.category.name === category.name;
                    }
                    return product.category === category.name;
                  }).length : 0;
                  
                  // Define category-specific icons and colors
                  const getCategoryStyle = (categoryName) => {
                    switch (categoryName) {
                      case 'Electronics':
                        return { icon: '📱', color: 'bg-blue-500' };
                      case 'Clothing':
                        return { icon: '👕', color: 'bg-pink-500' };
                      case 'Books':
                        return { icon: '📚', color: 'bg-purple-500' };
                      case 'Home & Garden':
                        return { icon: '🏠', color: 'bg-green-500' };
                      case 'Toys & Games':
                        return { icon: '🎮', color: 'bg-yellow-500' };
                      default:
                        return { icon: '📦', color: 'bg-gray-500' };
                    }
                  };
                  
                  const categoryStyle = getCategoryStyle(category.name);
                  
                  // Add safety checks for category data
                  const safeCategory = {
                    name: category?.name || 'Category',
                    icon: categoryStyle.icon,
                    color: categoryStyle.color,
                    count: productCount
                  };
                  
                  return (
                    <Link
                      key={index}
                      to={`/search/${safeCategory.name.toLowerCase()}`}
                      className="group text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className={`w-16 h-16 ${safeCategory.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <span className="text-2xl">{safeCategory.icon}</span>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">{safeCategory.name}</h3>
                      <p className="text-sm text-gray-600">{safeCategory.count} products</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Featured Products Section */}
        <section className="mb-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">
                {keyword ? `Search Results for "${keyword}"` : 'Featured Products'}
              </h2>
              {!keyword && (
                <Link
                  to="/search"
                  className="text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-2"
                >
                  <span>View All</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <Message variant="danger">{error}</Message>
              </div>
            ) : products && products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {products.map((product) => {
                    // Add safety check for product data
                    if (!product || !product._id) {
                      console.warn('Invalid product data:', product);
                      return null;
                    }
                    return <Product key={product._id} product={product} />;
                  })}
                </div>
                
                {/* Pagination */}
                {pages > 1 && (
                  <div className="mt-12">
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">
                  {keyword ? `We couldn't find any products matching "${keyword}"` : 'Check back later for new products!'}
                </p>
                {keyword && (
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Browse All Products
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Store?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We provide the best shopping experience with quality products, fast delivery, and excellent customer service.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Products</h3>
                <p className="text-gray-600">Carefully curated selection of premium products from trusted brands.</p>
              </div>
              
              {/* Feature 2 */}
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Quick and reliable shipping to get your products to you as soon as possible.</p>
              </div>
              
              {/* Feature 3 */}
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 0l3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600">Our customer service team is always here to help you with any questions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest products, exclusive offers, and shopping tips.
            </p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-l-lg border-0 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
              <button className="bg-blue-800 text-white px-6 py-3 rounded-r-lg hover:bg-blue-900 transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </>
    </ErrorBoundary>
  );
};

export default HomePage;
