import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../auth/context/AuthContext"
import { useLogout } from "../../auth/hooks/useLogout"

 const Profile = () => {
    const { user } = useAuth()
    const { logoutUser, loading } = useLogout()
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false)

    return (
        <div className="min-h-screen bg-neutral-950 text-white">

            {/* Top Navbar (Desktop only) */}
            <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-neutral-950 border-b border-neutral-800 px-4 py-3">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <h1
                        className="text-lg font-semibold cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        Instagram
                    </h1>

                    <div className="flex items-center gap-5 text-xl">
                        <button onClick={() => navigate("/")}>🏠</button>
                        <button onClick={() => navigate("/create-post")}>➕</button>
                        <button>❤️</button>
                        <img
                            src={user?.profileImage || "https://picsum.photos/200"}
                            className="w-8 h-8 rounded-full object-cover cursor-pointer"
                        />
                    </div>
                </div>
            </nav>

            {/* Main */}
            <div className="pt-4 md:pt-16 max-w-4xl mx-auto px-4">

                {/* Profile Card */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">

                    {/* Profile Image */}
                    <img
                        src={user?.profileImage || "https://picsum.photos/200"}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover"
                    />

                    {/* Info */}
                    <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-xl font-semibold">
                            {user?.username}
                        </h2>
                        <p className="text-neutral-400 text-sm mt-1">
                            {user?.email}
                        </p>

                        {/* Actions */}
                        <div className="mt-4 flex justify-center sm:justify-start gap-3">
                            <button className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-lg text-sm">
                                Edit Profile
                            </button>

                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
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
                    className="w-7 h-7 rounded-full object-cover"
                />
            </div>

            {/* Logout Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 w-[90%] max-w-sm text-center">

                        <h2 className="text-lg font-semibold mb-2">
                            Logout?
                        </h2>
                        <p className="text-sm text-neutral-400 mb-6">
                            Are you sure you want to logout?
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 bg-neutral-800 hover:bg-neutral-700 py-2 rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={logoutUser}
                                disabled={loading}
                                className="flex-1 bg-red-500 hover:bg-red-600 py-2 rounded-lg disabled:opacity-50"
                            >
                                {loading ? "Logging out..." : "Logout"}
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}
export default Profile