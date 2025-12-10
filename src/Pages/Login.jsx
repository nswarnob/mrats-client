import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import PrimaryButton from "../ui/PrimaryButton";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toast";

const Login = () => {
  const { signIn, signInWithGoogle, resetPass } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Google login failed!");
    }
  };

  const handleForget = async () => {
    const email = getValues("email");
    if (!email) {
      return toast.warning("Please enter your email first.");
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return toast.warning("Please enter a valid email address.");
    }

    try {
      await resetPass(email);
      toast.success("Password reset link has been sent to your email.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-purple-200/70">
        <h1 className="text-2xl font-semibold text-slate-900">Login</h1>
        <p className="mt-1 text-xs text-slate-500">
          Sign in to continue managing your microloans.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-700">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`mt-1 w-full rounded-xl border ${
                errors.email
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-purple-100 focus:border-[#6B4DF8] focus:ring-purple-200"
              } bg-purple-50/40 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 transition-colors`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-700">
                Password
              </label>
              <button
                type="button"
                onClick={handleForget}
                className="text-xs text-[#6B4DF8] hover:text-[#5A3DE7] font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`mt-1 w-full rounded-xl border ${
                errors.password
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-purple-100 focus:border-[#6B4DF8] focus:ring-purple-200"
              } bg-purple-50/40 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 transition-colors`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <PrimaryButton
            onClick={handleSubmit(onSubmit)}
            className="w-full justify-center mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </PrimaryButton>
        </div>

        <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400">
          <div className="h-px flex-1 bg-purple-100" />
          <span>OR</span>
          <div className="h-px flex-1 bg-purple-100" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-purple-100 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-purple-50 transition-colors"
        >
          <FcGoogle className="text-base" />
          Continue with Google
        </button>

        <p className="mt-4 text-[11px] text-center text-slate-500">
          New here?{" "}
          <a
            href="/register"
            className="font-semibold text-[#6B4DF8] hover:text-[#5A3DE7] transition-colors"
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
