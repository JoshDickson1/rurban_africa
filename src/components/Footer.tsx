import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import AfricaOutline from "@/components/AfricaOutline";

const Footer = () => {
  const { theme, setTheme } = useTheme();

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/#about" },
    { label: "What We Do", href: "/#programs" },
    { label: "Gallery", href: "/gallery" },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
  ];

  const supportLinks = [
    { label: "Contact", href: "/#contact" },
    { label: "Volunteer", href: "/#get-involved" },
    { label: "Partner With Us", href: "/#get-involved" },
    { label: "Donate", href: "/#donate" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook", color: "hover:bg-[#1877F2]" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "hover:bg-[#E4405F]" },
    { icon: Twitter, href: "https://x.com", label: "X / Twitter", color: "hover:bg-[#1DA1F2]" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:bg-[#0A66C2]" },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-secondary to-background border-t border-border">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      {/* Africa outline watermark */}
      <div className="absolute right-8 top-8 opacity-[0.04] pointer-events-none">
        <AfricaOutline
          className="h-64 w-auto"
          strokeColor="hsl(var(--foreground))"
          strokeWidth={1}
          duration={3}
          delay={0.5}
        />
      </div>

      <div className="container relative mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="text-xl font-bold text-primary-foreground">R</span>
              </div>
              <span className="text-xl font-bold text-foreground">
                Rurban <span className="text-primary">Africa</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              One Africa. Two Worlds. One Future. — Bridging the gap between rural and urban communities across Africa through education, sustainability, and empowerment.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary hover:text-white transition-all duration-300 ${social.color}`}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-5">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <a
                  href="mailto:rurbanafrica037@gmail.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  rurbanafrica037@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>+234 816 830 7372</p>
                  <p>+234 814 067 3044</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Lagos Office, Nigeria</p>
                  <p>Delta Office, Nigeria</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Rurban Africa. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms & Conditions
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-8 w-8 rounded-full"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
