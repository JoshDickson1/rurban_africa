import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const upcomingEvents = [
  {
    title: "Community Health Outreach",
    date: "March 15, 2026",
    time: "9:00 AM - 4:00 PM",
    location: "Asaba, Delta State",
    description:
      "Free health screenings and wellness education for rural communities in Delta State.",
    tag: "Upcoming",
  },
  {
    title: "Youth Skills Workshop",
    date: "April 5, 2026",
    time: "10:00 AM - 3:00 PM",
    location: "Lagos, Nigeria",
    description:
      "Digital literacy and entrepreneurship training for young Africans aged 15-25.",
    tag: "Upcoming",
  },
  {
    title: "Annual Fundraising Gala",
    date: "May 20, 2026",
    time: "6:00 PM - 10:00 PM",
    location: "Victoria Island, Lagos",
    description:
      "An evening of celebration, networking, and fundraising to support our 2026 programs.",
    tag: "Upcoming",
  },
];

const pastEvents = [
  {
    title: "Back-to-School Drive 2025",
    date: "September 2025",
    location: "Multiple Locations",
    description: "Distributed school supplies to over 500 children in 3 communities.",
  },
  {
    title: "Sustainable Farming Workshop",
    date: "July 2025",
    location: "Warri, Delta State",
    description: "Trained 120 farmers in modern agricultural techniques.",
  },
];

const Events = () => {
  return (
    <Layout>
      <PageHero
        title="Events"
        subtitle="Join Us"
        description="Discover upcoming events and relive past moments of impact."
      />

      {/* Upcoming Events */}
      <section className="py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="container mx-auto px-4"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-foreground mb-10"
          >
            Upcoming Events
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <motion.div key={event.title} variants={fadeInUp}>
                <Card className="h-full border-border/50 bg-card/80 backdrop-blur hover:shadow-lg hover:border-primary/30 transition-all duration-300 group overflow-hidden">
                  {/* Top accent bar */}
                  <div className="h-1 bg-gradient-to-r from-primary to-accent" />
                  <CardContent className="p-6 flex flex-col gap-4">
                    <span className="self-start rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1">
                      {event.tag}
                    </span>
                    <h3 className="text-lg font-bold text-foreground">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {event.description}
                    </p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        {event.location}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="mt-auto gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-gradient-to-b from-secondary/50 to-background">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="container mx-auto px-4"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-foreground mb-10"
          >
            Past Events
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2">
            {pastEvents.map((event) => (
              <motion.div key={event.title} variants={fadeInUp}>
                <Card className="border-border/50 bg-card/60 backdrop-blur">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {event.description}
                    </p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {event.location}
                      </span>
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

export default Events;
