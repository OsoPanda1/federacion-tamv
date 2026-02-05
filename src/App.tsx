 import { Suspense, lazy } from "react";
 import { AuthProvider } from "@/contexts/AuthContext";
 import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Landing = lazy(() => import("./pages/Landing"));
 const Auth = lazy(() => import("./pages/Auth"));
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
     <AuthProvider>
       <TooltipProvider>
         <Toaster />
         <Sonner />
         <BrowserRouter>
           <Suspense fallback={<LoadingFallback />}>
             <Routes>
               <Route path="/" element={<Landing />} />
               <Route path="/auth" element={<Auth />} />
               <Route path="/info" element={<Info />} />
               <Route path="/dashboard" element={
                 <ProtectedRoute><Dashboard /></ProtectedRoute>
               } />
               <Route path="/hub" element={
                 <ProtectedRoute><Hub /></ProtectedRoute>
               } />
               <Route path="/isabella" element={
                 <ProtectedRoute><Isabella /></ProtectedRoute>
               } />
               <Route path="/wallet" element={
                 <ProtectedRoute><Wallet /></ProtectedRoute>
               } />
               <Route path="/daos" element={
                 <ProtectedRoute><DAOs /></ProtectedRoute>
               } />
               <Route path="/governance" element={
                 <ProtectedRoute><Governance /></ProtectedRoute>
               } />
               <Route path="/security" element={
                 <ProtectedRoute><Security /></ProtectedRoute>
               } />
               <Route path="/bookpi" element={
                 <ProtectedRoute><BookPI /></ProtectedRoute>
               } />
               <Route path="*" element={<NotFound />} />
             </Routes>
           </Suspense>
         </BrowserRouter>
       </TooltipProvider>
     </AuthProvider>
  </QueryClientProvider>
);

export default App;
