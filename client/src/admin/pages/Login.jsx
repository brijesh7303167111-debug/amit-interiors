import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
    // useEffect(() => {
    //   const isAdmin = localStorage.getItem("isAdmin");
    //   if (isAdmin) {
    //     navigate("/admin");
    //   }
    // }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/login`, { password });

      if (res.data.message === "Access granted") {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      }
    } catch (err) {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1a1a1a] flex items-center justify-center relative overflow-hidden">
  {/* Background Glow */}

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,215,0,0.15),transparent_60%)]"></div>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,215,0,0.1),transparent_60%)]"></div>
<button
      onClick={() => navigate("/")}
      className=" absolute top-8 left-8 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-2 rounded-lg shadow-md transition"
    >
      <b>←</b> 
    </button>
  <form
    onSubmit={handleLogin}
    className="relative z-10 p-10 rounded-3xl border border-gray-800 bg-[#0f0f0f]/70 backdrop-blur-lg shadow-[0_0_30px_rgba(255,215,0,0.15)] flex flex-col gap-6 w-[90%] max-w-sm"
  >
    {/* Logo or Title */}
    <h1 className="text-3xl font-bold text-center text-[#FFD700] tracking-wide mb-2">
      Amit Interiors
    </h1>
    <p className="text-gray-400 text-center text-sm mb-4">
      Admin Access Portal
    </p>

    {/* Input */}
    <input
      type="password"
      placeholder="Enter admin password"
      className="p-3 bg-[#1a1a1a] text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all duration-200 placeholder-gray-500"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    {/* Button */}
    <button
      type="submit"
      className="bg-[#FFD700] hover:bg-[#ffea70] text-black font-semibold py-2.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
    >
      Login
    </button>

    {/* Error Message */}
    {error && (
      <p className="text-red-500 text-center text-sm mt-2">{error}</p>
    )}

    {/* Subtle Footer */}
    <p className="text-xs text-center text-gray-500 mt-4">
      © 2025 Amit Interiors | Designed with Elegance
    </p>
  </form>
</div>

  );
}
