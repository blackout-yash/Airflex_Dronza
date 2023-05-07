import { motion } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import { server } from '../../redux/store'
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from 'react';

const Login = () => {
    const [show, setShow] = useState(false);
    const loginHandler = () => {
        window.open(`${server}/googlelogin`, "_self");
        // window.location.reload();
    }

    const options = {
        initial: { y: "-100vh" },
        animate: { y: 0 }
    }

    const onChange = () => {
        setShow(false);
    }

    return (
        <section className="login">
            {
                show ? <ReCAPTCHA
                    sitekey="6LdwaMAlAAAAAOEXb-XZ_n5dEsAAXyJzULMfWEwt"
                    onChange={onChange} /> :
                    <motion.button {...options} onClick={loginHandler}>
                        Login with Google
                        <FcGoogle />
                    </motion.button>
            }
        </section>
    )
}

export default Login