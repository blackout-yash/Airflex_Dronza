import { Link } from 'react-router-dom';
import imgdrone1 from '../../assets/drone1.png';
import imgdrone2 from '../../assets/drone2.png';
import imgdrone3 from '../../assets/drone3.png';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

const CartItem = ({ value, title, img, increment, decrement }) => {
    return (
        <div className="cartItem">
            <div>
                <h4>{title}</h4>
                <img src={img} alt={title} />
            </div>
            <div>
                <button onClick={decrement}>-</button>
                <input type="number" readOnly value={value} />
                <button onClick={increment}>+</button>
            </div>
        </div>
    )
}

const Cart = () => {
    const {
        cartItems: {
            drone1,
            drone2,
            drone3
        },
        subTotal, tax, shippingCharges, total
    } = useSelector(state => state._cart);
    const { cartItems: orderItems } = useSelector(state => state._cart);

    const dispatch = useDispatch();

    const increment = (item) => {
        switch (item) {
            case 1:
                dispatch({ type: "drone1Increment" });
                dispatch({ type: "calculatePrice" });
                break;
            case 2:
                dispatch({ type: "drone2Increment" });
                dispatch({ type: "calculatePrice" });
                break;
            case 3:
                dispatch({ type: "drone3Increment" });
                dispatch({ type: "calculatePrice" });
                break;
            default:
        }
    };

    const decrement = (item) => {
        switch (item) {
            case 1:
                dispatch({ type: "drone1Decrement" });
                dispatch({ type: "calculatePrice" });
                break;
            case 2:
                dispatch({ type: "drone2Decrement" });
                dispatch({ type: "calculatePrice" });
                break;
            case 3:
                dispatch({ type: "drone3Decrement" });
                dispatch({ type: "calculatePrice" });
                break;
            default:
        }
    };

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(orderItems));
        localStorage.setItem("cartPrices", JSON.stringify({
            subTotal, tax, shippingCharges, total
        }));
    }, [orderItems, subTotal, tax, shippingCharges, total]);


    return (
        <section className="cart">
            <main>
                <CartItem
                    title={"DJI Mavic Mini"}
                    img={imgdrone1}
                    value={drone1.quantity}
                    increment={() => increment(1)}
                    decrement={() => decrement(1)}
                />
                <CartItem
                    title={"JJRC X6"}
                    img={imgdrone2}
                    value={drone2.quantity}
                    increment={() => increment(2)}
                    decrement={() => decrement(2)}
                />
                <CartItem
                    title={"E88 Foldable"}
                    img={imgdrone3}
                    value={drone3.quantity}
                    increment={() => increment(3)}
                    decrement={() => decrement(3)}
                />

                <article>
                    <div>
                        <h4>Sub Total</h4>
                        <p>₹{subTotal}</p>
                    </div>
                    <div>
                        <h4>Tax</h4>
                        <p>₹{tax}</p>
                    </div>
                    <div>
                        <h4>Shipping Charges</h4>
                        <p>₹{shippingCharges}</p>
                    </div>
                    <div>
                        <h4>Total</h4>
                        <p>₹{total}</p>
                    </div>
                    <Link to='/shipping'>Checkout</Link>
                </article>
            </main>
        </section>
    )
}

export default Cart