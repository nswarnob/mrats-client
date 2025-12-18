import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FiSearch } from "react-icons/fi";
import axiosPublic from "../../api/axiosPublic";

const AllLoans = () => {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get("/loans");
        setLoans(res.data || []);
        setFilteredLoans(res.data || []);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load loans. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  // simple search + category filter
  useEffect(() => {
    let data = [...loans];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      data = data.filter(
        (loan) =>
          loan.title?.toLowerCase().includes(term) ||
          loan.category?.toLowerCase().includes(term)
      );
    }

    if (categoryFilter !== "all") {
      data = data.filter(
        (loan) => loan.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    setFilteredLoans(data);
  }, [searchTerm, categoryFilter, loans]);

  // collect categories for filter dropdown
  const categories = Array.from(
    new Set(loans.map((loan) => loan.category).filter(Boolean))
  );

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-400 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center text-sm text-red-500">{error}</div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            All <span className="text-[#6B4DF8]">Loans</span>
          </h1>
          <p className="mt-1 text-xs text-slate-500 md:text-sm">
            Explore all available microloan products. Filter and view details to
            apply.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          {/* Search */}
          <div className="flex items-center rounded-full border border-purple-100 bg-white px-3 py-1.5 shadow-sm shadow-purple-100/60 md:w-64">
            <FiSearch className="text-xs text-slate-400" />
            <input
              type="text"
              placeholder="Search by title or category"
              className="ml-2 w-full bg-transparent text-xs outline-none placeholder:text-slate-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category filter */}
          <select
            className="rounded-full border border-purple-100 bg-white px-3 py-1.5 text-xs shadow-sm shadow-purple-100/60"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Loans grid */}
      {filteredLoans.length === 0 ? (
        <p className="mt-10 text-center text-xs text-slate-500">
          No loans found. Try changing filters or search term.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredLoans.map((loan) => (
            <article
              key={loan._id}
              className="group flex flex-col rounded-2xl bg-white shadow-md shadow-purple-100/60 ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-200/70"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden rounded-t-2xl bg-linear-to-tr from-purple-100 to-purple-200">
                {loan.image && (
                  <img
                    src={loan.image}
                    alt={loan.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                )}
                <span className="absolute left-3 top-3 inline-flex rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-purple-50 backdrop-blur">
                  {loan.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col px-4 py-3">
                <h2 className="text-sm font-semibold text-slate-900 line-clamp-2">
                  {loan.title}
                </h2>
                <p className="mt-1 text-[11px] text-slate-500 line-clamp-3">
                  {loan.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                  <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-0.5 text-[#6B4DF8] ring-1 ring-purple-100">
                    Interest:{" "}
                    <span className="ml-1 font-semibold">
                      {loan.interestRate}%
                    </span>
                  </span>
                  <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-slate-600 ring-1 ring-slate-100">
                    Max Limit:{" "}
                    <span className="ml-1 font-semibold">
                      ${loan.maxLimit?.toLocaleString?.() || loan.maxLimit}
                    </span>
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
                  <span>
                    EMI Plans:{" "}
                    <span className="font-medium text-slate-600">
                      {loan.emiPlans?.join(", ")}
                    </span>
                  </span>
                </div>

                {/* Button */}
                <div className="mt-4 flex justify-end">
                  <Link
                    to={`/loans/${loan._id}`}
                    className="inline-flex items-center rounded-full bg-linear-to-r from-[#6B4DF8] to-[#A787FF] px-4 py-1.5 text-xs font-medium text-white shadow-sm shadow-purple-300/60 transition hover:shadow-md hover:shadow-purple-400/70"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllLoans;
