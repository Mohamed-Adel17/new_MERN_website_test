
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios.js';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await api.post(
        '/api/users/login',
        { email, password },
        config
      );

      localStorage.setItem('userInfo', JSON.stringify(data));
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

export const logout = createAsyncThunk('user/logout', async () => {
  localStorage.removeItem('userInfo');
});

export const register = createAsyncThunk(
  'user/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await api.post(
        '/api/users',
        { name, email, password },
        config
      );

      localStorage.setItem('userInfo', JSON.stringify(data));
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

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { user: { userInfo } } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await api.get(`/api/users/${id}`, config);
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

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (user, { getState, rejectWithValue }) => {
    try {
      const { user: { userInfo } } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await api.put(`/api/users/profile`, user, config);
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

export const listUsers = createAsyncThunk(
  'user/listUsers',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user: { userInfo } } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await api.get(`/api/users`, config);
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

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { user: { userInfo } } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await api.delete(`/api/users/${id}`, config);
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

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, { getState, rejectWithValue }) => {
    try {
      const { user: { userInfo } } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await api.put(`/api/users/${user._id}`, user, config);
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

const userSlice = createSlice({
  name: 'user',
  initialState: { userInfo: userInfoFromStorage, userDetails: { user: {} }, userUpdateProfile: {}, userList: { users: [] }, userDelete: {}, userUpdate: {}, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.userDetails.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.userDetails.loading = false;
        state.userDetails.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.userDetails.loading = false;
        state.userDetails.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.userUpdateProfile.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userUpdateProfile.loading = false;
        state.userUpdateProfile.success = true;
        state.userInfo = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.userUpdateProfile.loading = false;
        state.userUpdateProfile.error = action.payload;
      })
      .addCase(listUsers.pending, (state) => {
        state.userList.loading = true;
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.userList.loading = false;
        state.userList.users = action.payload;
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.userList.loading = false;
        state.userList.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.userDelete.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.userDelete.loading = false;
        state.userDelete.success = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.userDelete.loading = false;
        state.userDelete.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.userUpdate.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userUpdate.loading = false;
        state.userUpdate.success = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.userUpdate.loading = false;
        state.userUpdate.error = action.payload;
      });
  },
});

export default userSlice.reducer;
