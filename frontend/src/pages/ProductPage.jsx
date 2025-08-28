
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { listProductDetails, createProductReview } from '../slices/productSlice';
import { addToCart } from '../slices/cartSlice';

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.product);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.user);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.product.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } = productReviewCreate || {};

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <img src={product.image} alt={product.name} className="w-full rounded-lg" />
            </motion.div>

            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="mb-4">
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </div>
              <p className="text-lg mb-4">Price: ${product.price}</p>
              <p className="mb-4">{product.description}</p>

              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <div>Price:</div>
                  <strong>${product.price}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <div>Status:</div>
                  <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                </div>

                {product.countInStock > 0 && (
                  <div className="flex justify-between items-center mt-4">
                    <div>Qty</div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="p-2 rounded-md"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <motion.button
                  onClick={addToCartHandler}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 disabled:opacity-50"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </motion.button>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            {product.reviews.length === 0 && <Message>No Reviews</Message>}
            <div>
              {product.reviews.map((review) => (
                <div key={review._id} className="bg-gray-100 p-4 rounded-lg mb-4">
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </div>
              ))}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Write a Customer Review</h2>
                {errorProductReview && (
                  <Message variant="danger">{errorProductReview}</Message>
                )}
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <div className="mb-4">
                      <label htmlFor="rating">Rating</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="w-full p-2 rounded-md mt-2"
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="comment"
                        rows="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-2 rounded-md mt-2"
                      ></textarea>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
                      Submit
                    </button>
                  </form>
                ) : (
                  <Message>
                    Please <Link to="/login">sign in</Link> to write a review
                  </Message>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductPage;
