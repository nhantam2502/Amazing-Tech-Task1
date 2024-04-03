import useProductList from "../hooks/useProductList";
import "../styles/Home.css";
import { useState } from "react";

const Home = () => {
    const productList = useProductList();

    // Pop up
    const [popup, setPopup] = useState(null);
    const viewPopup = (productList) => {
        setPopup(productList);
    }

    const closePopup = () => {
        setPopup(null);
    }

    return (
        <div className="container">
            {productList.map(products => (
                <div className="card" key={products.id}>
                    <img src={products.image} alt={products.name} />
                    <h3>{products.name}</h3>
                    <p>Category: {products.category} </p>
                    <p>$ {products.price}</p>
                    <button onClick={() => viewPopup(products)}>Details</button>
                </div>
            ))}

            {popup && (
                <div className="popup">
                    <div className="popup-content">
                        <div>
                            <span className="close" onClick={closePopup}>
                                &times;
                            </span>
                            <img src={popup.image} alt={popup.name} />
                            <h3>{popup.name}</h3>
                            <p>Category: {popup.category} </p>
                            <p>$ {popup.price}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home;