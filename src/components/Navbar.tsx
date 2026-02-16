import { useState, useEffect } from "react";
import { Menu, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Programs", href: "/#programs" },
  { label: "Gallery", href: "/gallery" },
  { label: "Events", href: "/events" },
  { label: "Team", href: "/team" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    // If it's a hash link on the home page
    if (href.startsWith("/#") && location.pathname === "/") {
      const el = document.querySelector(href.replace("/", ""));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderLink = (link: { label: string; href: string }, className: string) => {
    if (link.href.startsWith("/#")) {
      if (location.pathname === "/") {
        return (
          <a
            href={link.href.replace("/", "")}
            onClick={() => handleNavClick(link.href)}
            className={className}
          >
            {link.label}
          </a>
        );
      }
      return (
        <Link to={link.href.replace("/#", "/?section=")} className={className}>
          {link.label}
        </Link>
      );
    }
    return (
      <Link to={link.href} onClick={() => setOpen(false)} className={className}>
        {link.label}
      </Link>
    );
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl shadow-lg border-b border-border/50"
          : "bg-background/30 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <span className="text-lg font-bold text-primary-foreground">R</span>
          </div>
          <span className="text-lg font-bold text-foreground">
            Rurban <span className="text-primary">Africa</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            renderLink(
              link,
              `text-sm font-medium text-muted-foreground hover:text-primary transition-colors ${
                location.pathname === link.href ? "text-primary" : ""
              }`
            )
          )}
          <Button asChild className="bg-primary hover:bg-primary/90 gap-2">
            <Link to="/#donate">
              <Heart className="h-4 w-4" /> Donate
            </Link>
          </Button>
        </nav>

        {/* Mobile Nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-background/95 backdrop-blur-xl">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="mt-8 flex flex-col gap-6">
              {navLinks.map((link) =>
                renderLink(
                  link,
                  "text-lg font-medium text-foreground hover:text-primary transition-colors"
                )
              )}
              <Button asChild className="bg-primary hover:bg-primary/90 gap-2 mt-4">
                <Link to="/#donate" onClick={() => setOpen(false)}>
                  <Heart className="h-4 w-4" /> Donate
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
};

export default Navbar;
