import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router";
import PrimaryButton from "../../ui/PrimaryButton";
import { AuthContext } from "../../Provider/AuthProvider";
import axiosPublic from "../../../api/axiosPublic";
import { toast } from "react-toast";

const ApplyLoan = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams(); // optional
  const location = useLocation();
  const stateLoanId = location?.state?.loanId;

  const selectedIdFromRouteOrState = id || stateLoanId || "";

  const [loadingLoan, setLoadingLoan] = useState(false);
  const [loan, setLoan] = useState(null);

  const [loansList, setLoansList] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      // Loan selector (only used when user opens apply page directly)
      selectedLoanId: selectedIdFromRouteOrState,

      // User fields
      firstName: "",
      lastName: "",
      contactNumber: "",
      nationalId: "",
      incomeSource: "",
      monthlyIncome: "",
      loanAmount: "",
      reason: "",
      address: "",
      notes: "",
    },
  });

  const selectedLoanId = watch("selectedLoanId");

  // 1) If user comes without loan id → load all loans for dropdown
  useEffect(() => {
    if (selectedIdFromRouteOrState) return; // already have a loan to fetch

    const loadLoansList = async () => {
      try {
        setLoadingList(true);
        const res = await axiosPublic.get("/loans");
        setLoansList(res.data || []);
      } catch (e) {
        toast.error("Failed to load loans list", e);
      } finally {
        setLoadingList(false);
      }
    };

    loadLoansList();
  }, [selectedIdFromRouteOrState]);

  // 2) When selectedLoanId changes (from route OR dropdown) → fetch that loan and autofill
  useEffect(() => {
    if (!selectedLoanId) {
      setLoan(null);
      return;
    }

    const fetchLoan = async () => {
      try {
        setLoadingLoan(true);
        const res = await axiosPublic.get(`/loans/${selectedLoanId}`);
        setLoan(res.data);

        // OPTIONAL: you can also set default max limit validations later
      } catch (e) {
        toast.error("Failed to load selected loan", e);
        setLoan(null);
      } finally {
        setLoadingLoan(false);
      }
    };

    fetchLoan();
  }, [selectedLoanId]);

  // Helper fields for auto-filled UI
  const loanTitle = loan?.title || "";
  const interestRate = loan?.interestRate ?? loan?.interest ?? "";
  const maxLimit = loan?.maxLimit ?? "";

  const onSubmit = async (data) => {
    if (!loan?._id) return toast.error("Please select a loan first.");

    const payload = {
      loanId: loan._id,
      loanTitle: loan.title,
      category: loan.category,
      interestRate: Number(interestRate),

      borrowerEmail: user?.email,
      borrowerName: user?.displayName || "",

      firstName: data.firstName,
      lastName: data.lastName,
      contactNumber: data.contactNumber,
      nationalId: data.nationalId,
      incomeSource: data.incomeSource,
      monthlyIncome: Number(data.monthlyIncome),
      loanAmount: Number(data.loanAmount),
      reason: data.reason,
      address: data.address,
      notes: data.notes,

      status: "Pending",
      feeStatus: "Unpaid",
      createdAt: new Date().toISOString(),
    };

    try {
      await axiosPublic.post("/loan-applications", payload);
      toast.success("Application submitted!");
      reset({ ...data, loanAmount: "", reason: "", notes: "" });
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to submit");
    }
  };

  return (
    <div className="px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-xl shadow-purple-200/70">
        <h1 className="text-2xl font-semibold text-slate-900">
          Apply for Loan
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Select a loan and submit your microloan application.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 grid gap-4 md:grid-cols-2"
        >
          {/* If user did NOT come from a loan card/details → show dropdown */}
          {!selectedIdFromRouteOrState && (
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-slate-700">
                Choose a Loan
              </label>
              <select
                {...register("selectedLoanId", {
                  required: "Please select a loan",
                })}
                className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
              >
                <option value="">
                  {loadingList ? "Loading loans..." : "Select one"}
                </option>
                {loansList.map((l) => (
                  <option key={l._id} value={l._id}>
                    {l.title} — {l.category}
                  </option>
                ))}
              </select>
              {errors.selectedLoanId && (
                <p className="mt-1 text-[10px] text-red-500">
                  {errors.selectedLoanId.message}
                </p>
              )}
            </div>
          )}

          {/* Auto-filled loan info */}
          <div>
            <label className="text-xs font-medium text-slate-700">
              Loan Title
            </label>
            <input
              disabled
              value={loadingLoan ? "Loading..." : loanTitle}
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/50 px-3 py-2 text-sm text-slate-500"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700">
              Interest Rate
            </label>
            <input
              disabled
              value={
                loadingLoan
                  ? "Loading..."
                  : interestRate
                  ? `${interestRate}%`
                  : ""
              }
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/50 px-3 py-2 text-sm text-slate-500"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700">
              Email (auto)
            </label>
            <input
              disabled
              value={user?.email || ""}
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/50 px-3 py-2 text-sm text-slate-500"
            />
          </div>

          {/* User fields */}
          <div>
            <label className="text-xs font-medium text-slate-700">
              First Name
            </label>
            <input
              {...register("firstName", { required: "First name is required" })}
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
            />
            {errors.firstName && (
              <p className="mt-1 text-[10px] text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700">
              Last Name
            </label>
            <input
              {...register("lastName", { required: "Last name is required" })}
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
            />
            {errors.lastName && (
              <p className="mt-1 text-[10px] text-red-500">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700">
              Contact Number
            </label>
            <input
              {...register("contactNumber", {
                required: "Contact number is required",
              })}
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
            />
            {errors.contactNumber && (
              <p className="mt-1 text-[10px] text-red-500">
                {errors.contactNumber.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700">
              National ID / Passport
            </label>
            <input
              {...register("nationalId", {
                required: "NID/Passport is required",
              })}
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
            />
            {errors.nationalId && (
              <p className="mt-1 text-[10px] text-red-500">
                {errors.nationalId.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700">
              Income Source
            </label>
            <input
              {...register("incomeSource", {
                required: "Income source is required",
              })}
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
            />
            {errors.incomeSource && (
              <p className="mt-1 text-[10px] text-red-500">
                {errors.incomeSource.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700">
              Monthly Income
            </label>
            <input
              type="number"
              {...register("monthlyIncome", {
                required: "Monthly income is required",
                min: 1,
              })}
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700">
              Loan Amount
            </label>
            <input
              type="number"
              {...register("loanAmount", {
                required: "Loan amount is required",
                min: { value: 1, message: "Must be positive" },
                ...(maxLimit
                  ? {
                      max: {
                        value: Number(maxLimit),
                        message: `Max is ${maxLimit}`,
                      },
                    }
                  : {}),
              })}
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
            />
            {errors.loanAmount && (
              <p className="mt-1 text-[10px] text-red-500">
                {errors.loanAmount.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-medium text-slate-700">
              Reason for Loan
            </label>
            <textarea
              {...register("reason", { required: "Reason is required" })}
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
              rows={3}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-medium text-slate-700">
              Address
            </label>
            <textarea
              {...register("address", { required: "Address is required" })}
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
              rows={2}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-medium text-slate-700">
              Extra Notes
            </label>
            <textarea
              {...register("notes")}
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
              rows={2}
            />
          </div>

          <div className="md:col-span-2 mt-2 flex justify-end">
            <PrimaryButton type="submit" disabled={isSubmitting || !loan?._id}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLoan;
