import axios from "axios";

export const getProductList = ({skip, limit=10}) => {
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    return axios.get(url);
}