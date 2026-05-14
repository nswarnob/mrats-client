import React, { useEffect, useRef, useState } from "react";
import axiosSecure from "../../../../api/axiosSecure";
import { toast } from "react-toast";
import usePageTitle from "../../../hooks/usePageTitle";

const AiLoanAssistant = () => {
  usePageTitle("AI Loan Assistant");

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const prompt = input.trim();

    if (!prompt) {
      toast.error("Please enter a message");
      return;
    }

    setMessages((prev) => [...prev, { sender: "user", text: prompt }]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axiosSecure.post("/api/routes/loan-assistant", {
        prompt,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            data?.response ||
            data?.reply ||
            "Sorry, I could not generate a response.",
        },
      ]);
    } catch (err) {
      console.error("AI Assistant error:", err);

      const errorMsg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Failed to get AI response. Please try again.";

      toast.error(errorMsg);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, I could not respond right now. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="w-full bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            LoanLink AI Assistant
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Ask about loans, approval process, eligibility, repayment, and
            payment status.
          </p>
        </div>

        <div className="flex h-[600px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 md:h-[700px]">
          <div className="flex-1 space-y-4 overflow-y-auto p-4 md:p-6">
            {messages.length === 0 && (
              <div className="flex h-full min-h-[250px] items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-500">
                    <svg
                      className="h-8 w-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
                    </svg>
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                    Start Your Conversation
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400">
                    Ask anything about loans, eligibility, repayment, or
                    approval.
                  </p>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "ai" && (
                  <div className="mr-3 shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-500">
                      <svg
                        className="h-5 w-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
                      </svg>
                    </div>
                  </div>
                )}

                <div
                  className={`max-w-xs wrap-break-words rounded-lg px-4 py-3 text-sm md:max-w-md md:text-base lg:max-w-lg xl:max-w-2xl ${
                    message.sender === "user"
                      ? "rounded-br-none bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-md"
                      : "rounded-bl-none border border-slate-200 bg-slate-100 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="mr-3 shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-500">
                    <svg
                      className="h-5 w-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
                    </svg>
                  </div>
                </div>

                <div className="rounded-lg rounded-bl-none border border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex gap-2">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400"></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 delay-100"></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 delay-200"></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about loans, repayment, or eligibility..."
                disabled={loading}
                rows="2"
                className="flex-1 resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 transition-all placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
              />

              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex min-w-[90px] items-center justify-center rounded-lg bg-linear-to-r from-blue-500 to-blue-600 px-5 py-3 font-semibold text-white shadow-md transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                ) : (
                  "Send"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiLoanAssistant;
