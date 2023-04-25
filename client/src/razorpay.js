import axios from "axios";
import { server } from "./redux/store";
import { paymentVerification } from "./redux/actions/order";
import { toast } from "react-hot-toast";


export const razorpay = async (shippingInfo, orderItems, paymentMethod, itemsPrice, taxPrice, shippingCharges, totalAmount, dispatch) => {
    try {
        const { data: {
            order, orderOptions, key
        } } = await axios.post(`${server}/createorderonline`, {
            shippingInfo, orderItems, paymentMethod, itemsPrice, taxPrice, shippingCharges, totalAmount
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });

        const options = {
            key: key,
            amount: order.amount,
            currency: "INR",
            name: "Airflex",
            description: "Airflex - Dronza",
            order_id: order.id,
            handler: function (response) {
                const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
                dispatch(paymentVerification(razorpay_payment_id, razorpay_order_id, razorpay_signature, orderOptions));
            },
            theme: {
                color: "#e6cc00"
            }
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
    } catch (error) {
        toast.error(error);
    }
}