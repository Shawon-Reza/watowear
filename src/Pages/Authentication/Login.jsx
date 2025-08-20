import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Login attempt:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate("/admin");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-[#6A6D57]/70"></div>
        <div className="w-1/2 bg-[#F4F1EB]"></div>
      </div>

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative w-full max-w-xl p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg text-white">
        <div className="mb-8 text-center">
          <h3 className="text-3xl font-bold mb-2">Welcome back</h3>
          <p className="text-sm text-white/70">Sign in to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 text-sm bg-white/20 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all placeholder:text-white/50 ${
                errors.email ? "border-red-500" : "border-white/30"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 text-sm bg-white/20 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all placeholder:text-white/50 pr-12 ${
                  errors.password ? "border-red-500" : "border-white/30"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-white/80">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="w-4 h-4 text-primary bg-white/20 border-white/50 rounded"
              />
              <span className="text-sm">Remember me</span>
            </label>
            <button
              type="button"
              className="text-sm text-accent hover:underline hover:text-accent/80 font-medium"
            >
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white/20 border border-white/30 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
}
