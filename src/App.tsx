import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";

import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import Team from "./pages/Team";
import NotFound from "./pages/NotFound";
import Loading from "./_components/Loading";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Donate from "./pages/Donate";
import Terms from "./pages/Terms";
import FAQs from "./pages/FAQs";
import Career from "./pages/Career";
import Layout from "./components/Layout";
import SingleBlog from "./pages/SingleBlog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DreamHubsPage from "./pages/DreamHubsPage";
import Testimonials from "./pages/Testimonials";
import Volunteer from "./pages/Volunteer";
import Partner from "./pages/Partner";
import WhyRural from "./pages/WhyRural";
import TargetAudiencePage from "./pages/TargetAudiencePage";
import Programs from "./pages/Programs";
import Pledge from "./pages/Pledge";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/events" element={<Events />} />
            <Route path="/team" element={<Team />} />
            <Route path="/about" element={<About />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/career" element={<Career />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<SingleBlog />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/partnership" element={<Partners />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/dream_hubs" element={<DreamHubsPage />} /> 
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/pledge" element={<Pledge />} />
            <Route path="/why-rural" element={<WhyRural />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/target-audience" element={<TargetAudiencePage />} />
            <Route path="*" element={<NotFound />} />
          </Route>

        </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;