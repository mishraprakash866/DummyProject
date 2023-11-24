import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './reducer/cartReducer';
import wishlistReducer from './reducer/wishlistReducer';


export default configureStore({
    reducer: {
        'cart': cartReducer,
        'wishlist': wishlistReducer
    },
});