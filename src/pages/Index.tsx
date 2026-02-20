import { motion } from "framer-motion";
import { Heart, Users, BookOpen, Sprout, ArrowRight, HandHeart, Globe, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import AfricaOutline from "@/components/AfricaOutline";
import Hero from "@/_components/Hero";
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
  return (
    <Layout>
      {/* Hero Section */}
      <Hero title={"Give Africa Children and Youth in Rural and Peri-urban Communities a Chance"} />

      {/* Impact Stats */}
      <section className="relative border-y border-border bg-gradient-to-r from-primary/5 via-background to-primary/5 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="container mx-auto grid grid-cols-2 gap-8 px-4 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp} className="text-center">
              <stat.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
              <p className="text-3xl font-extrabold text-foreground">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* About Teaser */}
      <section id="about" className="py-24 relative">
        {/* Subtle Africa outline in background */}
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none">
          <AfricaOutline
            className="h-96 w-auto"
            strokeColor="hsl(var(--foreground))"
            strokeWidth={1}
            duration={2}
          />
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="container relative mx-auto px-4 text-center"
        >
          <motion.p variants={fadeInUp} className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            About Us
          </motion.p>
          <motion.h2 variants={fadeInUp} className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
            Who We Are
          </motion.h2>
          <motion.p variants={fadeInUp} className="mx-auto max-w-3xl text-muted-foreground leading-relaxed">
            Rurban Africa is a non-profit organization dedicated to bridging the divide between rural and urban
            communities. We believe in the power of education, sustainable development, and community-led
            initiatives to create lasting change across the African continent. Our programs reach thousands
            of lives every year, transforming communities one step at a time.
          </motion.p>
        </motion.div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-24 bg-gradient-to-b from-secondary/50 to-background">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="container mx-auto px-4"
        >
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">What We Do</p>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">Our Programs</h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <motion.div key={program.title} variants={fadeInUp}>
                <Card className="group h-full border-border/50 bg-card/80 backdrop-blur hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <CardContent className="flex flex-col items-center text-center p-8">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <program.icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{program.title}</h3>
                    <p className="text-sm text-muted-foreground">{program.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Get Involved / Donate CTA */}
      <section id="get-involved" className="py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="container mx-auto px-4 text-center"
        >
          <motion.p variants={fadeInUp} className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Get Involved
          </motion.p>
          <motion.h2 variants={fadeInUp} className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
            Make a Difference Today
          </motion.h2>
          <motion.p variants={fadeInUp} className="mx-auto mb-10 max-w-2xl text-muted-foreground">
            Whether you donate, volunteer, or partner with us — every action counts. Join us in building a
            brighter future for Africa's communities.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2" asChild>
              <a href="#donate">
                <Heart className="h-5 w-5" /> Donate
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              Volunteer
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              Partner With Us
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-24 bg-gradient-to-b from-primary/10 to-background">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="container mx-auto px-4 text-center"
        >
          <motion.p variants={fadeInUp} className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Donate
          </motion.p>
          <motion.h2 variants={fadeInUp} className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
            Support Our Mission
          </motion.h2>
          <motion.p variants={fadeInUp} className="mx-auto mb-10 max-w-2xl text-muted-foreground">
            Your generous donation helps us reach more communities. Choose your preferred currency and
            donation type below.
          </motion.p>
          <motion.div variants={fadeInUp} className="mx-auto max-w-md">
            <div className="flex justify-center gap-3 mb-6">
              {["₦ Naira", "$ Dollars", "£ Pounds"].map((currency) => (
                <Button key={currency} variant="outline" className="min-w-[100px]">
                  {currency}
                </Button>
              ))}
            </div>
            <div className="flex justify-center gap-3 mb-8">
              {["One-Time", "Weekly", "Monthly"].map((freq) => (
                <Button key={freq} variant="secondary" className="min-w-[100px]">
                  {freq}
                </Button>
              ))}
            </div>
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90 gap-2">
              <Heart className="h-5 w-5" /> Donate via Flutterwave
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">
              You'll be redirected to Flutterwave's secure payment page.
            </p>
          </motion.div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Index;
