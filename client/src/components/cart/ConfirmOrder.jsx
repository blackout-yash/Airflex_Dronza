import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../redux/actions/order";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { razorpay } from "../../razorpay";

const ConfirmOrder = () => {
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState("");
    const [disableBtn, setDisableBtn] = useState(false);

    const dispatch = useDispatch();
    const { cartItems, subTotal, tax, shippingCharges, total, shippingInfo } = useSelector(state => state._cart);
    const { message, error } = useSelector(state => state.order);

    const submitHandler = async (e) => {
        e.preventDefault();
        setDisableBtn(true);

        if (paymentMethod === "COD") {
            dispatch(createOrder(shippingInfo, cartItems, paymentMethod, subTotal, tax, shippingCharges, total));
        }
        else {
            razorpay(shippingInfo, cartItems, paymentMethod, subTotal, tax, shippingCharges, total, dispatch);
        }
    }

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch({
                type: "clearMessage"
            });
            dispatch({
                type: "emptyState"
            });
            navigate("/paymentsuccess");
        }

        if (error) {
            toast.error(error);
            dispatch({
                type: "clearError"
            });
            setDisableBtn(false);
        }
    }, [dispatch, message, error, navigate])


    return (
        <section className="confirmOrder">
            <main>
                <h1>Confirm Order</h1>
                <form onSubmit={submitHandler}>
                    <div>
                        <label>Cash On Delivery</label>
                        <input type="radio" name="payment" required
                            onChange={() => setPaymentMethod("COD")}
                        />
                    </div>
                    <div>
                        <label>Online</label>
                        <input type="radio" name="payment" required
                            onChange={() => setPaymentMethod("Online")}
                        />
                    </div>
                    <button disabled={disableBtn} type="submit">Place Order</button>
                </form>
            </main>
        </section>
    )
}

export default ConfirmOrder