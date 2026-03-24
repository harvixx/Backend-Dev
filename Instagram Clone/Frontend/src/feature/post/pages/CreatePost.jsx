import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/context/AuthContext'
import { useCreatePost } from '../hooks/useCreatePost'

const MAX_CAPTION = 2200

const CreatePost = () => {
    const { createPost, error, loading } = useCreatePost()
    const navigate = useNavigate()
    const { user } = useAuth()
    const fileInputRef = useRef(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [caption, setCaption] = useState("")
    const [isDragging, setIsDragging] = useState(false)

    function handleFileChange(e) {
        const file = e.target.files[0]
        if (!file) return
        setSelectedFile(file)
        setPreview(URL.createObjectURL(file))
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!selectedFile) return
        const formData = new FormData()
        formData.append("imageUrl", selectedFile)
        formData.append("caption", caption)
        createPost(formData)
    }

    function handleDragOver(e) {
        e.preventDefault()
        setIsDragging(true)
    }

    function handleDragLeave() {
        setIsDragging(false)
    }

    function handleDrop(e) {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files[0]
        if (!file || !file.type.startsWith("image/")) return
        setSelectedFile(file)
        setPreview(URL.createObjectURL(file))
    }

    function handleCaptionChange(e) {
        if (e.target.value.length <= MAX_CAPTION) {
            setCaption(e.target.value)
        }
    }

    function captionCountColor() {
        const len = caption.length
        if (len >= MAX_CAPTION) return "text-red-400"
        if (len >= MAX_CAPTION * 0.9) return "text-amber-400"
        return "text-neutral-500"
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white">

            {/* Top Navbar (same as home) */}
            <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-neutral-950 border-b border-neutral-800 px-4 py-3">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <h1 className="text-lg sm:text-xl font-semibold cursor-pointer" onClick={() => navigate('/')}>Instagram</h1>

                    <input
                        type="text"
                        placeholder="Search"
                        className="hidden md:block bg-neutral-800 text-sm text-white placeholder-neutral-500 rounded-lg px-4 py-2 w-64 focus:outline-none"
                    />

                    <div className="flex items-center gap-4 sm:gap-5 text-lg sm:text-xl">
                        <button onClick={() => navigate('/')}>🏠</button>
                        <button className="md:hidden">🔍</button>
                        <button>➕</button>
                        <button>❤️</button>
                        <img
                            onClick={() => navigate("/profile")}
                            src={user?.profileImage || "https://picsum.photos/200"}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover cursor-pointer"
                        />
                    </div>
                </div>
            </nav>

            {/* Main */}
            <div className="pt-4 md:pt-16 flex items-center justify-center p-3 sm:p-4">
                <div className="w-full max-w-5xl bg-neutral-900 rounded-xl border border-neutral-700 overflow-hidden">

                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-700">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="text-white text-sm hover:text-neutral-400"
                        >
                            Cancel
                        </button>
                        <h1 className="text-white text-sm font-semibold">Create new post</h1>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!preview || loading}
                            className="text-blue-400 text-sm font-semibold disabled:opacity-40"
                        >
                            {loading ? "Sharing..." : "Share"}
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row h-auto md:h-[500px]">

                        {/* Left */}
                        <div
                            onClick={() => !preview && fileInputRef.current.click()}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`flex-1 flex items-center justify-center transition-colors relative overflow-hidden
                            ${preview ? "bg-black" : "bg-neutral-950 cursor-pointer"}
                            ${isDragging ? "bg-neutral-800 border-2 border-blue-500 border-dashed" : ""}
                        `}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />

                            {!preview ? (
                                <div className="flex flex-col items-center gap-4 p-6 text-center">
                                    <div className={`text-5xl sm:text-6xl ${isDragging ? "scale-110" : ""}`}>
                                        🖼️
                                    </div>
                                    <p className="text-white text-base sm:text-lg">
                                        {isDragging ? "Drop it here!" : "Drag photos here"}
                                    </p>
                                    <label
                                        onClick={() => fileInputRef.current.click()}
                                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg cursor-pointer"
                                    >
                                        Select from computer
                                    </label>
                                </div>
                            ) : (
                                <>
                                    <img src={preview} className="w-full h-full object-contain" />
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            fileInputRef.current.value = ""
                                            fileInputRef.current.click()
                                        }}
                                        className="absolute bottom-3 right-3 bg-neutral-800 text-xs px-3 py-1.5 rounded-lg"
                                    >
                                        Change
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Right */}
                        <div className="w-full md:w-80 flex flex-col border-t md:border-t-0 md:border-l border-neutral-700">

                            <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-700">
                                <img
                                    src={user?.profileImage || "https://picsum.photos/200"}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <span className="text-white text-sm font-semibold">
                                    {user?.username}
                                </span>
                            </div>

                            <textarea
                                placeholder="Write a caption..."
                                value={caption}
                                onChange={handleCaptionChange}
                                className="flex-1 bg-transparent text-white text-sm px-4 py-3 focus:outline-none resize-none"
                            />

                            {error && (
                                <p className="text-red-400 text-xs px-4 py-2 border-t border-neutral-700">
                                    {error}
                                </p>
                            )}

                            <div className="flex justify-end px-4 py-2 border-t border-neutral-700">
                                <span className={`text-xs ${captionCountColor()}`}>
                                    {caption.length} / {MAX_CAPTION}
                                </span>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

            {/* Bottom Mobile Navbar */}
            <div className="fixed bottom-0 left-0 right-0 bg-neutral-950 border-t border-neutral-800 flex justify-around items-center py-2 md:hidden">
                <button onClick={() => navigate('/')}>🏠</button>
                <button>🔍</button>
                <button>➕</button>
                <button>❤️</button>
                <img
                    onClick={() => navigate("/profile")}
                    src={user?.profileImage || "https://picsum.photos/200"}
                    className="w-7 h-7 rounded-full object-cover"
                />
            </div>

        </div>
    )
}

export default CreatePost
