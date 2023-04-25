import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersDetails } from "../../redux/actions/order";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader";

const OrderDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { order, loading } = useSelector(state => state.orders);

    useEffect(() => {
        dispatch(getOrdersDetails(params.id));
    }, [dispatch, params.id]);

    return (
        <>
            {(loading || order === undefined) ? <Loader /> :
                <section className="orderDetails">
                    <main>
                        <h1>Order Details</h1>
                        <div>
                            <h1>Shipping</h1>
                            <p>
                                <b>Address</b>
                                {`${order.shippingInfo.hNo} ${order.shippingInfo.city} ${order.shippingInfo.state} ${order.shippingInfo.country} ${order.shippingInfo.pinCode}`}
                            </p>
                        </div>
                        <div>
                            <h1>Contact</h1>
                            <p>
                                <b>Name</b>
                                {order.user.name}
                            </p>
                            <p>
                                <b>Phone No</b>
                                {order.shippingInfo.phoneNo}
                            </p>
                        </div>
                        <div>
                            <h1>Status</h1>
                            <p>
                                <b>Order Status</b>
                                {order.orderStatus}
                            </p>
                            <p>
                                <b>Placed At</b>
                                {order.createdAt.split("T")[0]}
                            </p>
                            <p>
                                <b>Delivered At</b>
                                {order.deliveredAt ? order.deliveredAt.split("T")[0] : "NA"}
                            </p>
                        </div>
                        <div>
                            <h1>Payment</h1>
                            <p>
                                <b>Payment Method</b>
                                {order.paymentMethod}
                            </p>
                            <p>
                                <b>Payment Reference</b>
                                {order.paymentMethod === "Online" ? `#${order.paymentInfo}` : "NA"}
                            </p>
                            <p>
                                <b>Paid At</b>
                                {order.paymentMethod === "Online" ? order.paidAt.split("T")[0] : "NA"}
                            </p>
                        </div>
                        <div>
                            <h1>Amount</h1>
                            <p>
                                <b>Items Total</b>
                                ₹{order.itemsPrice}
                            </p>
                            <p>
                                <b>Shipping Charges</b>
                                ₹{order.shippingCharges}
                            </p>
                            <p>
                                <b>Taxes</b>
                                ₹{order.taxPrice}
                            </p>
                            <p>
                                <b>Total</b>
                                ₹{order.totalAmount}
                            </p>
                        </div>
                        <article>
                            <h1>Ordered Items</h1>
                            <div>
                                <h4>DJI Mavic Mini</h4>
                                <div>
                                    <span>{order.orderItems.drone1.quantity}</span> x <span>{order.orderItems.drone1.price}</span>
                                </div>
                            </div>
                            <div>
                                <h4>JJRC X6</h4>
                                <div>
                                    <span>{order.orderItems.drone2.quantity}</span> x <span>{order.orderItems.drone2.price}</span>
                                </div>
                            </div>
                            <div>
                                <h4>E88 Foldable</h4>
                                <div>
                                    <span>{order.orderItems.drone3.quantity}</span> x <span>{order.orderItems.drone3.price}</span>
                                </div>
                            </div>
                            <div>
                                <h4 style={{ fontWeight: 800 }}>Sub Total</h4>
                                <div style={{ fontWeight: 800 }}>₹{order.itemsPrice}</div>
                            </div>
                        </article>
                    </main>
                </section>
            }
        </>
    )
}

export default OrderDetails