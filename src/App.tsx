import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Hub = lazy(() => import("./pages/Hub"));
const Isabella = lazy(() => import("./pages/Isabella"));
const Wallet = lazy(() => import("./pages/Wallet"));
const DAOs = lazy(() => import("./pages/DAOs"));
const Governance = lazy(() => import("./pages/Governance"));
const Security = lazy(() => import("./pages/Security"));
const BookPI = lazy(() => import("./pages/BookPI"));
const Info = lazy(() => import("./pages/Info"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="text-primary font-display tracking-wider">INITIALIZING TAMV</span>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/info" element={<Info />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/hub" element={<Hub />} />
            <Route path="/isabella" element={<Isabella />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/daos" element={<DAOs />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/security" element={<Security />} />
            <Route path="/bookpi" element={<BookPI />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
