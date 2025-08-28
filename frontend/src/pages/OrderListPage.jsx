
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders, deliverOrder } from '../slices/orderSlice';

const OrderListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.order.orderList);
  const { loading, error, orders } = orderList || {};

  const userLogin = useSelector((state) => state.user);
  const { userInfo } = userLogin;

  const orderDeliver = useSelector((state) => state.order.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver || {};

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo, successDeliver]);

  const deliverHandler = (id) => {
    dispatch(deliverOrder(id));
  };

  return (
    <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <h1 className="text-3xl font-bold mb-4">Orders</h1>
      {loadingDeliver && <Loader />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">USER</th>
                <th className="px-4 py-2">DATE</th>
                <th className="px-4 py-2">TOTAL</th>
                <th className="px-4 py-2">PAID</th>
                <th className="px-4 py-2">DELIVERED</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="border px-4 py-2">{order._id}</td>
                  <td className="border px-4 py-2">{order.user && order.user.name}</td>
                  <td className="border px-4 py-2">{order.createdAt.substring(0, 10)}</td>
                  <td className="border px-4 py-2">${order.totalPrice}</td>
                  <td className="border px-4 py-2">
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    <Link to={`/order/${order._id}`}>
                      <button className="bg-blue-500 text-white py-1 px-2 rounded-md mr-2">Details</button>
                    </Link>
                    {!order.isDelivered && (
                      <button
                        className="bg-green-500 text-white py-1 px-2 rounded-md"
                        onClick={() => deliverHandler(order._id)}
                      >
                        Mark As Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default OrderListPage;
