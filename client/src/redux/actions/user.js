import axios from "axios";
import { server } from "../store";


export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "loadUserRequest"
        });

        // const { data } = await axios.get(`${server}/me`, {
        //     withCredentials: true
        // });

        const res = await fetch(`${server}/me`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        console.log(data);

        dispatch({
            type: "loadUserSuccess",
            payload: data.user
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "loadUserFail",
            payload: error.response.data.message
        });
    }
}

export const logout = () => async (dispatch) => {
    try {
        dispatch({
            type: "logoutRequest"
        });

        const data = await axios.get(`${server}/logout`, {
            withCredentials: true
        });

        dispatch({
            type: "logoutSuccess",
            payload: data.data.message
        });
    } catch (error) {
        dispatch({
            type: "logoutFail",
            payload: error.response.data.message
        });
    }
}