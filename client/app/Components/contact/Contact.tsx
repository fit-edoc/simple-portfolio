"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
      className="py-16 w-full bg-transparent text-foreground relative"
      id="contact"
    >
      <div className="max-w-4xl mx-auto px-6 border-x-[0.5px] border-black/10 dark:border-white/10 min-h-[70vh] flex flex-col justify-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-heading font-bold mb-4 dark:text-white relative inline-block">
            Let's Build Something Amazing
            <span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-neutral-700 dark:bg-neutral-500 rounded-full" />
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed mt-2 font-sans">
            Have an idea? Fill out the form below to get an instant quote and kickstart your project.
          </p>
        </motion.div>

        {/* Form or Response */}
        <div className="max-w-xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {!response ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-6 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/10 dark:border-white/10 shadow-xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-heading">
                      Name
                    </label>
                    <input
                      required
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-black/10 dark:border-white/10 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-all dark:text-white text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-heading">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-black/10 dark:border-white/10 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-all dark:text-white text-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-heading">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    value={formState.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-black/10 dark:border-white/10 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-all dark:text-white text-sm cursor-pointer"
                  >
                    <option value="" className="dark:bg-zinc-950">Select a project type</option>
                    <option value="website" className="dark:bg-zinc-950">Website Development</option>
                    <option value="app" className="dark:bg-zinc-950">Mobile App</option>
                    <option value="design" className="dark:bg-zinc-950">UI/UX Design</option>
                    <option value="other" className="dark:bg-zinc-950">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-heading">
                    Project Details
                  </label>
                  <textarea
                    required
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-black/10 dark:border-white/10 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-all resize-none dark:text-white text-sm"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-neutral-900 dark:bg-neutral-700 hover:bg-neutral-400 text-white rounded-xl font-heading font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-neutral-600/20 cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <>
                      Get Instant Quote <Send size={16} />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="quote-response"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md p-8 rounded-2xl border border-indigo-500/30 shadow-2xl text-center space-y-6 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                <div className="w-16 h-16 bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <CheckCircle size={30} />
                </div>

                <div>
                  <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                    Quote Estimated!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-sans leading-relaxed">
                    {response.message}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 py-6 border-y border-black/10 dark:border-white/10 font-heading">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider font-semibold">
                      Estimated Cost
                    </p>
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                      {response.price}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider font-semibold">
                      Estimated Delivery
                    </p>
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                      {response.time}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setResponse(null)}
                  className="text-indigo-600 dark:text-indigo-400 font-heading font-semibold hover:underline cursor-pointer"
                >
                  Start New Quote
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Contact;
