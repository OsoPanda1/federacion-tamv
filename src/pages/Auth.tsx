 import { useState, useEffect } from "react";
 import { motion } from "framer-motion";
 import { useNavigate } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import { useAuth } from "@/contexts/AuthContext";
 import { useToast } from "@/hooks/use-toast";
 import { Shield, Zap, Eye, EyeOff } from "lucide-react";
 import { z } from "zod";
 
 const authSchema = z.object({
   email: z.string().email("Email inválido"),
   password: z.string().min(6, "Mínimo 6 caracteres"),
 });
 
 export default function Auth() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false);
   const [activeTab, setActiveTab] = useState("login");
   const { signIn, signUp, user } = useAuth();
   const navigate = useNavigate();
   const { toast } = useToast();
 
   useEffect(() => {
     if (user) {
       navigate("/dashboard");
     }
   }, [user, navigate]);
 
   const handleAuth = async (isLogin: boolean) => {
     try {
       const validation = authSchema.safeParse({ email, password });
       if (!validation.success) {
         toast({
           title: "Error de validación",
           description: validation.error.errors[0].message,
           variant: "destructive",
         });
         return;
       }
 
       setLoading(true);
       const { error } = isLogin 
         ? await signIn(email, password)
         : await signUp(email, password);
 
       if (error) {
         let errorMessage = error.message;
         if (error.message.includes("already registered")) {
           errorMessage = "Este email ya está registrado";
         } else if (error.message.includes("Invalid login")) {
           errorMessage = "Credenciales inválidas";
         } else if (error.message.includes("Email not confirmed")) {
           errorMessage = "Por favor confirma tu email antes de iniciar sesión";
         }
         toast({
           title: "Error",
           description: errorMessage,
           variant: "destructive",
         });
         return;
       }
 
       if (!isLogin) {
         toast({
           title: "¡Registro exitoso!",
           description: "Revisa tu email para confirmar tu cuenta",
         });
       }
     } finally {
       setLoading(false);
     }
   };
 
   return (
     <div className="min-h-screen flex items-center justify-center bg-background cyber-grid p-4">
       {/* Background effects */}
       <div className="fixed inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
       </div>
 
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="w-full max-w-md z-10"
       >
         {/* Logo */}
         <div className="flex justify-center mb-8">
           <div className="flex items-center gap-3">
             <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center neon-border">
               <Shield className="w-8 h-8 text-primary" />
             </div>
             <div>
               <h1 className="font-display font-bold text-2xl text-foreground">TAMV</h1>
               <p className="text-xs text-muted-foreground">Sistema Operativo Civilizacional</p>
             </div>
           </div>
         </div>
 
         <Card className="glass-card border-border/50">
           <CardHeader className="text-center">
             <CardTitle className="font-display text-xl">
               {activeTab === "login" ? "Acceso al Sistema" : "Nuevo Ciudadano"}
             </CardTitle>
             <CardDescription>
               {activeTab === "login" 
                 ? "Ingresa tus credenciales para acceder"
                 : "Únete al ecosistema TAMV"}
             </CardDescription>
           </CardHeader>
           <CardContent>
             <Tabs value={activeTab} onValueChange={setActiveTab}>
               <TabsList className="grid w-full grid-cols-2 mb-6">
                 <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                 <TabsTrigger value="register">Registrarse</TabsTrigger>
               </TabsList>
 
               <TabsContent value="login" className="space-y-4">
                 <div className="space-y-2">
                   <Label htmlFor="login-email">Email</Label>
                   <Input
                     id="login-email"
                     type="email"
                     placeholder="tu@email.com"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="bg-muted/50"
                   />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="login-password">Contraseña</Label>
                   <div className="relative">
                     <Input
                       id="login-password"
                       type={showPassword ? "text" : "password"}
                       placeholder="••••••••"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       className="bg-muted/50 pr-10"
                     />
                     <button
                       type="button"
                       onClick={() => setShowPassword(!showPassword)}
                       className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                     >
                       {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                     </button>
                   </div>
                 </div>
                 <Button
                   onClick={() => handleAuth(true)}
                   disabled={loading}
                   className="w-full"
                 >
                   {loading ? (
                     <div className="flex items-center gap-2">
                       <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                       Verificando...
                     </div>
                   ) : (
                     <div className="flex items-center gap-2">
                       <Zap className="w-4 h-4" />
                       Acceder
                     </div>
                   )}
                 </Button>
               </TabsContent>
 
               <TabsContent value="register" className="space-y-4">
                 <div className="space-y-2">
                   <Label htmlFor="register-email">Email</Label>
                   <Input
                     id="register-email"
                     type="email"
                     placeholder="tu@email.com"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="bg-muted/50"
                   />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="register-password">Contraseña</Label>
                   <div className="relative">
                     <Input
                       id="register-password"
                       type={showPassword ? "text" : "password"}
                       placeholder="Mínimo 6 caracteres"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       className="bg-muted/50 pr-10"
                     />
                     <button
                       type="button"
                       onClick={() => setShowPassword(!showPassword)}
                       className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                     >
                       {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                     </button>
                   </div>
                 </div>
                 <Button
                   onClick={() => handleAuth(false)}
                   disabled={loading}
                   className="w-full"
                 >
                   {loading ? (
                     <div className="flex items-center gap-2">
                       <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                       Procesando...
                     </div>
                   ) : (
                     <div className="flex items-center gap-2">
                       <Shield className="w-4 h-4" />
                       Crear Cuenta
                     </div>
                   )}
                 </Button>
               </TabsContent>
             </Tabs>
           </CardContent>
         </Card>
 
         {/* Security badge */}
         <div className="mt-6 flex justify-center">
           <div className="flex items-center gap-2 text-xs text-muted-foreground">
             <Shield className="w-3 h-3 text-primary" />
             <span>Protegido por TENOCHTITLAN Security</span>
           </div>
         </div>
       </motion.div>
     </div>
   );
 }