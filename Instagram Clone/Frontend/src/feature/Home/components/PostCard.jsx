import { useToggleLike } from "../hooks/useLikeDLike"

// features/home/components/PostCard.jsx
const PostCard = ({ post }) => {
    const { isLiked, likesCount, toggleLike, loading } = useToggleLike(
        post.isLiked,
        post.likesCount,
        post._id
    )

    return (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg">

            {/* Post header */}
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    <img
                        src={post.userId?.profileImage || "https://picsum.photos/200"}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-semibold">{post.userId?.username}</span>
                </div>
                <button className="text-neutral-400 text-lg">•••</button>
            </div>

            {/* Post image */}
            <img
                src={post.imageUrl}
                className="w-full object-cover"
            />

            {/* Post actions */}
            <div className="px-4 py-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <div className="flex gap-4 text-2xl">
                        <button onClick={toggleLike} disabled={loading}>
                            {isLiked ? "❤️" : "🤍"}
                        </button>
                        <button>💬</button>
                        <button>📤</button>
                    </div>
                    <button className="text-2xl">🔖</button>
                </div>

                {/* Likes */}
                <p className="text-sm font-semibold">{likesCount} likes</p>

                {/* Caption */}
                <p className="text-sm">
                    <span className="font-semibold mr-1">{post.userId?.username}</span>
                    {post.caption}
                </p>

                {/* Comments */}
                <p className="text-xs text-neutral-500 cursor-pointer">
                    View all comments
                </p>

                {/* Add comment */}
                <div className="flex items-center gap-2 border-t border-neutral-800 pt-2">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
                    />
                    <button className="text-blue-400 text-sm font-semibold">Post</button>
                </div>
            </div>

        </div>
    )
}

export default PostCard