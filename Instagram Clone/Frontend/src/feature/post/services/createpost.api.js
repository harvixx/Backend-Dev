import api from "../../../api/axios";
export const createPostApi = async (data) => {
    const res = await api.post("/posts/createPost", data);
    return res.data;
}