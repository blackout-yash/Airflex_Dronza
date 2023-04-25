import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer, ordersReducer } from "./reducers/orderReducer";
import { adminReducer } from "./reducers/adminReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        _cart: cartReducer,
        order: orderReducer,
        orders: ordersReducer,
        admin: adminReducer
    }
});

export default store;

// export const server = "https://airflex.vercel.app/api";
export const server = "http://localhost:4000/api";