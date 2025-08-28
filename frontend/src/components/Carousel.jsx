
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { getTopProducts } from '../slices/productSlice';
import Loader from './Loader';
import Message from './Message';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.product.topProducts);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear',
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  };

  // Fallback hero banners if no products are available
  const fallbackBanners = [
    {
      id: 1,
      title: "New Collection Arrived",
      subtitle: "Discover the latest trends and styles",
      description: "Shop our newest arrivals with up to 50% off",
      buttonText: "Shop Now",
      buttonLink: "/search",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      bgColor: "from-blue-600 to-purple-600"
    },
    {
      id: 2,
      title: "Summer Sale",
      subtitle: "Limited Time Offer",
      description: "Get ready for summer with our exclusive collection",
      buttonText: "Explore",
      buttonLink: "/search",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      bgColor: "from-orange-500 to-pink-500"
    },
    {
      id: 3,
      title: "Free Shipping",
      subtitle: "On Orders Over $50",
      description: "Enjoy free shipping on all orders above $50",
      buttonText: "Learn More",
      buttonLink: "/search",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      bgColor: "from-green-500 to-teal-500"
    }
  ];

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  // Use products if available, otherwise use fallback banners
  const carouselItems = products && products.length > 0 ? products : fallbackBanners;

  return (
    <div className="mb-12">
      <Slider {...settings} className="hero-carousel">
        {carouselItems.map((item) => (
          <div key={item._id || item.id} className="relative">
            {/* Background Image */}
            <div className="relative h-96 md:h-[500px] overflow-hidden">
              <img 
                src={item.image || item.image} 
                alt={item.name || item.title} 
                className="w-full h-full object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl">
                    {item.subtitle && (
                      <p className="text-blue-300 font-medium mb-2 text-lg">
                        {item.subtitle}
                      </p>
                    )}
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                      {item.name || item.title}
                    </h2>
                    {item.description && (
                      <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                    {item.price && (
                      <p className="text-3xl font-bold text-blue-300 mb-6">
                        ${item.price}
                      </p>
                    )}
                    <Link
                      to={item.buttonLink || `/product/${item._id}`}
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      {item.buttonText || "Shop Now"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      
      {/* Custom CSS for better carousel styling */}
      <style jsx>{`
        .hero-carousel .slick-dots {
          bottom: 20px;
        }
        .hero-carousel .slick-dots li button:before {
          color: white;
          font-size: 12px;
        }
        .hero-carousel .slick-dots li.slick-active button:before {
          color: #3B82F6;
        }
        .hero-carousel .slick-prev,
        .hero-carousel .slick-next {
          z-index: 10;
          width: 50px;
          height: 50px;
        }
        .hero-carousel .slick-prev {
          left: 20px;
        }
        .hero-carousel .slick-next {
          right: 20px;
        }
        .hero-carousel .slick-prev:before,
        .hero-carousel .slick-next:before {
          font-size: 24px;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default ProductCarousel;
