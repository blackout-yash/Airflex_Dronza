import MenuCard from "./MenuCard";
import drone1 from "../../assets/drone1.png";
import drone2 from "../../assets/drone2.png";
import drone3 from "../../assets/drone3.png";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

const Menu = () => {
    const dispatch = useDispatch();

    const addToCartHandler = (itemNum) => {
        switch (itemNum) {
            case 1:
                dispatch({ type: "drone1Increment" });
                toast.success("Added to Cart");
                break;
            case 2:
                dispatch({ type: "drone2Increment" });
                toast.success("Added to Cart");
                break;
            case 3:
                dispatch({ type: "drone3Increment" });
                toast.success("Added to Cart");
                break;
            default:
        }
    }

    return (
        <section id="menu">
            <h1>Products</h1>
            <div>
                <MenuCard
                    itemNum={1}
                    burgerSrc={drone1}
                    price={"64,999"}
                    title="DJI Mavic Mini"
                    handler={addToCartHandler}
                    delay={0.1}
                />
                <MenuCard
                    itemNum={2}
                    burgerSrc={drone2}
                    price={"4,490"}
                    title="E88 Foldable"
                    handler={addToCartHandler}
                    delay={0.5}
                />
                <MenuCard
                    itemNum={3}
                    burgerSrc={drone3}
                    price={"25,999"}
                    title="JJRC X6"
                    handler={addToCartHandler}
                    delay={0.8}
                />
            </div>
        </section>
    )
}

export default Menu