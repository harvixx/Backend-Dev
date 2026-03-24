import api from "../../../api/axios";
export const registerUser = async (data) => {
    const res = await api.post("/auth/register", data);
    return res.data;
}
export const loginUser = async (data) => {
    const res = await api.post("/auth/login", data);
    return res.data;
};
export const getMe = async () => {
    const res = await api.get("/auth/getme");
    return res.data;
};
export const logout = async () => {
    const res = await api.post("/auth/logout");
    return res.data;
};