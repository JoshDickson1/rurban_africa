"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ⚠️ Replace with your actual Formspree form ID
const FORMSPREE_ID = "xpwzgknd";

const fade = (delay = 0, y = 16) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay },
});

export default function DonateHero() {
  const navigate = useNavigate();
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [agreed, setAgreed]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]     = useState("");

  const handleSubscribe = async () => {
    if (!email || !agreed) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-visible">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/pledge.jpg')" }}
      />
      {/* Green overlay */}
      <div className="absolute inset-0 bg-green-900/70 backdrop-blur-md dark:bg-[#041d14]/92" />
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 pt-20 lg:pt-28 pb-28 lg:pb-36">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: Copy + donation buttons */}
          <div>
            <motion.span
              {...fade(0, 10)}
              className="inline-block text-amber-400 font-bold uppercase tracking-[0.28em] text-[10px] mb-6 bg-white/5 px-4 py-1.5 rounded-full border border-white/10"
            >
              Make an Impact
            </motion.span>

            <motion.h2
              {...fade(0.1, 20)}
              className="text-4xl md:text-5xl font-black text-white leading-[1.06] tracking-tight mb-5"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              You have the power to{" "}
              <span className="text-amber-400 italic">make a difference</span>
            </motion.h2>

            <motion.p {...fade(0.18)} className="text-emerald-100/60 text-base leading-relaxed mb-10 max-w-sm">
              Help make real change to the lives of farming families and rural communities by donating today.
            </motion.p>

            <motion.div {...fade(0.26)} className="flex flex-col gap-4 max-w-sm">
              {/* Single donation — amber pill */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/donate?type=single")}
                className="group flex items-center justify-between w-full bg-amber-400 hover:bg-amber-300 text-black px-6 py-3.5 text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-lg shadow-black/20"
              >
                <span className="flex items-center gap-3">
                  <Globe size={17} strokeWidth={2.2} />
                  Make a single donation
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-900 group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight size={14} strokeWidth={3} />
                </span>
              </motion.button>

              {/* Monthly donation — ghost pill */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/donate?type=monthly")}
                className="group flex items-center justify-between w-full bg-white/10 hover:bg-white/15 border border-white/20 text-white px-6 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all backdrop-blur-sm"
              >
                <span className="flex items-center gap-3">
                  <RefreshCw size={17} strokeWidth={2.2} />
                  Make a monthly donation
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight size={14} strokeWidth={3} />
                </span>
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT: Newsletter card — overflows below section */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:translate-y-16"
          >
            <div className="bg-white dark:bg-emerald-950 rounded-3xl p-8 shadow-2xl shadow-black/30 border border-stone-100 dark:border-emerald-800/30">
              {!submitted ? (
                <>
                  <h3
                    className="text-2xl font-black text-stone-900 dark:text-white mb-2 tracking-tight"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Sign up for updates
                  </h3>
                  <p className="text-stone-500 dark:text-emerald-200/50 text-sm leading-relaxed mb-7">
                    Stay connected with our mission. We'll share stories of impact, upcoming events, and ways to get involved.
                  </p>

                  <div className="space-y-3 mb-5">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-5 py-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-700/30 text-stone-800 dark:text-white placeholder:text-stone-400 dark:placeholder:text-emerald-300/30 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700 transition"
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-5 py-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-700/30 text-stone-800 dark:text-white placeholder:text-stone-400 dark:placeholder:text-emerald-300/30 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700 transition"
                    />
                  </div>

                  {/* Privacy checkbox */}
                  <div
                    className="flex items-start gap-3 mb-6 cursor-pointer"
                    onClick={() => setAgreed(!agreed)}
                  >
                    <div
                      className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-all ${
                        agreed
                          ? "bg-[#064e3b] border-[#064e3b]"
                          : "border-stone-300 dark:border-emerald-700 hover:border-emerald-500"
                      }`}
                    >
                      {agreed && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                          <path
                            d="M1.5 5l2.5 2.5 4.5-5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-[12px] text-stone-500 dark:text-emerald-300/50 leading-relaxed select-none">
                      Accept our{" "}
                      <a
                        href="/privacy-policy"
                        onClick={(e) => e.stopPropagation()}
                        className="text-emerald-700 dark:text-emerald-400 hover:underline underline-offset-2 font-semibold"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </div>

                  {error && <p className="text-red-500 dark:text-red-400 text-xs mb-4">{error}</p>}

                  {/* Submit — matches site button style */}
                  <motion.button
                    onClick={handleSubscribe}
                    disabled={!email || !agreed || loading}
                    whileHover={{ scale: !email || !agreed || loading ? 1 : 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="group w-full flex items-center justify-between bg-[#064e3b] hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all shadow-lg shadow-emerald-950/20"
                  >
                    <span>{loading ? "Subscribing…" : "Subscribe"}</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-black group-hover:rotate-45 group-disabled:rotate-0 transition-transform duration-300">
                      <ArrowUpRight size={14} strokeWidth={3} />
                    </span>
                  </motion.button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-3xl">
                    🌍
                  </div>
                  <h3
                    className="text-xl font-black text-stone-900 dark:text-white"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    You're in!
                  </h3>
                  <p className="text-stone-500 dark:text-emerald-200/50 text-sm max-w-xs leading-relaxed">
                    Thanks for joining us,{" "}
                    <span className="font-semibold text-stone-700 dark:text-emerald-300">
                      {name || "friend"}
                    </span>
                    . We'll keep you updated on our mission across Africa.
                  </p>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}