import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRegister } from '../hooks/useRegister'

const Register = () => {
  const { register, loading, error } = useRegister();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [ShowPassword, setShowPassword] = useState(false)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    await register(formData);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950">
      <form onSubmit={handleSubmit}
        className="border border-neutral-700 flex flex-col items-center gap-4 px-10 py-8 w-full max-w-md rounded-lg bg-neutral-900">

        <h1 className="text-white text-4xl font-semibold tracking-tight mb-2">
          Instagram
        </h1>
        <p className="text-neutral-400 text-sm text-center">
          Sign up to see photos and videos from your friends.
        </p>

        {/* Error message */}
        {error && (
          <p className="text-red-400 text-sm w-full">{error}</p>
        )}

        <input
          onChange={handleChange}
          type="text"
          name="username"
          placeholder="Username"
          className="w-full bg-neutral-800 border border-neutral-600 text-white text-sm placeholder-neutral-500 rounded-md px-3 py-2 focus:outline-none focus:border-neutral-400"
        />
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
          className="w-full bg-neutral-800 border border-neutral-600 text-white text-sm placeholder-neutral-500 rounded-md px-3 py-2 focus:outline-none focus:border-neutral-400"
        />
        <div className="relative w-full">
          <input
            onChange={handleChange}
            type={ShowPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full bg-neutral-800 border border-neutral-600 text-white text-sm placeholder-neutral-500 rounded-md px-3 py-2 focus:outline-none focus:border-neutral-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!ShowPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
          >
            {ShowPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-sm font-semibold py-2 rounded-md transition-colors"
        >
          {loading ? "Please wait..." : "Sign up"}
        </button>

        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px bg-neutral-700" />
          <span className="text-neutral-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-neutral-700" />
        </div>

        <p className="text-neutral-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Log in
          </Link>
        </p>

      </form>
    </div>
  )
}

export default Register