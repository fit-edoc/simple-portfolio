"use client";

import React, { useState } from "react";
import * as motion_framer from "motion/react-client";
import { Send, CheckCircle, Loader2 } from "lucide-react";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<null | {
    price: string;
    time: string;
    message: string;
  }>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call and quote generation
    setTimeout(() => {
      setLoading(false);
      // Simple logic to vary the quote based on project type
      let price = "$500 - $1,000";
      let time = "1-2 Weeks";

      if (formState.projectType === "app") {
        price = "$2,000 - $5,000";
        time = "1-2 Months";
      } else if (formState.projectType === "design") {
        price = "$300 - $800";
        time = "3-5 Days";
      }

      setResponse({
        price,
        time,
        message: "Based on your requirements, here is an estimated quote. Let's discuss further to finalize the details!",
      });
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      className="min-h-screen w-full mt-3 py-4 bg-background text-foreground"
      id="contact"
    >
      <div className="max-w-4xl mx-auto px-4 border-x-[0.5px] border-black/30 dark:border-white/20 min-h-screen flex flex-col justify-center">
        {/* Header */}
        <motion_framer.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 dark:text-white">
            Let's Build Something Amazing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have an idea? Fill out the form below to get an instant quote and
            let's start your journey.
          </p>
        </motion_framer.div>

        {/* Form or Response */}
        <div className="max-w-2xl mx-auto w-full">
          {!response ? (
            <motion_framer.form
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-6 bg-white dark:bg-zinc-900/50 p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    required
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Project Type
                </label>
                <select
                  name="projectType"
                  value={formState.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                >
                  <option value="">Select a project type</option>
                  <option value="website">Website Development</option>
                  <option value="app">Mobile App</option>
                  <option value="design">UI/UX Design</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Project Details
                </label>
                <textarea
                  required
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none dark:text-white"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Get Quote <Send size={18} />
                  </>
                )}
              </button>
            </motion_framer.form>
          ) : (
            <motion_framer.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-indigo-500/30 shadow-2xl text-center space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto text-green-600 dark:text-green-400">
                <CheckCircle size={32} />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Quote Ready!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {response.message}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100 dark:border-zinc-800">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Estimated Cost
                  </p>
                  <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    {response.price}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Estimated Time
                  </p>
                  <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    {response.time}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setResponse(null)}
                className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                Start New Quote
              </button>
            </motion_framer.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
