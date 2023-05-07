import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer, ordersReducer } from "./reducers/orderReducer";
import { adminReducer } from "./reducers/adminReducer";
import { messageReducer } from "./reducers/messReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        _cart: cartReducer,
        order: orderReducer,
        orders: ordersReducer,
        admin: adminReducer,
        _mess: messageReducer
    }
});

export default store;

// export const server = "http://localhost:4000/api";
export const server = "https://airflex.onrender.com/api";

