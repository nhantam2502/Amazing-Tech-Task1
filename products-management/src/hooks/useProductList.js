import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/Slices/ProductSlice";
import { getProductSelector } from "../redux/selector";
import { useEffect } from "react";

const useProductList = () => {
    const dispatch = useDispatch();
    const productList = useSelector(getProductSelector)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                dispatch(getProduct());
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchProduct();
        return () => {
        };
    }, [dispatch]);

    return productList;
};

export default useProductList;