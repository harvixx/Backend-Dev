import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createPostApi } from "../services/createpost.api"

export function useCreatePost() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    async function createPost(data) {
        try {
            setLoading(true)   // ✅ setter
            setError(null)
            await createPostApi(data)
            navigate(-1)  // "/" ki jagah "/home"
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message)
            } else {
                setError("Server not reachable")
            }
        } finally {
            setLoading(false)
        }
    }

    return { createPost, error, loading }
}