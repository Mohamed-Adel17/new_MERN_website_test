
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../slices/orderSlice';

const OrderPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.order);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.order);
  const { loading: loadingPay, success: successPay } = orderPay;

  useEffect(() => {
    if (!order || order._id !== id || successPay) {
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, order, id, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder({ orderId: id, paymentResult }));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="flex justify-center">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold mb-4">Order {order._id}</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`} className="text-blue-500">
                  {order.user.email}
                </a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </div>

            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </div>

            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2"></th>
                        <th className="px-4 py-2">Product</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems.map((item, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          </td>
                          <td className="border px-4 py-2">
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </td>
                          <td className="border px-4 py-2">{item.qty}</td>
                          <td className="border px-4 py-2">
                            ${item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          <div className="md:col-span-1 bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Items</span>
              <span>${order.itemsPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>${order.shippingPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>${order.taxPrice}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span>${order.totalPrice}</span>
            </div>
            {loadingPay && <Loader />}
            {!order.isPaid && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
                onClick={() => successPaymentHandler({ id: 'mock_payment_id', status: 'COMPLETED', update_time: new Date().toISOString(), email_address: order.user.email })}
              >
                Mark As Paid (Mock Payment)
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderPage;
