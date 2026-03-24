import { useState } from "react"
import { likeApi, dislikeApi } from "../services/likeDlike.api"

export function useToggleLike(initialIsLiked, initialLikesCount, postId) {
    const [isLiked, setIsLiked] = useState(initialIsLiked)
    const [likesCount, setLikesCount] = useState(initialLikesCount)
    const [loading, setLoading] = useState(false)

    async function toggleLike() {
        if (loading) return  // double click rokna

        try {
            setLoading(true)

            if (isLiked) {
                await dislikeApi(postId)
                setIsLiked(false)
                setLikesCount(prev => prev - 1)
            } else {
                await likeApi(postId)
                setIsLiked(true)
                setLikesCount(prev => prev + 1)
            }

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return { isLiked, likesCount, toggleLike, loading }
}