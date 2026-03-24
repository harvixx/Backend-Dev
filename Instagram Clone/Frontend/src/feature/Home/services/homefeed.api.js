import api from "../../../api/axios";
export const homefeedapi = async () => {
    const res = await api.get("/posts/gethomefeed");
    return res.data;
}