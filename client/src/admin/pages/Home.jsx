import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white flex flex-col items-center justify-center px-6 py-10">
       <button
      onClick={() => navigate("/")}
      className=" absolute top-8 left-8 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-2 rounded-lg shadow-md transition"
    >
      ← 
    </button>
       {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-8 right-8 bg-yellow-400 hover:bg-yellow-300 transition-all text-black px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-yellow-400/50"
        >
          Logout
        </button>

      <div className="w-full max-w-4xl bg-neutral-950/60 backdrop-blur-xl border border-yellow-500/20 rounded-2xl shadow-2xl p-4 md:p-10 text-center">
        <h1 className=" text-2xl md:text-4xl font-extrabold text-yellow-400 mb-6 tracking-wide">
          Welcome, Amit
        </h1>

        <p className="text-gray-400 mb-8">
          Manage your interior project gallery and uploads here.
        </p>

        {/* Upload Component */}
        <section className="w-full" >
        <ImageUploader />
        </section>

       
      </div>

      <footer className="mt-10 text-sm text-gray-500">
        Designed for <span className="text-yellow-400 font-medium">Amit Kumar Interiors</span>
      </footer>
    </div>
  );
}
