import { motion } from "framer-motion";
import drone from "../../assets/drone4.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMess } from "../../redux/actions/message";
import { toast } from "react-hot-toast";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mess, setMess] = useState("");

    const dispatch = useDispatch();
    const { message, error } = useSelector(state => state._mess);

    const contactHandler = (e) => {
        e.preventDefault();
        dispatch(sendMess(name, email, mess));
        if (message) {
            toast.success(message);
            dispatch({
                type: "clearMessage"
            })
            setName("");
            setEmail("");
            setMess("");
        }
        if (error) {
            toast.error(error);
            dispatch({
                type: "clearError"
            })
        }
    }

    const options1 = {
        initial: { x: "-100%", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { delay: 0.2 }
    }

    const options2 = {
        initial: { x: "100vh", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { delay: 0.2 }
    }

    const option3 = {
        initial: { x: "50%", y: "-100vh", opacity: 0 },
        animate: { x: "50%", y: "-50%", opacity: 1 },
        transition: { delay: 0.4 }
    }

    return (
        <section className="contact">
            <motion.form {...options1} onSubmit={contactHandler}>
                <h2>Contact Us</h2>
                <input type="text" required placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input type="email" required placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <textarea cols="30" rows="10" required placeholder='Message...'
                    value={mess}
                    onChange={(e) => setMess(e.target.value)}
                ></textarea>
                <button type="submit">Send</button>
            </motion.form>
            <motion.div {...options2} className="border">
                <motion.div {...option3}>
                    <img src={drone} alt="buger" />
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Contact