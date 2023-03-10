import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import productsReducer from '../features/products/productsSlice';
import singleProductReducer from '../features/singleProduct/singleProductSlice';
import usersReducer from '../features/users/usersSlice';
import singleUserReducer from '../features/user/userSlice';
import cartReducer from '../features/cart/cartSlice';
import uiReducer from '../features/drawer/drawerSlice';
import orderHistoryReducer from '../features/orderHistory/orderHistorySlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    singleProduct: singleProductReducer,
    users: usersReducer,
    user: singleUserReducer,
    cart: cartReducer,
    ui: uiReducer,
    orderHistory: orderHistoryReducer
    // orders: ordersReducer,
    // singleOrder: singleOrderReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
export * from '../features/drawer/drawerSlice';
