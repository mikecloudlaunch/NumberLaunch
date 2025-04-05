import { Route, Switch, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Calculator from "@/pages/calculator";
import About from "@/pages/about";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Contact from "@/pages/contact";
import Changelog from "@/pages/changelog";
import Layout from "@/components/Layout/Layout";

function Router() {
  const [location] = useLocation();
  
  // Log the current location for debugging
  useEffect(() => {
    console.log("Current location:", location);
    
    // Scroll to top when navigating between pages
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/calculator" component={Calculator} />
      <Route path="/about" component={About} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/contact" component={Contact} />
      <Route path="/changelog" component={Changelog} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Always set theme to dark
  const [theme] = useState<"dark">("dark");

  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
    
    // Save to localStorage to persist across sessions
    localStorage.setItem('theme', 'dark');
  }, []);

  // Dummy toggle function that does nothing (we'll keep dark mode always)
  const toggleTheme = () => {
    // No-op function
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Layout theme={theme} toggleTheme={toggleTheme}>
        <Router />
      </Layout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
