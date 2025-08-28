
import React, { useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart({ product: id, qty }));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <motion.div layout>
            {cartItems.map((item) => (
              <motion.div
                key={item.product}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                  <Link to={`/product/${item.product}`} className="text-lg font-semibold">{item.name}</Link>
                </div>
                <div className="text-lg font-semibold">${item.price}</div>
                <div>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(
                        addToCart({ ...item, qty: Number(e.target.value) })
                      )
                    }
                    className="p-2 rounded-md"
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCartHandler(item.product)}
                  className="text-red-500"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
        </h2>
        <div className="text-lg font-semibold mb-4">
          $ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={checkoutHandler}
          className="w-full bg-blue-500 text-white py-2 rounded-md disabled:opacity-50"
          disabled={cartItems.length === 0}
        >
          Proceed To Checkout
        </motion.button>
      </div>
    </div>
  );
};

export default CartPage;
