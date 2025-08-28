
import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { listProducts, deleteProduct, createProduct } from '../slices/productSlice';

const ProductListPage = () => {
  const { pageNumber } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.product);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.product.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete || {};

  const productCreate = useSelector((state) => state.product.productCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate || {};

  const userLogin = useSelector((state) => state.user);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts({ pageNumber }));
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          onClick={createProductHandler}
        >
          <i className="fas fa-plus"></i> Create Product
        </button>
      </div>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">NAME</th>
                  <th className="px-4 py-2">PRICE</th>
                  <th className="px-4 py-2">CATEGORY</th>
                  <th className="px-4 py-2">BRAND</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="border px-4 py-2">{product._id}</td>
                    <td className="border px-4 py-2">{product.name}</td>
                    <td className="border px-4 py-2">${product.price}</td>
                    <td className="border px-4 py-2">
                      {typeof product.category === 'object' ? product.category.name : product.category}
                    </td>
                    <td className="border px-4 py-2">{product.brand}</td>
                    <td className="border px-4 py-2">
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <button className="bg-blue-500 text-white py-1 px-2 rounded-md mr-2">
                          <i className="fas fa-edit"></i>
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 text-white py-1 px-2 rounded-md"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </motion.div>
  );
};

export default ProductListPage;
