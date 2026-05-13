import React from "react";
import { useForm } from "react-hook-form";
import PrimaryButton from "../../ui/PrimaryButton";
import axiosPublic from "../../../api/axiosPublic";
import { toast } from "react-toast";
import usePageTitle from "../../hooks/usePageTitle";

const AddLoan = () => {
  usePageTitle("Add Loan");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      category: "Business",
      interestRate: "",
      maxLimit: "",
      description: "",
      image: "",
      emiPlans: "",
      showOnHome: false,
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      title: data.title.trim(),
      category: data.category,
      interestRate: Number(data.interestRate),
      maxLimit: Number(data.maxLimit),
      description: data.description.trim(),
      image: data.image.trim(),
      emiPlans: data.emiPlans
        .split(",")
        .map((item) => Number(item.trim()))
        .filter((num) => Number.isFinite(num) && num > 0),
      showOnHome: !!data.showOnHome,
    };

    try {
      await axiosPublic.post("/loans", payload);
      toast.success("Loan created successfully");
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create loan");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Add Loan</h1>
      <p className="mt-1 text-xs text-slate-500">
        Create a new microloan product for borrowers.
      </p>

      <form
        className="mt-5 grid gap-4 md:grid-cols-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="text-xs font-medium text-slate-700">
            Loan Title
          </label>
          <input
            {...register("title", { required: "Loan title is required" })}
            className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
          />
          {errors.title && (
            <p className="mt-1 text-[10px] text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-xs font-medium text-slate-700">Category</label>
          <select
            {...register("category", { required: true })}
            className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
          >
            <option value="Business">Business</option>
            <option value="Education">Education</option>
            <option value="Personal">Personal</option>
            <option value="Medical">Medical</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-slate-700">
            Interest Rate
          </label>
          <input
            type="number"
            step="0.01"
            {...register("interestRate", {
              required: "Interest rate is required",
              min: { value: 0, message: "Must be non-negative" },
            })}
            className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
          />
          {errors.interestRate && (
            <p className="mt-1 text-[10px] text-red-500">
              {errors.interestRate.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-xs font-medium text-slate-700">
            Max Loan Limit
          </label>
          <input
            type="number"
            {...register("maxLimit", {
              required: "Maximum limit is required",
              min: { value: 1, message: "Must be greater than 0" },
            })}
            className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
          />
          {errors.maxLimit && (
            <p className="mt-1 text-[10px] text-red-500">
              {errors.maxLimit.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-xs font-medium text-slate-700">
            Image URL
          </label>
          <input
            type="url"
            {...register("image")}
            className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
            placeholder="https://example.com/loan.jpg"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-700">
            EMI Plans (comma separated)
          </label>
          <input
            {...register("emiPlans")}
            className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
            placeholder="3, 6, 12"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-medium text-slate-700">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: { value: 15, message: "Description is too short" },
            })}
            className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
          />
          {errors.description && (
            <p className="mt-1 text-[10px] text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="md:col-span-2 flex items-center gap-2">
          <input
            type="checkbox"
            id="showOnHome"
            className="h-4 w-4"
            {...register("showOnHome")}
          />
          <label htmlFor="showOnHome" className="text-xs text-slate-700">
            Show on Home page
          </label>
        </div>
        <div className="md:col-span-2 mt-2 flex justify-end">
          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Loan"}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default AddLoan;
