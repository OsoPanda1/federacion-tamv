 import { useAuth } from "@/contexts/AuthContext";
 import { Navigate, useLocation } from "react-router-dom";
 
 interface ProtectedRouteProps {
   children: React.ReactNode;
 }
 
 export function ProtectedRoute({ children }: ProtectedRouteProps) {
   const { user, loading } = useAuth();
   const location = useLocation();
 
   if (loading) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-background">
         <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
           <span className="text-primary font-display tracking-wider">VERIFICANDO ACCESO</span>
         </div>
       </div>
     );
   }
 
   if (!user) {
     return <Navigate to="/auth" state={{ from: location }} replace />;
   }
 
   return <>{children}</>;
 }