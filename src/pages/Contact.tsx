"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, MapPin, Send, CheckCircle2,
  X, ArrowUpRight, MessageSquare, Instagram,
  Facebook, Twitter, Linkedin
} from "lucide-react";
import PageHero from "@/_components/PageHero";

const FORMSPREE_ID = "YOUR_FORM_ID"; // 🔁 Replace with your Formspree form ID

// ── Validation ────────────────────────────────────────────────
interface FormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}
interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.fullName.trim() || data.fullName.trim().length < 2)
    errors.fullName = "Please enter your full name.";
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please enter a valid email address.";
  if (!data.subject.trim() || data.subject.trim().length < 3)
    errors.subject = "Please enter a subject.";
  if (!data.message.trim() || data.message.trim().length < 20)
    errors.message = "Message must be at least 20 characters.";
  return errors;
}

// ── Contact info cards ────────────────────────────────────────
const contactCards = [
  {
    icon: <Phone size={20} />,
    label: "Phone / WhatsApp",
    lines: ["+234 (70) 6360 9080", "+234 (90) 1889 4926"],
    href: "tel:+2347063609080",
    color: "from-emerald-500/20 to-emerald-700/10",
  },
  {
    icon: <Mail size={20} />,
    label: "Email",
    lines: ["rurbanafrica037@gmail.com"],
    href: "mailto:rurbanafrica037@gmail.com",
    color: "from-amber-500/20 to-amber-700/10",
  },
  {
    icon: <MapPin size={20} />,
    label: "Locations",
    lines: [
      "Lagos — 21 Salvation Road, Opebi, Ikeja",
      "Delta — 46 Ogwashi-Uku Road, Umunede",
    ],
    href: "https://maps.google.com",
    color: "from-sky-500/20 to-sky-700/10",
  },
];

const socials = [
  { icon: <Instagram size={15} />, href: "https://instagram.com", label: "Instagram" },
  { icon: <Facebook size={15} />,  href: "https://facebook.com",  label: "Facebook"  },
  { icon: <Twitter size={15} />,   href: "https://twitter.com",   label: "Twitter"   },
  { icon: <Linkedin size={15} />,   href: "https://twitter.com",   label: "LinkedIn"   },
];

// ── Input component ───────────────────────────────────────────
function Field({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-600 dark:text-stone-400">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-[11px] text-red-500 dark:text-red-400 flex items-center gap-1"
          >
            <X size={10} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-white/5 border text-stone-800 dark:text-white
   placeholder:text-stone-400 dark:placeholder:text-stone-500 text-sm
   focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700 transition-all
   ${hasError
     ? "border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-900/10"
     : "border-stone-200 dark:border-white/8 hover:border-stone-300 dark:hover:border-white/14"}`;

// ── Success Dialog ────────────────────────────────────────────
function SuccessDialog({ name, onClose }: { name: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md bg-white dark:bg-[#0d2e1e] rounded-3xl p-8 shadow-2xl border border-stone-200 dark:border-white/8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 dark:border-white/10 text-stone-400 hover:text-stone-700 dark:hover:text-white transition-colors"
          >
            <X size={14} />
          </button>

          {/* Icon */}
          <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-emerald-100 dark:bg-emerald-900/40 animate-ping opacity-30" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/50 border-2 border-emerald-200 dark:border-emerald-700">
              <CheckCircle2 size={36} className="text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>

          <h3
            className="text-2xl font-black text-stone-900 dark:text-white mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Message Sent!
          </h3>
          <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-6">
            Thank you, <span className="font-bold text-emerald-700 dark:text-emerald-400">{name}</span>. We've received your message and will get back to you within 24 hours.
          </p>

          <button
            onClick={onClose}
            className="group inline-flex items-center gap-2 bg-[#064e3b] hover:bg-emerald-800 text-white px-6 py-3 rounded-full font-bold text-sm transition-all"
          >
            Back to Home
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight size={11} strokeWidth={3} />
            </span>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Main ──────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm]         = useState<FormData>({ fullName: "", email: "", subject: "", message: "" });
  const [errors, setErrors]     = useState<FormErrors>({});
  const [submitting, setSub]    = useState(false);
  const [showSuccess, setShow]  = useState(false);
  const [serverError, setServErr] = useState("");

  const update = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSub(true);
    setServErr("");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });
      if (res.ok) {
        setShow(true);
        setForm({ fullName: "", email: "", subject: "", message: "" });
      } else {
        const data = await res.json();
        setServErr(data?.errors?.[0]?.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setServErr("Network error. Please check your connection and try again.");
    } finally {
      setSub(false);
    }
  };

  return (
    <>
      <PageHero
        tag="Get in Touch"
        title="We'd Love to Hear From You"
        accentWord="You"
        description="Whether you want to volunteer, partner, or simply learn more — reach out and we'll respond within 24 hours."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="bg-[#F9FBFA] dark:bg-[#041d14] py-20 lg:py-28 transition-colors duration-700">

        {/* Ambient glow */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-300/6 dark:bg-emerald-400/4 blur-3xl rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-300/5 blur-3xl rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-14">

          {/* Section intro */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="text-center mb-16"
          >
            <h2
              className="text-3xl md:text-4xl font-black text-stone-900 dark:text-white tracking-tight mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              We Are Always Here to{" "}
              <span className="italic text-emerald-700 dark:text-emerald-400">Guide You</span>
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-base max-w-xl mx-auto leading-relaxed">
              Join us in building bridges, empowering minds, and rising together. Your partnership is not just support — it is an investment in Africa's shared destiny.
            </p>
          </motion.div>

          {/* Main grid */}
          <div className="grid lg:grid-cols-[1fr_400px] gap-6 items-start">

            {/* ── FORM ── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white dark:bg-white/4 rounded-3xl border border-stone-200 dark:border-white/8 p-8 lg:p-10 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800/40">
                  <MessageSquare size={16} className="text-emerald-700 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">Send a message</p>
                  <p className="text-sm font-semibold text-stone-700 dark:text-stone-200">We'll get back to you shortly</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full Name" error={errors.fullName}>
                    <input
                      type="text"
                      placeholder="John Matthew..."
                      value={form.fullName}
                      onChange={update("fullName")}
                      className={inputClass(!!errors.fullName)}
                    />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input
                      type="email"
                      placeholder="example@gmail.com"
                      value={form.email}
                      onChange={update("email")}
                      className={inputClass(!!errors.email)}
                    />
                  </Field>
                </div>

                {/* Subject */}
                <Field label="Subject" error={errors.subject}>
                  <input
                    type="text"
                    placeholder="Application for Donation..."
                    value={form.subject}
                    onChange={update("subject")}
                    className={inputClass(!!errors.subject)}
                  />
                </Field>

                {/* Message */}
                <Field label="Message" error={errors.message}>
                  <textarea
                    rows={5}
                    placeholder="Let's hear you..."
                    value={form.message}
                    onChange={update("message")}
                    className={`${inputClass(!!errors.message)} resize-none`}
                  />
                </Field>

                {/* Character counter */}
                <p className={`text-right text-[11px] -mt-3 transition-colors ${
                  form.message.length < 20 ? "text-stone-300 dark:text-stone-600" : "text-emerald-600 dark:text-emerald-400"
                }`}>
                  {form.message.length} / 20 min chars
                </p>

                {/* Server error */}
                {serverError && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-[12px] text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl border border-red-200 dark:border-red-800/40"
                  >
                    <X size={13} /> {serverError}
                  </motion.p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="group w-full flex items-center justify-center gap-3 bg-[#064e3b] hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-emerald-900/20"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 group-hover:rotate-45 transition-transform duration-300">
                        <Send size={12} />
                      </span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* ── CONTACT CARDS ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4"
            >
              {contactCards.map((card, i) => (
                <motion.a
                  key={i}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className="group relative overflow-hidden flex items-start gap-5 bg-[#064e3b] hover:bg-emerald-800 rounded-2xl p-6 border border-emerald-700/30 transition-all duration-300"
                >
                  {/* Gradient glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Icon */}
                  <div className="relative shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 border border-white/10 text-white group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-400 transition-all duration-300">
                    {card.icon}
                  </div>

                  {/* Text */}
                  <div className="relative">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-1">
                      {card.label}
                    </p>
                    {card.lines.map((line, j) => (
                      <p key={j} className="text-sm text-emerald-50/80 leading-relaxed font-medium">
                        {line}
                      </p>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className="relative ml-auto shrink-0 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/30 group-hover:border-amber-400 group-hover:text-amber-400 group-hover:rotate-45 transition-all duration-300">
                    <ArrowUpRight size={13} />
                  </div>
                </motion.a>
              ))}

              {/* Social strip */}
              <div className="flex items-center gap-3 mt-2 p-5 rounded-2xl bg-white dark:bg-white/4 border border-stone-200 dark:border-white/8">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mr-1">
                  Follow us
                </p>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-white/5 text-stone-500 dark:text-stone-400 hover:bg-[#064e3b] hover:text-white hover:border-[#064e3b] transition-all"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success dialog */}
      {showSuccess && (
        <SuccessDialog
          name={form.fullName || "there"}
          onClose={() => setShow(false)}
        />
      )}
    </>
  );
}