import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminUsers } from "../../redux/actions/admin";
import Loader from "../layout/Loader";
import { RiAdminFill } from "react-icons/ri";
import axios from "axios";
import { server } from "../../redux/store";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Users = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, users } = useSelector(state => state.admin);

    useEffect(() => {
        dispatch(getAdminUsers());
    }, [dispatch]);

    const roleHandler = async (e, id) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${server}/admin/role/${id}`, {
                withCredentials: true
            });

            toast.success(data.message);
            navigate("/");
            window.location.reload();
        } catch (error) {
            toast.error(error);
        }
    }

    return (
        <>
            {(loading || users === undefined) ? <Loader /> :
                <section className="tableClass">
                    <main>
                        <table>
                            <thead>
                                <tr>
                                    <th>User Id</th>
                                    <th>Name</th>
                                    <th>Photo</th>
                                    <th>Role</th>
                                    <th>Since</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map((i) => (
                                    <tr key={i}>
                                        <td>#{i._id}</td>
                                        <td>{i.name}</td>
                                        <td><img src={i.photo} alt="User" /></td>
                                        <td>{i.role}</td>
                                        <td>{i.createdAt.split("T")[0]}</td>
                                        <td><button onClick={(e) => roleHandler(e, i._id)} style={{
                                            color: "#e6cc00",
                                            fontSize: "1.2rem"
                                        }}><RiAdminFill /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>
                </section>
            }
        </>
    )
}

export default Users