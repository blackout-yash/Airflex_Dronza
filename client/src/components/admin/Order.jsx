import { Link } from 'react-router-dom'
import { AiOutlineEye } from 'react-icons/ai'
import { GiArmoredBoomerang } from 'react-icons/gi'
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrders, processOrder } from '../../redux/actions/admin';
import { useEffect } from 'react';
import Loader from '../layout/Loader';
import { toast } from 'react-hot-toast';

const Order = () => {
    const dispatch = useDispatch();
    const { loading, orders, message, error } = useSelector(state => state.admin);

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch({
                type: "clearMessage"
            })
        }
        if (error) {
            toast.error(error);
            dispatch({
                type: "clearError"
            })
        }
        dispatch(getAdminOrders());
    }, [dispatch, error, message]);

    const processOrderHandler = (id) => {
        dispatch(processOrder(id));
    }

    return (
        <>
            {(loading || orders === undefined) ? <Loader /> :
                <section className="tableClass">
                    <main>
                        <table>
                            <thead>
                                <tr>
                                    <th>Order Id</th>
                                    <th>Status</th>
                                    <th>Item Qty</th>
                                    <th>Amount</th>
                                    <th>Payment Method</th>
                                    <th>User</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders && orders.map((i) => (
                                        <tr key={i}>
                                            <td>#{i._id}</td>
                                            <td>{i.orderStatus}</td>
                                            <td>{
                                                i.orderItems.drone1.quantity +
                                                i.orderItems.drone2.quantity +
                                                i.orderItems.drone3.quantity
                                            }</td>
                                            <td>₹{i.totalAmount}</td>
                                            <td>{i.paymentMethod}</td>
                                            <td>{i.user ? i.user.name : "NA"}</td>
                                            <td>
                                                <Link to={`/order/${i._id}`}><AiOutlineEye /></Link>
                                                <button onClick={() => processOrderHandler(i._id)}><GiArmoredBoomerang /></button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </main>
                </section>
            }
        </>
    )
}

export default Order