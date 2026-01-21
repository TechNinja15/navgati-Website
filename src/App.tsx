import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TrackPage from "./pages/track";
import BusTrackingPage from "./pages/bus-tracking";
import Complaints from "./pages/complaints";
import DownloadPage from "./pages/download";
import RegisterAgency from "./pages/RegisterAgency";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/track" element={<TrackPage />} />
              <Route path="/bus-tracking/:busNumber" element={<BusTrackingPage />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/download" element={<DownloadPage />} />
              <Route path="/register-agency" element={<RegisterAgency />} />
              <Route path="/registration-success" element={<RegistrationSuccess />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
