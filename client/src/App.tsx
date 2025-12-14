import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Auth from "./pages/Auth";
import Onboarding from "./pages/OnBoarding";
import Dashboard from "./pages/Dashboard";
import People from "./pages/People";
import PersonProfile from "./pages/PersonProfile";
import Reminders from "./pages/Reminders";
import AIGenerator from "./pages/AiGenerator";
import WhatsAppSettings from "./pages/WhatsAppSettings";
import Settings from "./pages/Settings";
import { AppLayout } from "./components/layout/AppLayout";
import NotFound from "./pages/NotFound";
import AuthProvider from "./routes/auth/Auth";
import ProtectedRoutes from "./routes/auth/ProtectedRoutes";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/people" element={<People />} />
              <Route path="/people/:id" element={<PersonProfile />} />
              <Route path="/reminders" element={<Reminders />} />
              <Route path="/ai-generator" element={<AIGenerator />} />
              <Route path="/whatsapp" element={<WhatsAppSettings />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
