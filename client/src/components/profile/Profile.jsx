import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MdDashboard } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/actions/user'
import Loader from '../layout/Loader'

const Profile = () => {
    const dispatch = useDispatch();
    const { loading, user } = useSelector(state => state.auth);
    const logoutHandler = () => {
        dispatch(logout());
    }

    const options1 = {
        initial: { y: "-100%", opacity: 0 },
        animate: { y: 0, opacity: 1 }
    }
    const options2 = {
        initial: { x: "-100vh", opacity: 0 },
        animate: { x: 0, opacity: 1 }
    }

    return (
        <>
            {loading ? <Loader /> :
                <section className="profile">
                    <main>
                        <motion.img src={user && user.photo} alt="user" {...options1} />
                        <motion.h5 {...options1} transition={{ delay: 0.3 }}>{user && user.name}</motion.h5>
                        {user && user.role === "admin" && (
                            <motion.div {...options1} transition={{ delay: 0.5 }}>
                                <Link to='/admin/dashboard'
                                    style={{
                                        borderRadius: 0,
                                        backgroundColor: "rgb(40,40,40)",
                                        color: "white",
                                        fontWeight: "normal",
                                    }}
                                > <MdDashboard />Dashboard</Link>
                            </motion.div>)
                        }
                        <motion.div {...options2} transition={{ delay: 0.5 }}>
                            <Link to='/myorders'>Orders</Link>
                        </motion.div>
                        <motion.button {...options2} transition={{ delay: 0.3 }}
                            onClick={logoutHandler}>Logout</motion.button>
                    </main>
                </section>
            }
        </>
    )
}

export default Profile