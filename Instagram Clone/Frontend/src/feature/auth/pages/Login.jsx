import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../../api/auth.api'
const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    identifier: "",
    password: ""
  })
  const [ShowPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)
      await loginUser(formData)
      navigate("/home")
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950">

      <form
        onSubmit={handleSubmit}
        className="border border-neutral-700 flex flex-col items-center gap-4 p-10 w-full max-w-sm rounded-lg bg-neutral-900">

        {/* Logo */}
        <h1 className="text-white text-3xl font-semibold tracking-tight mb-2">
          Instagram
        </h1>

        {/* Error message */}
        {error && (
          <p className="text-red-400 text-sm w-full">{error}</p>
        )}

        {/* Inputs */}
        <input
          onChange={handleChange}
          type="text"
          name="identifier"
          placeholder="username or email"
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

        {/* Button */}
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-sm font-semibold py-2 rounded-md transition-colors"
        >
          {loading ? "please... wait" : "Log in"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px bg-neutral-700" />
          <span className="text-neutral-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-neutral-700" />
        </div>

        {/* Sign up link */}
        <p className="text-neutral-400 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>

      </form>

    </div>
  )
}

export default Login