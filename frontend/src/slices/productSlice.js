
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios.js';

export const listProducts = createAsyncThunk(
  'products/listProducts',
  async ({ keyword = '', pageNumber = '' } = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const listProductDetails = createAsyncThunk(
  'products/listProductDetails',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/api/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const createProductReview = createAsyncThunk(
  'products/createProductReview',
  async ({ id, review }, { getState, rejectWithValue }) => {
    try {
      const { user: { userInfo } } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await api.post(`/api/products/${id}/reviews`, review, config);
      return {};
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const getTopProducts = createAsyncThunk(
  'products/getTopProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/api/products/top`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { user: { userInfo } } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await api.delete(`/api/products/${id}`, config);
      return {};
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user: { userInfo } } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await api.post(`/api/products`, {}, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (product, { getState, rejectWithValue }) => {
    try {
      const { user: { userInfo } } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await api.put(
        `/api/products/${product._id}`,
        product,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: { products: [], product: { reviews: [] }, topProducts: [], productReviewCreate: {}, productDelete: {}, productCreate: {}, productUpdate: {}, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(listProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(listProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pages = action.payload.pages;
        state.page = action.payload.page;
      })
      .addCase(listProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(listProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(listProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(listProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProductReview.pending, (state) => {
        state.productReviewCreate.loading = true;
      })
      .addCase(createProductReview.fulfilled, (state, action) => {
        state.productReviewCreate.loading = false;
        state.productReviewCreate.success = true;
      })
      .addCase(createProductReview.rejected, (state, action) => {
        state.productReviewCreate.loading = false;
        state.productReviewCreate.error = action.payload;
      })
      .addCase(getTopProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTopProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.topProducts = action.payload;
      })
      .addCase(getTopProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.productDelete.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.productDelete.loading = false;
        state.productDelete.success = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.productDelete.loading = false;
        state.productDelete.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.productCreate.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.productCreate.loading = false;
        state.productCreate.success = true;
        state.productCreate.product = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.productCreate.loading = false;
        state.productCreate.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.productUpdate.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.productUpdate.loading = false;
        state.productUpdate.success = true;
        state.productUpdate.product = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.productUpdate.loading = false;
        state.productUpdate.error = action.payload;
      })
      .addCase('product/reset', (state) => {
        state.products = [];
        state.product = { reviews: [] };
        state.topProducts = [];
        state.loading = false;
        state.error = null;
      });
  },
});

export const resetProducts = () => ({ type: 'product/reset' });

export default productSlice.reducer;
