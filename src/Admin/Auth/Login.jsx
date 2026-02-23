import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo2.png";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "superadmin@admin.com" && password === "123") {
      const user = { email, role: "Super Admin", name: "Super Admin" };
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/admin", { replace: true });
    } else if (
      email === "agencyadmin@admin.com" &&
      password === "123"
    ) {
      const user = { email, role: "Agency Admin", name: "Agency Admin" };
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/admin", { replace: true });
    } else {
      alert(
        "Invalid credentials. \nSuper Admin: superadmin@admin.com / superadmin123 \nAgency Admin: agencyadmin@admin.com / agencyadmin123",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 font-['Outfit',sans-serif]">
      <div className="w-full bg-gradient-to-br from-[#63CBFF]/20 to-[#4043F5]/20 max-w-2xl rounded-lg">
        {/* Logo Section */}
        <div className="flex items-center justify-center gap-1">
          <img src={logo} alt="logo" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-14">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full h-14 px-6 bg-white border border-[#63CBFF]/30 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#63CBFF]/20 focus:border-[#63CBFF] transition-all placeholder:text-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-14 px-6 bg-white border border-[#63CBFF]/30 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#63CBFF]/20 focus:border-[#63CBFF] transition-all placeholder:text-gray-300 shadow-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between px-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 rounded border-[#63CBFF]/50 text-[#4043F5] focus:ring-[#63CBFF] cursor-pointer"
                />
              </div>
              <span className="text-xs font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">
                Remember me
              </span>
            </label>
            <button
              type="button"
              className="text-xs font-bold text-gray-700 hover:text-black transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-14 flex items-center justify-center bg-gradient-to-r from-[#63CBFF] to-[#4043F5] text-white rounded-full font-extrabold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
