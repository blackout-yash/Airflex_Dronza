import { createReducer } from "@reduxjs/toolkit";

export const orderReducer = createReducer({}, {
    createOrderRequest: (state) => {
        state.loading = true;
    },
    createOrderSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    createOrderFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    paymentVerificationRequest: (state) => {
        state.loading = true;
    },
    paymentVerificationSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    paymentVerificationFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearMessage: (state) => {
        state.message = null;
    },
    clearError: (state) => {
        state.error = null;
    }
});


export const ordersReducer = createReducer({ orders: [] }, {
    getMyOrderRequest: (state) => {
        state.loading = true;
    },
    getMyOrderSuccess: (state, action) => {
        state.loading = false;
        state.orders = action.payload;
    },
    getMyOrderFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    getOrderDetailsRequest: (state) => {
        state.loading = true;
    },
    getOrderDetailsSuccess: (state, action) => {
        state.loading = false;
        state.order = action.payload;
    },
    getOrderDetailsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearMessage: (state) => {
        state.message = null;
    },
    clearError: (state) => {
        state.error = null;
    }
});