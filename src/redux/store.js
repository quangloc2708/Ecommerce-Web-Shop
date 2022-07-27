import { configureStore } from '@reduxjs/toolkit';

import producModalSlice from './product-modal/producModalSlice';
import cartItemsSlice from './shopping-cart/cartItemsSlice';

export const store = configureStore({
    reducer: {
        productModal: producModalSlice,
        cartItems: cartItemsSlice,
    },
});
