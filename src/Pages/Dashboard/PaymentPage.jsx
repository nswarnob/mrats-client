import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AuthContext } from "../../Provider/AuthProvider";
import axiosSecure from "../../../api/axiosSecure";
import CheckoutForm from "../../Components/Payments/CheckoutForm";
import { toast } from "react-toast";
import usePageTitle from "../../hooks/usePageTitle";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  usePageTitle("Payment");
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [application, setApplication] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch application details and create payment intent
  useEffect(() => {
    const initializePayment = async () => {
      if (!applicationId) {
        setError("Invalid application ID");
        setLoading(false);
        navigate("/dashboard/my-loans");
        return;
      }

      try {
        // Fetch application details
        const appRes = await axiosSecure.get(
          `/application-loans/${applicationId}`,
        );
        const app = appRes.data;

        // Verify user owns this application
        if (app.borrowerEmail !== user?.email) {
          toast.error("You don't have permission to pay for this application");
          navigate("/dashboard/my-loans");
          return;
        }

        // Check if already paid
        if (app.feeStatus === "Paid" || app.paymentStatus === "paid") {
          toast.info("This application fee has already been paid");
          navigate("/dashboard/my-loans");
          return;
        }

        setApplication(app);

        // Calculate amount (application fee: $10)
        const amount = 1000; // $10 in cents

        // Create payment intent from backend
        const paymentRes = await axiosSecure.post(
          "/payments/create-payment-intent",
          {
            amount: amount / 100, // Send as dollars: 10
            applicationId: applicationId,
          },
        );

        setClientSecret(paymentRes.data.clientSecret);
        setError("");
      } catch (err) {
        console.error("Payment initialization error:", err);
        setError(
          err?.response?.data?.message ||
            err.message ||
            "Failed to initialize payment",
        );
        toast.error(
          err?.response?.data?.message || "Failed to initialize payment",
        );
      } finally {
        setLoading(false);
      }
    };

    initializePayment();
  }, [applicationId, user?.email, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">
            Initializing payment...
          </p>
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-white dark:from-slate-900 dark:to-slate-800 px-4">
        <div className="max-w-md w-full">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-lg border border-red-200 dark:border-red-800">
            <div className="text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Payment Error
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                {error || "Could not load application details"}
              </p>
              <button
                onClick={() => navigate("/dashboard/my-loans")}
                className="w-full px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
              >
                Back to My Loans
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-white dark:from-slate-900 dark:to-slate-800 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/dashboard/my-loans")}
            className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-4 flex items-center gap-1"
          >
            ← Back to My Loans
          </button>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Payment Details
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Complete your application fee payment to proceed
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 border border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                Pay Now
              </h2>

              {clientSecret ? (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret: clientSecret,
                    appearance: {
                      theme: "stripe",
                      variables: {
                        colorPrimary: "#6B4DF8",
                        colorText: "#1e293b",
                      },
                    },
                  }}
                >
                  <CheckoutForm
                    applicationId={applicationId}
                    amount={1000} // $10 in cents
                  />
                </Elements>
              ) : (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin mx-auto mb-3"></div>
                    <p className="text-slate-600 dark:text-slate-300">
                      Preparing payment form...
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 border border-slate-100 dark:border-slate-800 sticky top-8">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                Order Summary
              </h3>

              <div className="space-y-4">
                {/* Loan Info */}
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    LOAN
                  </p>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {application.loanTitle}
                  </p>
                </div>

                {/* Borrower Info */}
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    BORROWER
                  </p>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {application.firstName} {application.lastName}
                  </p>
                </div>

                {/* Loan Amount */}
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    LOAN AMOUNT
                  </p>
                  <p className="font-medium text-slate-900 dark:text-white">
                    ${Number(application.loanAmount).toFixed(2)}
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Application Fee
                    </p>
                    <p className="font-semibold text-lg text-slate-900 dark:text-white">
                      $10.00
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="pt-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    STATUS
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Pending Payment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 max-w-2xl">
          <p className="text-xs text-blue-700 dark:text-blue-200">
            🔒 <strong>Secure Payment:</strong> Your payment information is
            encrypted and secure. We never store your card details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
