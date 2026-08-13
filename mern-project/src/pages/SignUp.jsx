import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff, Home, ArrowRight, LoaderCircle} from 'lucide-react';


export default function signUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value,
      }
    );
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success === false) {
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(null);
    navigate("/signin");
    }catch(err) {
      setError(err.message);
      setLoading(false);
    }
    
    // console.log(data);
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-green-600 text-white p-2.5 rounded-xl">
              <Home size={24} />
            </div>
            <span className="text-2xl font-bold text-slate-800">
              Prime<span className="text-green-600">Nest</span>
            </span>
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sm:p-8">
          <div className="text-center mb-7">
            <h1 className="text-3xl font-bold text-slate-800">
              Create Account
            </h1>
            <p className="text-slate-500 mt-2">
              Join EstateHub and start exploring properties
            </p>
          </div>
          <form onSubmit={handleSubmit}className="flex flex-col gap-5">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
                <input type="text" id="username" placeholder="Enter your username" required minLength="3" onChange={handleChange} className="w-full border border-slate-200 rounded-xl p-3.5 pl-11 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"/>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
                <input type="email" id="email" placeholder="Enter your email" required onChange={handleChange} className="w-full border border-slate-200 rounded-xl p-3.5 pl-11 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"/>
              </div>
            </div>
            <div>
              <label htmlFor="password"
                className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input type={showPassword ? 'text' : 'password'} id="password" placeholder="Create a password" required minLength="6" onChange={handleChange} className="w-full border border-slate-200 rounded-xl p-3.5 pl-11 pr-12 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"/>
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Password must be at least 6 characters.
              </p>
            </div>
            <button disabled={loading}className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-xl p-3.5 font-semibold transition disabled:opacity-60">
              {loading ? (
                <>
                  <LoaderCircle
                    size={19}
                    className="animate-spin"
                  />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={19} />
                </>
              )}
            </button>
          </form>
          <div className="flex items-center justify-center gap-2 mt-6 text-sm">
            <p className="text-slate-500">
              Already have an account?
            </p>
            <Link
              to="/signin"
              className="text-green-600 font-semibold hover:text-green-700 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-center text-sm">
            {error}
          </div>
        )}
        <p className="text-center text-xs text-slate-400 mt-6">
          Find your place. Make it home.
        </p>
      </div>
    </main>
  )
}
