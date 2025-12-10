import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import PrimaryButton from "../ui/PrimaryButton";
import { toast } from "react-toast";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Register = () => {
  const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      Name: "",
      email: "",
      photoURL: "",
      role: "borrower",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const { Name, email, password, photoURL, role} = data;

    // uppercase + lowercase + length >= 6
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);

    if (!hasUpper || !hasLower) {
      return toast.error(
        "Password must include at least one uppercase and one lowercase letter."
      );
    }

    try {
      await createUser(email, password);
      await updateUser({ displayName: Name, photoURL });

  
      await axios.post("/users", { name: Name, email, photoURL, role });

      toast.success("Registered successfully!");
      reset();
      navigate("/"); // or "/dashboard"
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Registration failed");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      
      await axios.post("/users", {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "borrower",
      });


      toast.success("Registered successfully with Google!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Google registration failed!");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-purple-200/70">
        <h1 className="text-2xl font-semibold text-slate-900">Register</h1>
        <p className="mt-1 text-xs text-slate-500">
          Create an account as borrower or manager.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div>
            <label className="text-xs font-medium text-slate-700">Name</label>
            <input
              {...register("Name", { required: "Name is required" })}
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/40 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
            />
            {errors.Name && (
              <p className="mt-1 text-[10px] text-red-500">
                {errors.Name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-medium text-slate-700">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Provide a valid email",
                },
              })}
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/40 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
            />
            {errors.email && (
              <p className="mt-1 text-[10px] text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <label className="text-xs font-medium text-slate-700">
              Photo URL
            </label>
            <input
              type="url"
              {...register("photoURL")}
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/40 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-xs font-medium text-slate-700">Role</label>
            <select
              {...register("role")}
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/40 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
            >
              <option value="borrower">Borrower</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/40 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
            />
            {errors.password && (
              <p className="mt-1 text-[10px] text-red-500">
                {errors.password.message}
              </p>
            )}
            <p className="mt-1 text-[10px] text-slate-500">
              Must contain 1 uppercase, 1 lowercase and at least 6 characters.
            </p>
          </div>

          <PrimaryButton
            type="submit"
            className="mt-2 w-full justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </PrimaryButton>
        </form>

        {/* Google auth */}
        <button
          onClick={handleGoogleRegister}
          type="button"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-purple-100 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-purple-50 transition-colors"
        >
          <FcGoogle className="text-base" />
          Continue with Google
        </button>

        <p className="mt-4 text-center text-[11px] text-slate-500">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-[#6B4DF8]">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
