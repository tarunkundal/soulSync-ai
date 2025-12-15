import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";

import Index from "./pages";
import AIGenerator from "./pages/AiGenerator";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/OnBoarding";
import People from "./pages/People";
import PersonProfile from "./pages/PersonProfile";
import Reminders from "./pages/Reminders";
import Settings from "./pages/Settings";
import WhatsAppSettings from "./pages/WhatsAppSettings";

import { AppLayout } from "./components/layout/AppLayout";
import AuthCallback from "./pages/AuthCallback";
import { AuthProvider } from "./providers/AuthProvider";
import ProtectedRoutes from "./routes/auth/ProtectedRoutes";
import PublicRoute from "./routes/auth/PublicRoute";
import ROUTES from "./routes";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />

    <BrowserRouter>
      {/* 🔐 GLOBAL AUTH STATE */}
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path={ROUTES.INDEX} element={<Index />} />
          <Route path={ROUTES.AUTH_CALLBACK} element={<AuthCallback />} />

          <Route
            path={ROUTES.AUTH}
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }
          />

          {/* 🔒 Protected */}
          <Route element={<ProtectedRoutes />}>
            <Route path={ROUTES.ONBOARDING} element={<Onboarding />} />
            <Route element={<AppLayout />}>
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route path={ROUTES.PERSON} element={<People />} />
              <Route path={ROUTES.PERSON_PROFILE} element={<PersonProfile />} />
              <Route path={ROUTES.REMINDERS} element={<Reminders />} />
              <Route path={ROUTES.AI_GENERATOR} element={<AIGenerator />} />
              <Route path={ROUTES.WHATSAPP_SETTINGS} element={<WhatsAppSettings />} />
              <Route path={ROUTES.SETTINGS} element={<Settings />} />
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
