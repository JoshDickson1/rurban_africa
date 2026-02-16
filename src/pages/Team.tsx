import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import AfricaOutline from "@/components/AfricaOutline";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const teamMembers = [
  {
    name: "Founder",
    role: "Executive Director",
    bio: "Passionate about bridging the rural-urban divide across Africa.",
  },
  {
    name: "Program Lead",
    role: "Head of Programs",
    bio: "Overseeing education and community development initiatives.",
  },
  {
    name: "Operations Lead",
    role: "Operations Manager",
    bio: "Ensuring smooth execution of all organizational activities.",
  },
  {
    name: "Outreach Lead",
    role: "Community Outreach",
    bio: "Building partnerships and engaging communities across Nigeria.",
  },
  {
    name: "Communications Lead",
    role: "Communications & Media",
    bio: "Telling the Rurban Africa story to the world.",
  },
  {
    name: "Volunteer Coordinator",
    role: "Volunteer Management",
    bio: "Mobilizing and supporting our growing volunteer network.",
  },
];

const Team = () => {
  return (
    <Layout>
      <PageHero
        title="Our Team"
        subtitle="The People Behind the Mission"
        description="Meet the dedicated individuals driving change across Africa's communities."
      />

      {/* Team Grid */}
      <section className="py-20 relative">
        {/* Background Africa outline */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none">
          <AfricaOutline
            className="h-[80vh] w-auto"
            strokeColor="hsl(var(--foreground))"
            strokeWidth={1}
            duration={4}
            showFill
            fillColor="hsl(var(--foreground))"
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="container relative mx-auto px-4"
        >
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <motion.div key={member.name} variants={fadeInUp}>
                <Card className="group h-full border-border/50 bg-card/80 backdrop-blur hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden">
                  {/* Avatar placeholder */}
                  <div className="h-48 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-bold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-primary mb-2">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {member.bio}
                    </p>
                    <div className="flex justify-center gap-3">
                      {[Linkedin, Twitter, Mail].map((Icon, i) => (
                        <a
                          key={i}
                          href="#"
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Team;
