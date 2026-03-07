
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo2.png";
import { useLoggedInUserMutation } from "@/redux/features/baseApi";
import { toast, Toaster } from "sonner";
import Cookies from "js-cookie";

export default function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  // Destructure isLoading from the mutation hook
  const [loggedInUser, { isLoading }] = useLoggedInUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loggedInUser(data).unwrap();
      // Success Feedback
      toast.success(response?.message || "Login successful!");

      // Store Credentials securely
      Cookies.set("access_token", response?.access_token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("refresh_token", response?.refresh_token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("role", response?.role);

      // Redirect
      navigate("/admin", { replace: true });

    } catch (error) {

      const errorMsg = error?.data?.message || error?.data?.detail || "Invalid email or password. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <Toaster position="top-center" richColors />

      <div className="w-full bg-gradient-to-br from-[#63CBFF]/20 to-[#4043F5]/20 max-w-2xl rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-center pt-10">
          <img src={logo} alt="logo" className=" w-auto" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8 md:p-14">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              type="email"
              disabled={isLoading}
              placeholder="Enter your email"
              className={`w-full h-14 px-6 bg-white border ${errors.email ? "border-red-500 focus:ring-red-200" : "border-[#63CBFF]/30 focus:ring-[#63CBFF]/20"
                } rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:border-[#63CBFF] transition-all placeholder:text-gray-300 shadow-sm`}
            />
            {errors.email && <p className="text-red-500 text-xs ml-4 font-medium">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
            <div className="relative">
              <input
                {...register("password", { required: "Password is required" })}
                type={show ? "text" : "password"}
                disabled={isLoading}
                placeholder="Enter your password"
                className={`w-full h-14 px-6 bg-white border ${errors.password ? "border-red-500 focus:ring-red-200" : "border-[#63CBFF]/30 focus:ring-[#63CBFF]/20"
                  } rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:border-[#63CBFF] transition-all placeholder:text-gray-300 shadow-sm`}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#4043F5] transition-colors"
              >
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs ml-4 font-medium">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full h-14 flex items-center justify-center bg-gradient-to-r from-[#63CBFF] to-[#4043F5] text-white rounded-full font-extrabold text-lg shadow-lg shadow-blue-500/30 transition-all ${isLoading
              ? "opacity-80 cursor-not-allowed scale-[0.98]"
              : "hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
              }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={20} />
                <span>Login...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}