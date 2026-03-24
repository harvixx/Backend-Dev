import { useState, useEffect } from "react"
import { homefeedapi } from "../services/homefeed.api"

export function useHomefeed() {
    const [homeFeedPosts, setHomeFeedPosts] = useState([])
    const [feedLoading, setFeedLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getfeed() {
            try {
                setFeedLoading(true)
                setError(null)
                const data = await homefeedapi()
                setHomeFeedPosts(data.posts)
            } catch (error) {
                if (error.response) {
                    setError(error.response.data.message)
                } else {
                    setError("Server not reachable")
                }
            } finally {
                setFeedLoading(false)
            }
        }
        getfeed()
    }, [])

    return { homeFeedPosts, feedLoading, error }
}