import axios from "./axios";

export const getProducts = () => {
  return axios.get("/api/products");
};

export const createProduct = (formData)=>{
    return axios.post("/api/products",formData,{
        headers:{
            "Content-Type":"mumultipart/form-data",
        }
    });
}

export const updateProduct = (id, data) => {
  return axios.patch(`/api/products/${id}`, data);
}

export const deleteProduct = (id) => {
  return axios.delete(`/api/products/${id}`);
};