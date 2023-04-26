import axios from "axios";
import { server } from "../store";

export const sendMess = (name, email, message) => async (dispatch) => {
    try {
        dispatch({
            type: "contactRequest"
        });

        const { data } = await axios.post(`${server}/contact`, {
            name, email, mess: message
        });

        console.log(data);

        dispatch({
            type: "contactSuccess",
            payload: data.message
        });
    } catch (error) {
        dispatch({
            type: "contactFail",
            payload: error.response.data.message
        });
    }
}