import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const galleryCategories = [
  "All",
  "Community Outreach",
  "Education",
  "Events",
  "Agriculture",
];

const galleryItems = [
  { category: "Community Outreach", aspect: "aspect-square" },
  { category: "Education", aspect: "aspect-video" },
  { category: "Events", aspect: "aspect-square" },
  { category: "Agriculture", aspect: "aspect-[4/5]" },
  { category: "Education", aspect: "aspect-square" },
  { category: "Community Outreach", aspect: "aspect-video" },
  { category: "Events", aspect: "aspect-[4/5]" },
  { category: "Agriculture", aspect: "aspect-square" },
  { category: "Community Outreach", aspect: "aspect-video" },
];

const Gallery = () => {
  return (
    <Layout>
      <PageHero
        title="Our Gallery"
        subtitle="See Our Impact"
        description="Visual stories from the communities we serve across Africa."
      />

      {/* Category filters */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                className="px-5 py-2 rounded-full text-sm font-medium border border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="container mx-auto px-4"
        >
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="break-inside-avoid group"
              >
                <div
                  className={`${item.aspect} relative rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/10 border border-border/50`}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <Camera className="h-8 w-8 opacity-30" />
                    <span className="text-xs opacity-50">{item.category}</span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-colors duration-300 flex items-end">
                    <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm font-medium text-primary-foreground">
                        {item.category}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Gallery;
