import Axios from "axios"


export const createProduct = async (data) => {
    const response = await Axios.post('/api/products', data);
    return response;
}



