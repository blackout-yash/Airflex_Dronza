import { Country, State } from "country-state-city";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
    const { shippingInfo } = useSelector(state => state._cart);

    const [hNo, setHNo] = useState(shippingInfo && shippingInfo.hNo);
    const [city, setCity] = useState(shippingInfo && shippingInfo.city);
    const [country, setCountry] = useState(shippingInfo && shippingInfo.country);
    const [state, setState] = useState(shippingInfo && shippingInfo.state);
    const [phoneNo, setPhoneNo] = useState(shippingInfo && shippingInfo.phoneNo);
    const [pinCode, setPinCode] = useState(shippingInfo && shippingInfo.pinCode);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch({
            type: "addShippingInfo",
            payload: {
                hNo, city, country, state, phoneNo, pinCode
            }
        })

        localStorage.setItem("shippingInfo", JSON.stringify({
            hNo, city, country, state, phoneNo, pinCode
        }));

        navigate("/confirmorder");
    }

    return (
        <section className="shipping" >
            <main>
                <h1>Shipping Details</h1>
                <form onSubmit={submitHandler}>
                    <div>
                        <label>House No.</label>
                        <input type="text" required placeholder='Enter House Number'
                            value={hNo}
                            onChange={(e) => setHNo(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>City</label>
                        <input type="text" required placeholder='Enter City'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Country</label>
                        <select
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            <option value="">Country</option>
                            {Country && Country.getAllCountries().map((i) => (
                                <option value={i.isoCode} key={i.isoCode}>{i.name}</option>
                            ))}
                        </select>
                    </div>
                    {country &&
                        <div>
                            <label>State</label>
                            <select
                                required
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            >
                                <option value="">State</option>
                                {State && State.getStatesOfCountry(country).map((i) => (
                                    <option value={i.isoCode} key={i.isoCode}>{i.name}</option>
                                ))}
                            </select>
                        </div>
                    }
                    <div>
                        <label>Pincode</label>
                        <input type="number" required placeholder='Enter Pincode'
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Mobile No.</label>
                        <input type="number" required placeholder='Enter Mobile Number'
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                        />
                    </div>
                    <button type="submit">Confirm Order</button>
                </form>
            </main>
        </section >
    )
}

export default Shipping