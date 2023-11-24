import { createSlice } from '@reduxjs/toolkit';

export const cartReducer = createSlice({
    name: 'cart',
    initialState: {
        productList: [],
        apiTotal: 0,
    },
    reducers: {
        addProductToCart: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.productList = [...state.productList, ...action.payload];
            } else {
                state.productList.push(action.payload);
            }
        },
        removeProductFromCart: (state, action) => {
            let item = state.productList.filter(
                el => el.id == action.payload.id,
            )[0];

            state.productList.splice(state.productList.indexOf(item), 1);
        },
        updateCartProductQuantity: (state, action) => {
            let item = state.productList.filter(
                el => el.id == action.payload.id,
            )[0];

            state.productList[state.productList.indexOf(item)].qty =
                action.payload.qty;
        }
    },
});

export const {
    addProductToCart,
    removeProductFromCart,
    updateCartProductQuantity
} = cartReducer.actions;

export default cartReducer.reducer;