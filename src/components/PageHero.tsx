import { motion } from "framer-motion";
import AfricaOutline from "@/components/AfricaOutline";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
}

const PageHero = ({ title, subtitle, description }: PageHeroProps) => {
  return (
    <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-16">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(152_55%_28%/0.15),transparent_60%)]" />

      {/* Africa outline decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
        <AfricaOutline
          className="h-[60vh] w-auto"
          strokeColor="hsl(var(--primary))"
          strokeWidth={1.5}
          duration={2.5}
          showFill
          fillColor="hsl(var(--primary))"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container relative z-10 mx-auto px-4 text-center"
      >
        {subtitle && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            {subtitle}
          </p>
        )}
        <h1 className="mb-4 text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {description}
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default PageHero;
