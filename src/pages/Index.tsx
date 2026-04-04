import { useRef } from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, Sprout, HandHeart, Globe, GraduationCap } from "lucide-react";
import Hero from "@/_components/Hero";
import AboutSect from "@/_components/AboutSect";
// import TargetAudience from "@/_components/TargetAudience";
import MisVis from "@/_components/MisVis";
import CTA from "@/_components/CTA";
import DonateHero from "@/_components/DonateHero";
import DreamHubs from "@/_components/DreamsHub";
import WhatWeDo from "@/_components/WhatWeDo";
// import TeamsOverview from "@/_components/TeamsOverview";
import BlogPreview from "@/_components/BlogPreview";
import FAQSect from "@/_components/FAQSect";
import DownPart from "@/components/DownPart";
import Impacts from "./Impacts";
import Q1MilestoneSection from "@/_components/Q1MilestoneSection";
// import heroBg from "@/assets/hero-bg.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const stats = [
  { value: "1,950+", label: "Children Reached", icon: Users },
  { value: "6", label: "Communities Served", icon: Globe },
  { value: "100+", label: "Volunteers", icon: HandHeart },
  { value: "4+", label: "Programs Running", icon: BookOpen },
];

const programs = [
  {
    title: "Education & Literacy",
    description: "Providing quality education and literacy programs to children in underserved communities.",
    icon: GraduationCap,
  },
  {
    title: "Sustainable Agriculture",
    description: "Empowering rural communities with modern farming techniques and sustainable practices.",
    icon: Sprout,
  },
  {
    title: "Community Development",
    description: "Building infrastructure and capacity for lasting community transformation.",
    icon: Users,
  },
  {
    title: "Youth Empowerment",
    description: "Equipping young Africans with skills and opportunities for a brighter future.",
    icon: BookOpen,
  },
];

const Index = () => {
  const sectionRef = useRef(null);
  return (
    <div>
      <div id="hero-section" ref={sectionRef} className="">
      {/* Hero Section */}
      <Hero title={"Give Africa Children and Youth in Rural and Peri-urban Communities a Chance"} />

      </div>

      <section className="relative overflow-hidden bg-white py-24 dark:bg-gradient-to-b dark:from-[#064e3b] dark:to-[#064e3b]">
      

      <div className="container relative mx-auto px-6">
        <motion.div
          // variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              // variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative flex flex-col items-center justify-center rounded-[2.5rem] border border-emerald-100 bg-white/50 p-10 transition-all duration-500 hover:bg-white dark:border-white/5 dark:bg-emerald-950/10 dark:hover:bg-emerald-950/20"
            >
              {/* Subtle Glow Effect on Hover */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />

              <div className="relative mb-6">
                {/* Icon Circle */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-colors duration-500 group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-800/30 dark:text-emerald-400">
                  <stat.icon size={28} strokeWidth={1.5} />
                </div>
                
                {/* Floating particle animation */}
                <motion.div 
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-2 -top-2 h-3 w-3 rounded-full bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>

              <div className="text-center">
                <motion.h3 
                  className="text-4xl lg:text-5xl font-black tracking-tighter text-zinc-900 dark:text-white"
                >
                  {stat.value}
                </motion.h3>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 group-hover:text-emerald-600 dark:text-emerald-500/60 transition-colors">
                  {stat.label}
                </p>
              </div>

              {/* Bottom Line Detail */}
              <div className="absolute bottom-4 left-1/2 h-1 w-0 -translate-x-1/2 rounded-full bg-emerald-500/20 transition-all duration-500 group-hover:w-12" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

      {/* About Teaser */}
      <section id="about" className="bg-[#064e3b]">
        <AboutSect />
      </section>

      {/* <div className="">
        <TargetAudience />
      </div> */}

      {/* <div className="">
        <TeamsOverview />
      </div> */}

      <div className="">
        <MisVis />
      </div>

      <div className="">
        <CTA />
      </div>

      {/* Programs */}
      <div>
        <WhatWeDo />
      </div>

      <div className="">
        <BlogPreview />
      </div>

      <div className="">
        <DownPart />
      </div>

      <div className="">
        <FAQSect />
      </div>

      <div className="">
        <DreamHubs />
      </div>
      
      <div className="">
        <Q1MilestoneSection />
      </div>
      
      <div className="">
        <DonateHero />
      </div>
    </div>
  );
};

export default Index;
