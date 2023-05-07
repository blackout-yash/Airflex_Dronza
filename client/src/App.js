import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/layout/Header';
import Home from './components/home/Home';
import Footer from './components/layout/Footer';
import Contact from './components/contact/Contact';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import PaymentSuccess from './components/cart/PaymentSuccess';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import MyOrders from './components/myOrders/MyOrders';
import OrderDetails from './components/myOrders/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import Users from './components/admin/Users';
import Order from './components/admin/Order';
import About from './components/about/About';
import NotFound from './components/layout/NotFound';

import './styles/app.scss'
import './styles/header.scss'
import './styles/home.scss'
import './styles/founder.scss'
import './styles/menu.scss'
import './styles/footer.scss'
import './styles/contact.scss'
import './styles/cart.scss'
import './styles/shipping.scss'
import './styles/confirmOrder.scss'
import './styles/paymentSuccess.scss'
import './styles/login.scss'
import './styles/profile.scss'
import './styles/table.scss'
import './styles/orderDetails.scss'
import './styles/dashboard.scss'
import './styles/about.scss'
import './styles/notFound.scss'
import './styles/loader.scss'

import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from './redux/actions/user';
import { ProtectedRoute } from "protected-route-react";

function App() {
  const dispatch = useDispatch();
  const { error, message, user, isAuthenticated } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({
        type: "clearError"
      })
    }

    if (message) {
      toast.success(message);
      dispatch({
        type: "clearMessage"
      })
    }
  }, [dispatch, error, message])


  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/about' element={<About />} />

        <Route path='/login' element={
          <ProtectedRoute
            isAuthenticated={!isAuthenticated}
            redirect="/me">
            <Login />
          </ProtectedRoute>
        } />

        <Route element={<ProtectedRoute
          isAuthenticated={isAuthenticated} />}>
          <Route path='/me' element={<Profile />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/confirmorder' element={<ConfirmOrder />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/order/:id' element={<OrderDetails />} />
        </Route>

        <Route path='/paymentsuccess' element={<PaymentSuccess />} />

        <Route element={<ProtectedRoute
          isAuthenticated={isAuthenticated}
          adminRoute={true}
          isAdmin={user && user.role === "admin"}
          redirectAdmin="/me" />}>
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/users' element={<Users />} />
          <Route path='/admin/orders' element={<Order />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </Router >
  )
}

export default App;



// import axios from "axios";


// function App() {
//   const server = "https://airflex.onrender.com/api";
//   // const server = "http://localhost:2323";

//   const handle1 = async (e) => {
//     e.preventDefault();
//     try {
//       window.open(`${server}/googlelogin`, "_self");
//       // const data = await axios.get(`${server}/googlelogin`, {
//       //   withCredentials: true
//       // });
//       const data = await axios.get(`${server}/me`, {
//         withCredentials: true
//       });
//       console.log("handler1: ", data);
//     } catch (error) {
//       console.log("error handler1: ", error);
//     }
//   }

//   const handle2 = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await axios.get(`${server}/me`, {
//         withCredentials: true
//       });
//       console.log("handler2: ", data);
//     } catch (error) {
//       console.log("error handler2: ", error);
//     }
//   }

//   const handle3 = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await axios.get(`${server}/logout`, {
//         withCredentials: true
//       });
//       console.log("handler3: ", data);
//     } catch (error) {
//       console.log("error handler3: ", error);
//     }
//   }

//   return (
//     <div className="App">
//       <button onClick={handle1}>cookie</button>
//       <button onClick={handle2}>check</button>
//       <button onClick={handle3}>logout</button>
//     </div>
//   );
// }

// export default App;
