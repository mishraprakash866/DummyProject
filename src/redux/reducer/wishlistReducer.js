import { createSlice } from '@reduxjs/toolkit';

export const wishlistReducer = createSlice({
    name: 'wishlist',
    initialState: {
        productList: []
    },
    reducers: {
        addProduct: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.productList = [...state.productList, ...action.payload];
            } else {
                state.productList.push(action.payload);
            }
        },
        removeProduct: (state, action) => {
            let item = state.productList.filter(
                el => el.id == action.payload.id,
            )[0];

            state.productList.splice(state.productList.indexOf(item), 1);
        }
    },
});

export const {
    addProduct,
    removeProduct
} = wishlistReducer.actions;

export default wishlistReducer.reducer;