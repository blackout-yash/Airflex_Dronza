import { motion } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import { server } from '../../redux/store'

const Login = () => {
    const loginHandler = () => {
        window.open(`${server}/googlelogin`, "_self");
    }

    const options = {
        initial: { y: "-100vh" },
        animate: { y: 0 }
    }

    return (
        <section className="login">
            <motion.button {...options} onClick={loginHandler}>
                Login with Google
                <FcGoogle />
            </motion.button>
        </section>
    )
}

export default Login