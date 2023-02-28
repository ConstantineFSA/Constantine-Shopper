import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import productsReducer from '../features/products/productsSlice';
import singleProductReducer from '../features/singleProduct/singleProductSlice';
import usersReducer from '../features/users/usersSlice';
import singleUserReducer from '../features/user/userSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    singleProduct: singleProductReducer,
    users: usersReducer,
    user: singleUserReducer,
    // orders: ordersReducer,
    // singleOrder: singleOrderReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
