import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { toast } from "react-toast";
import axiosSecure from "../../../api/axiosSecure";
import { useNavigate } from "react-router";

const CheckoutForm = ({ applicationId, amount, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe is not loaded");
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    try {
      // Confirm the payment
      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (result.error) {
        // Payment failed
        setErrorMessage(result.error.message);
        toast.error(result.error.message);
        setIsProcessing(false);
        return;
      }

      if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
        // Payment succeeded - update the application in the backend
        try {
          await axiosSecure.patch(
            `/application-loans/${applicationId}/payment-success`,
            {
              paymentStatus: "paid",
              feeStatus: "Paid",
              transactionId: result.paymentIntent.id,
              paidAt: new Date().toISOString(),
              paymentMethod: "stripe",
            },
          );

          toast.success(
            "Payment successful! Your application fee has been paid.",
          );

          // Call parent callback if provided
          if (onPaymentSuccess) {
            onPaymentSuccess();
          }

          // Navigate to dashboard after 2 seconds
          setTimeout(() => {
            navigate("/dashboard/my-loans");
          }, 2000);
        } catch (error) {
          toast.error(
            error?.response?.data?.message ||
              "Payment succeeded but failed to update application",
          );
          console.error("Failed to update application:", error);
        }
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred during payment");
      toast.error(error.message || "Payment failed");
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      {/* Payment Element (handles card input) */}
      <PaymentElement
        options={{
          layout: "tabs",
          defaultValues: {
            billingDetails: {
              name: "",
              email: "",
            },
          },
        }}
      />

      {/* Error Message */}
      {errorMessage && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-200">
            {errorMessage}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full rounded-lg bg-gradient-to-r from-[#6B4DF8] to-purple-600 py-3 font-semibold text-white shadow-lg shadow-purple-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-purple-500/60"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing Payment...
          </span>
        ) : (
          `Pay $${(amount / 100).toFixed(2)}`
        )}
      </button>

      {/* Test Card Information */}
      <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-700 dark:text-blue-200">
          <strong>Test Mode:</strong> Use card 4242 4242 4242 4242 | Any future
          date | Any CVC
        </p>
      </div>
    </form>
  );
};

export default CheckoutForm;
