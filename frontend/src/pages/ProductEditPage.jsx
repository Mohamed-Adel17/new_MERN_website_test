
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProductDetails, updateProduct } from '../slices/productSlice';
import api from '../utils/axios.js';

const ProductEditPage = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.product);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.product.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate || {};

  useEffect(() => {
    if (successUpdate) {
      navigate('/admin/productlist');
    } else {
      if (!product || product._id !== id) {
        dispatch(listProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, navigate, id, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await api.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <div className="flex justify-center">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
      >
        <Link to="/admin/productlist" className="btn btn-light my-3">
          Go Back
        </Link>
        <h1 className="text-3xl font-bold mb-4">Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded-md mt-2 border"
              ></input>
            </div>
            <div className="mb-4">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 rounded-md mt-2 border"
              ></input>
            </div>
            <div className="mb-4">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                id="image"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-2 rounded-md mt-2 border"
              ></input>
              <input
                type="file"
                id="image-file"
                label="Choose File"
                onChange={uploadFileHandler}
                className="w-full p-2 rounded-md mt-2 border"
              ></input>
              {uploading && <Loader />}
            </div>
            <div className="mb-4">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                id="brand"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full p-2 rounded-md mt-2 border"
              ></input>
            </div>
            <div className="mb-4">
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                type="number"
                id="countInStock"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                className="w-full p-2 rounded-md mt-2 border"
              ></input>
            </div>
            <div className="mb-4">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 rounded-md mt-2 border"
              ></input>
            </div>
            <div className="mb-4">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 rounded-md mt-2 border"
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Update
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ProductEditPage;
