
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../slices/userSlice';

const UserListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.user.userList);
  const { loading, error, users } = userList || {};

  const userLogin = useSelector((state) => state.user);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.user.userDelete);
  const { success: successDelete } = userDelete || {};

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <h1 className="text-3xl font-bold mb-4">Users</h1>
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
                <th className="px-4 py-2">NAME</th>
                <th className="px-4 py-2">EMAIL</th>
                <th className="px-4 py-2">ADMIN</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{user._id}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">
                    <a href={`mailto:${user.email}`} className="text-blue-500">
                      {user.email}
                    </a>
                  </td>
                  <td className="border px-4 py-2">
                    {user.isAdmin ? (
                      <i className="fas fa-check" style={{ color: 'green' }}></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <button className="bg-blue-500 text-white py-1 px-2 rounded-md mr-2">
                        <i className="fas fa-edit"></i>
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded-md"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
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

export default UserListPage;
