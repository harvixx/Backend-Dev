import api from "../../../api/axios";
export const likeApi = async (postId) => {
    const res = await api.post(`/likes/like/${postId}`)
    return res.data
}

export const dislikeApi = async (postId) => {
    const res = await api.delete(`/likes/unlike/${postId}`)
    return res.data
}