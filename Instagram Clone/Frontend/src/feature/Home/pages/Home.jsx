// features/home/pages/Home.jsx
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/context/AuthContext'
import PostCard from '../components/PostCard'
import { useHomefeed } from '../hooks/useHomefeed'

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth()
    const { homeFeedPosts, feedLoading, error } = useHomefeed()

    return (
        <div className="min-h-screen bg-neutral-950 text-white">

            {/* Top Navbar (Desktop only) */}
            <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-neutral-950 border-b border-neutral-800 px-4 py-3">
                <div className="max-w-6xl mx-auto flex items-center justify-between">

                    {/* Logo */}
                    <h1 className="text-lg sm:text-xl font-semibold cursor-pointer" onClick={() => navigate("/")}>
                        Instagram
                    </h1>

                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-neutral-800 text-sm text-white placeholder-neutral-500 rounded-lg px-4 py-2 w-64 focus:outline-none"
                    />

                    {/* Icons */}
                    <div className="flex items-center gap-5 text-xl">
                        <button onClick={() => navigate("/")}>🏠</button>
                        <button>🔍</button>
                        <button onClick={() => navigate("/create-post")}>➕</button>
                        <button>❤️</button>
                        <img
                            onClick={() => navigate("/profile")}
                            src={user?.profileImage || "https://picsum.photos/200"}
                            className="w-8 h-8 rounded-full object-cover cursor-pointer"
                        />
                    </div>

                </div>
            </nav>

            {/* Main content */}
            <div className="max-w-6xl mx-auto pt-4 md:pt-16 flex gap-8 px-3 sm:px-4">

                {/* Feed */}
                <div className="flex-1 max-w-xl mx-auto py-6 flex flex-col gap-6">

                    {/* Stories */}
                    <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2">
                        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                            <div key={i} className="flex flex-col items-center gap-1 cursor-pointer min-w-[60px]">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] bg-gradient-to-r from-yellow-400 to-pink-500">
                                    <img
                                        src={`https://picsum.photos/seed/${i}/200`}
                                        className="w-full h-full rounded-full object-cover border-2 border-neutral-950"
                                    />
                                </div>
                                <span className="text-[10px] sm:text-xs text-neutral-400 truncate w-full text-center">
                                    user_{i}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Loading */}
                    {feedLoading && (
                        <p className="text-neutral-400 text-sm text-center">Loading...</p>
                    )}

                    {/* Error */}
                    {error && (
                        <p className="text-red-400 text-sm text-center">{error}</p>
                    )}

                    {/* Posts */}
                    {homeFeedPosts?.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}

                </div>

                {/* Sidebar (Desktop only) */}
                <div className="hidden lg:block w-80 py-6">

                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <img
                                src={user?.profileImage || "https://picsum.photos/200"}
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover cursor-pointer"
                            />
                            <div>
                                <p className="text-sm font-semibold">{user?.username}</p>
                                <p className="text-xs text-neutral-500">{user?.email}</p>
                            </div>
                        </div>
                        <button className="text-blue-400 text-xs font-semibold">Switch</button>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-semibold text-neutral-400">Suggested for you</p>
                        <button className="text-xs font-semibold">See All</button>
                    </div>

                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <img
                                    src={`https://picsum.photos/seed/${i + 30}/200`}
                                    className="w-9 h-9 rounded-full object-cover"
                                />
                                <div>
                                    <p className="text-sm font-semibold">suggested_user_{i}</p>
                                    <p className="text-xs text-neutral-500">Follows you</p>
                                </div>
                            </div>
                            <button className="text-blue-400 text-xs font-semibold">Follow</button>
                        </div>
                    ))}

                </div>

            </div>

            {/* Bottom Mobile Navbar */}
            <div className="fixed bottom-0 left-0 right-0 bg-neutral-950 border-t border-neutral-800 flex justify-around items-center py-2 md:hidden">
                <button onClick={() => navigate("/")}>🏠</button>
                <button>🔍</button>
                <button onClick={() => navigate("/create-post")}>➕</button>
                <button>❤️</button>
                <img
                    src={user?.profileImage || "https://picsum.photos/200"}
                    onClick={() => navigate("/profile")}
                    className="w-7 h-7 rounded-full object-cover"
                />
            </div>

        </div>
    )
}

export default Home