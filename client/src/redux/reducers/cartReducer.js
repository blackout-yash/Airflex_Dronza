import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem("cartItems") ?
        JSON.parse(localStorage.getItem("cartItems")) :
        {
            drone1: {
                quantity: 0,
                price: 64999
            },
            drone2: {
                quantity: 0,
                price: 4490
            },
            drone3: {
                quantity: 0,
                price: 25999
            }
        },
    subTotal: localStorage.getItem("cartPrices") ?
        JSON.parse(localStorage.getItem("cartPrices")).subTotal : 0,
    tax: localStorage.getItem("cartPrices") ?
        JSON.parse(localStorage.getItem("cartPrices")).tax : 0,
    shippingCharges: localStorage.getItem("cartPrices") ?
        JSON.parse(localStorage.getItem("cartPrices")).shippingCharges : 0,
    total: localStorage.getItem("cartPrices") ?
        JSON.parse(localStorage.getItem("cartPrices")).total : 0,
    shippingInfo: localStorage.getItem("shippingInfo") ?
        JSON.parse(localStorage.getItem("shippingInfo")) : {}
};

export const cartReducer = createReducer(initialState, {
    drone1Increment: (state) => {
        state.cartItems.drone1.quantity += 1;
    },
    drone2Increment: (state) => {
        state.cartItems.drone2.quantity += 1;
    },
    drone3Increment: (state) => {
        state.cartItems.drone3.quantity += 1;
    },
    drone1Decrement: (state) => {
        state.cartItems.drone1.quantity -= 1;
        state.cartItems.drone1.quantity = Math.max(state.cartItems.drone1.quantity, 0);
    },
    drone2Decrement: (state) => {
        state.cartItems.drone2.quantity -= 1;
        state.cartItems.drone2.quantity = Math.max(state.cartItems.drone2.quantity, 0);
    },
    drone3Decrement: (state) => {
        state.cartItems.drone3.quantity -= 1;
        state.cartItems.drone3.quantity = Math.max(state.cartItems.drone3.quantity, 0);
    },
    calculatePrice: (state) => {
        state.subTotal = (state.cartItems.drone1.price * state.cartItems.drone1.quantity) +
            (state.cartItems.drone2.price * state.cartItems.drone2.quantity) +
            (state.cartItems.drone3.price * state.cartItems.drone3.quantity);

        state.tax = parseInt((state.subTotal * 0.18).toFixed(2));
        state.shippingCharges = (state.subTotal === 0 || state.subTotal > 10000) ? 0 : 500;
        state.total = state.subTotal + state.tax + state.shippingCharges;
    },
    emptyState: (state) => {
        state.cartItems = {
            drone1: {
                quantity: 0,
                price: 64999
            },
            drone2: {
                quantity: 0,
                price: 4490
            },
            drone3: {
                quantity: 0,
                price: 25999
            }
        };
        state.subTotal = 0;
        state.tax = 0;
        state.shippingCharges = 0;
        state.total = 0;
    },
    addShippingInfo: (state, action) => {
        state.shippingInfo = {
            hNo: action.payload.hNo,
            city: action.payload.city,
            country: action.payload.country,
            state: action.payload.state,
            phoneNo: action.payload.phoneNo,
            pinCode: action.payload.pinCode
        }
    }
})