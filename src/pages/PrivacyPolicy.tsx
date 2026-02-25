"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronUp } from "lucide-react";
import DonateHero from "@/_components/DonateHero";

const fade = (delay = 0, y = 20) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: "easeInOut" },
});

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content: `Rurban Africa ("we," "our," or "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a donation to our non-profit organisation.

Please read this policy carefully. If you disagree with its terms, please discontinue use of our site. We reserve the right to make changes to this policy at any time, and will notify you of updates by revising the date at the top of this page.`,
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: `We collect information that you voluntarily provide to us when you register, make a donation, sign up for our newsletter, or contact us. This includes:

**Personal Identifiers** — Your name, email address, postal address, phone number, and other similar identifiers you provide through our forms.

**Financial Information** — When you make a donation, payment details such as card numbers are processed securely by our payment providers (e.g., Paystack, Stripe). We do not store full card details on our servers.

**Communication Data** — Messages you send us, including support queries and feedback.

**Usage Data** — Information your browser sends automatically, including your IP address, browser type and version, the pages you visit, time and date of visits, and time spent on pages.`,
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: `We use the information we collect to:

— Process and acknowledge your donations and send you tax receipts where applicable.
— Send you updates about our programmes, impact reports, and fundraising campaigns (only with your consent).
— Respond to your enquiries and provide support.
— Improve our website and understand how visitors interact with it.
— Comply with legal obligations and prevent fraudulent transactions.
— Fulfil any other purpose for which you provide consent at the point of collection.

We will never sell, trade, or otherwise transfer your personal information to third parties for their marketing purposes.`,
  },
  {
    id: "sharing-information",
    title: "Sharing Your Information",
    content: `We may share your information in the following limited circumstances:

**Service Providers** — We engage trusted third-party companies to assist us in operating our website, processing payments, or communicating with you (e.g., Mailchimp, Formspree, Paystack). These parties are contractually required to keep your information confidential and use it only for the services they provide to us.

**Legal Requirements** — We may disclose your information where required by law, to protect the rights, property, or safety of Rurban Africa, our donors, or others.

**Business Transfers** — In the unlikely event of a merger or restructuring, your information may be transferred as part of that process, subject to standard confidentiality protections.

We do not share your personal data with any third party for advertising purposes.`,
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    content: `We use cookies and similar tracking technologies to improve your browsing experience on our site. Cookies are small data files stored on your device.

**Essential Cookies** — Required for the website to function properly (e.g., session management).

**Analytics Cookies** — Help us understand how visitors use our site (e.g., Google Analytics). This data is aggregated and anonymised.

**Preference Cookies** — Remember your settings, such as dark/light mode preference.

You can choose to disable cookies through your browser settings. However, disabling certain cookies may affect your experience on the site. You can also opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on.`,
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: `We retain your personal information only for as long as necessary to fulfil the purposes outlined in this policy, or as required by law. Specifically:

— Donation records are retained for a minimum of 7 years to comply with financial regulations.
— Newsletter subscriber data is retained until you unsubscribe or request deletion.
— General enquiry data is retained for up to 2 years from your last interaction with us.

When we no longer need your data, we will securely delete or anonymise it.`,
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: `Depending on your location, you may have the following rights regarding your personal data:

**Right to Access** — You may request a copy of the personal information we hold about you.

**Right to Rectification** — You may ask us to correct inaccurate or incomplete data.

**Right to Erasure** — You may request that we delete your personal data, subject to any legal obligations we have to retain it.

**Right to Restrict Processing** — You may ask us to limit how we use your data in certain circumstances.

**Right to Object** — You may object to our processing of your data for direct marketing purposes.

**Right to Data Portability** — You may request that we transfer your data to another service provider in a structured, machine-readable format.

To exercise any of these rights, please contact us at the details below. We will respond within 30 days.`,
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    content: `Our website may contain links to third-party websites. We have no control over the content, privacy policies, or practices of those sites and assume no responsibility for them. We encourage you to review the privacy policies of any third-party sites you visit.`,
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    content: `Our website is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal data, please contact us immediately so we can take appropriate action.`,
  },
  {
    id: "contact",
    title: "Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal data, please contact us:

**Rurban Africa**
Email: info@rurbanafrica.org
Address: [Organisation Address], Africa

For data protection complaints, you also have the right to lodge a complaint with your local data protection authority.`,
  },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const lastUpdated = "February 2026";

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Update active section based on scroll position
      let current = sections[0].id;
      for (const section of sections) {
        const el = sectionRefs.current[section.id];
        if (el && el.getBoundingClientRect().top <= 160) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Render section content with bold markdown support
  const renderContent = (text: string) => {
    return text.split("\n\n").map((para, i) => {
      const parts = para.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className="text-zinc-600 dark:text-emerald-100/60 leading-relaxed text-[15px] mb-4 last:mb-0">
          {parts.map((part, j) =>
            j % 2 === 1 ? (
              <strong key={j} className="font-bold text-zinc-800 dark:text-emerald-200">
                {part}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#F9FBFA] dark:bg-[#041d14] transition-colors duration-700">
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>

      {/* ─── HERO HEADER ─── */}
      <div className="relative overflow-hidden bg-emerald-800 border-b border-zinc-200/60 dark:border-emerald-900/40">
        {/* Subtle geometric bg */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-emerald-700 blur-3xl" />
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#064e3b" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-14 md:pt-40 pt-28 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50 px-4 py-1.5 rounded-full mb-6">
              Legal
            </span>

            <h1
              className="text-5xl md:text-5xl lg:text-7xl font-black text-white dark:text-white leading-[1.02] tracking-tight mb-5"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Privacy
              <span className="block text-amber-400 italic">Policy</span>
            </h1>

            <p className="text-zinc-300 text-sm mt-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Last updated: <span className="text-zinc-100 font-semibold">{lastUpdated}</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── MAIN LAYOUT ─── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-16">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-16 xl:gap-24">

          {/* ─── STICKY SIDEBAR NAV ─── */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-400 dark:text-emerald-600 mb-5 px-2">
                Contents
              </p>
              <nav className="flex flex-col gap-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeSection === section.id
                        ? "bg-[#064e3b] text-white shadow-md shadow-emerald-900/20"
                        : "text-zinc-500 dark:text-emerald-100/40 hover:text-zinc-800 dark:hover:text-emerald-200 hover:bg-zinc-100 dark:hover:bg-white/5"
                    }`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>

              {/* Contact CTA */}
              <div className="mt-10 p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30">
                <p className="text-xs font-bold text-zinc-700 dark:text-emerald-200 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Have questions?
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-emerald-100/50 leading-relaxed mb-4">
                  Reach out to our team and we'll be happy to help.
                </p>
                <a
                  href="mailto:info@rurbanafrica.org"
                  className="inline-flex items-center gap-2 bg-[#064e3b] text-white px-4 py-2 rounded-full text-xs font-bold group hover:bg-emerald-800 transition-colors"
                >
                  Contact Us
                  <span className="bg-amber-400 text-black rounded-full p-0.5 group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight size={10} strokeWidth={3} />
                  </span>
                </a>
              </div>
            </div>
          </aside>

          {/* ─── CONTENT ─── */}
          <main style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {/* Intro blurb */}
            <motion.div
            //   {...fade(0, 16)}
              className="mb-14 p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-[#064e3b] dark:border-emerald-500"
            >
              <p className="text-zinc-700 dark:text-emerald-100/70 text-sm leading-relaxed">
                At Rurban Africa, we believe transparency is the foundation of trust. This policy outlines exactly how we handle your information — we will never exploit your data, and we will always protect your right to privacy.
              </p>
            </motion.div>

            <div className="space-y-16">
              {sections.map((section, i) => (
                <motion.div
                  key={section.id}
                  ref={(el) => { sectionRefs.current[section.id] = el; }}
                //   {...fade(0.05 * i, 16)}
                  className="scroll-mt-32"
                >
                  {/* Section number + title */}
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="text-[11px] font-black tabular-nums text-emerald-300 dark:text-emerald-700 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2
                      className="text-2xl lg:text-3xl font-black text-zinc-900 dark:text-white tracking-tight"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {section.title}
                    </h2>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-zinc-200/80 dark:bg-emerald-900/40 mb-6" />

                  {/* Content */}
                  <div>{renderContent(section.content)}</div>
                </motion.div>
              ))}
            </div>

            {/* Bottom acknowledgement */}
            <motion.div
            //   {...fade(0, 20)}
              className="mt-20 p-8 rounded-3xl bg-[#064e3b] text-white relative overflow-hidden"
            >
              {/* bg texture */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
              />
              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-amber-400 mb-3">
                  Your Commitment Matters
                </p>
                <h3
                  className="text-2xl font-black mb-3 leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  By using our site, you acknowledge you've read and understood this policy.
                </h3>
                <p className="text-emerald-100/60 text-sm leading-relaxed mb-6 max-w-xl">
                  If you have concerns about how we handle your data, we always welcome conversation. Privacy is not just a legal formality for us — it's a reflection of how much we respect the people who support our mission.
                </p>
                <a
                  href="mailto:info@rurbanafrica.org"
                  className="inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-black px-6 py-3 rounded-full text-sm font-bold group transition-colors"
                >
                  Get in touch
                  <span className="bg-black/10 rounded-full p-1 group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight size={14} strokeWidth={3} />
                  </span>
                </a>
              </div>
            </motion.div>
          </main>
        </div>
      </div>

      <div className="">
        <DonateHero />
      </div>

      {/* ─── SCROLL TO TOP ─── */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 right-8 z-50 bg-[#064e3b] text-white p-3 rounded-full shadow-xl shadow-emerald-900/30 hover:bg-emerald-800 transition-colors pointer-events-auto"
        aria-label="Scroll to top"
      >
        <ChevronUp size={20} strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}