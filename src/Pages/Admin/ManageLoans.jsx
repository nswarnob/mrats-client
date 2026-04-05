import React, { useEffect, useMemo, useState } from "react";
import axiosPublic from "../../../api/axiosPublic";
import { toast } from "react-toast";
import PrimaryButton from "../../ui/PrimaryButton";

const ManageLoans = () => {
  const [loanList, setLoanList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const loadLoans = async () => {
      try {
        const res = await axiosPublic.get("/loans");
        setLoanList(res.data);
      } catch (err) {
        console.error("Failed to load loans:", err);
        toast.error("Failed to load loans");
      } finally {
        setLoading(false);
      }
    };

    loadLoans();
  }, []);

  const filteredLoans = useMemo(() => {
    return loanList.filter(
      (loan) =>
        loan.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.category?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [loanList, searchTerm]);

  const toggleShowOnHome = async (id) => {
    setUpdatingId(id);
    const loan = loanList.find((l) => l._id === id);
    const newShowOnHome = !loan.showOnHome;

    try {
      await axiosPublic.patch(`/loans/${id}`, { showOnHome: newShowOnHome });
      setLoanList((prev) =>
        prev.map((loan) =>
          loan._id === id ? { ...loan, showOnHome: newShowOnHome } : loan,
        ),
      );
      toast.success(`Loan ${newShowOnHome ? "shown" : "hidden"} on home`);
    } catch (err) {
      console.error("Failed to update loan visibility:", err);
      toast.error("Failed to update loan visibility");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <p className="text-sm text-slate-500">Loading loans...</p>;
  }

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Manage Loans</h1>
          <p className="mt-1 text-xs text-slate-500">
            Review loan products, control home page visibility, and update offer
            details.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search loans..."
            className="rounded-full border border-purple-100 bg-purple-50/40 px-4 py-2 text-sm outline-none focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
          />
          <PrimaryButton onClick={() => setSearchTerm("")}>Reset</PrimaryButton>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filteredLoans.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 text-center text-sm text-slate-600 shadow-md">
            No loans match your search.
          </div>
        ) : (
          filteredLoans.map((loan) => (
            <div
              key={loan._id}
              className="rounded-3xl bg-white p-6 shadow-md border border-purple-100 transition hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {loan.title}
                  </h2>
                  <p className="mt-2 text-xs text-slate-500">{loan.category}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                    loan.showOnHome
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {loan.showOnHome ? "Home Visible" : "Hidden from Home"}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600 line-clamp-3">
                {loan.description}
              </p>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  Interest: {loan.interestRate ?? loan.interest}%
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  Max Limit: $
                  {loan.maxLimit?.toLocaleString?.() || loan.maxLimit}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3 items-center">
                <PrimaryButton
                  onClick={() => toggleShowOnHome(loan._id)}
                  disabled={updatingId === loan._id}
                  className={updatingId === loan._id ? "opacity-50" : ""}
                >
                  {updatingId === loan._id
                    ? "Updating..."
                    : loan.showOnHome
                      ? "Hide from Home"
                      : "Show on Home"}
                </PrimaryButton>
                <button className="text-sm font-semibold text-[#6B4DF8] hover:text-purple-700">
                  Edit details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageLoans;
