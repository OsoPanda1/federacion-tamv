 import { motion } from "framer-motion";
 import { AppLayout } from "@/components/layout/AppLayout";
 import { 
   User, 
   Wallet, 
   Bell, 
   TrendingUp, 
   Users, 
   Activity,
   ArrowUpRight,
   ArrowDownLeft,
   Star,
   Zap,
   Globe,
   Server,
   Shield,
   Target,
   Loader2
 } from "lucide-react";
 import { projectMetrics, projectVision } from "@/data/tamvEcosystem";
 import { cn } from "@/lib/utils";
 import { useAuth } from "@/contexts/AuthContext";
 import { useProfile } from "@/hooks/useProfile";
 import { useMSR } from "@/hooks/useMSR";
 import { useWallet, useTransactions } from "@/hooks/useWallet";
 import { useNotifications } from "@/hooks/useNotifications";
 import { useMyDAOs } from "@/hooks/useDAOs";

const MSRBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium" style={{ color }}>{value}</span>
    </div>
    <div className="msr-bar">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, delay: 0.3 }}
        className="msr-bar-fill"
        style={{ backgroundColor: color }}
      />
    </div>
  </div>
);

const PlatformMetric = ({ icon: Icon, label, value, subtext, trend }: {
  icon: any;
  label: string;
  value: string;
  subtext?: string;
  trend?: number;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="glass-card p-4"
  >
    <div className="flex items-center justify-between mb-2">
      <Icon className="w-5 h-5 text-primary" />
      {trend && (
        <span className={cn(
          "text-xs flex items-center gap-1",
          trend > 0 ? "text-tamv-green" : "text-destructive"
        )}>
          <TrendingUp className="w-3 h-3" />
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <div className="text-2xl font-display font-bold text-foreground">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
    {subtext && <div className="text-xs text-primary mt-1">{subtext}</div>}
  </motion.div>
);

export default function Dashboard() {
   const { user } = useAuth();
   const { data: profile, isLoading: profileLoading } = useProfile();
   const { data: msr, isLoading: msrLoading } = useMSR();
   const { data: wallet, isLoading: walletLoading } = useWallet();
   const { data: transactions = [], isLoading: txLoading } = useTransactions();
   const { data: notifications = [], isLoading: notifLoading } = useNotifications();
   const { data: myDAOs = [], isLoading: daosLoading } = useMyDAOs();
 
   const isLoading = profileLoading || msrLoading || walletLoading;
 
   if (isLoading) {
     return (
       <AppLayout>
         <div className="flex items-center justify-center min-h-[60vh]">
           <div className="flex flex-col items-center gap-4">
             <Loader2 className="w-8 h-8 animate-spin text-primary" />
             <span className="text-muted-foreground">Cargando dashboard...</span>
           </div>
         </div>
       </AppLayout>
     );
   }
 
  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
               Bienvenido, {profile?.display_name || user?.email?.split('@')[0] || 'Ciudadano'}
            </h1>
            <p className="text-muted-foreground">
              Tu panel de control civilizacional • {projectVision.name}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 glass-card rounded-lg">
              <div className="status-online" />
              <span className="text-sm text-muted-foreground">
                {projectMetrics.status.completion}% Completo
              </span>
            </div>
          </div>
        </motion.div>

        {/* Platform Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <h2 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Métricas de la Plataforma
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <PlatformMetric
              icon={Users}
              label="Usuarios Activos"
              value={`${(projectMetrics.users.activeMonthly / 1000000).toFixed(1)}M`}
              subtext="Mensuales"
              trend={12}
            />
            <PlatformMetric
              icon={Target}
              label="Ingresos"
              value={`$${(projectMetrics.economic.monthlyRevenue / 1000000).toFixed(0)}M`}
              subtext="USD/mes"
              trend={8}
            />
            <PlatformMetric
              icon={Server}
              label="Uptime"
              value={`${projectMetrics.technical.uptime}%`}
              subtext="Disponibilidad"
            />
            <PlatformMetric
              icon={Shield}
              label="NPS Score"
              value={`${projectMetrics.users.npsScore}`}
              subtext="Satisfacción"
              trend={5}
            />
          </div>
        </motion.div>

        {/* Top Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center neon-border">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-lg text-foreground">
                   {profile?.display_name || 'Ciudadano TAMV'}
                </h3>
                 <p className="text-sm text-muted-foreground">{user?.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium capitalize">
                     Ciudadano
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-tamv-gold/20 text-tamv-gold text-xs font-medium">
                    ID-NVIDA Verificado
                  </span>
                </div>
              </div>
            </div>

            {/* MSR Reputation */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <Star className="w-4 h-4 text-tamv-gold" />
                  Reputación MSR
                </h4>
                <span className="text-sm text-muted-foreground">
                   Promedio: {msr ? Math.round((msr.wisdom + msr.community + msr.creation) / 3) : 0}
                </span>
              </div>
               <MSRBar label="Wisdom (Sabiduría)" value={msr?.wisdom || 0} color="hsl(186, 100%, 50%)" />
               <MSRBar label="Community (Comunidad)" value={msr?.community || 0} color="hsl(330, 100%, 50%)" />
               <MSRBar label="Creation (Creación)" value={msr?.creation || 0} color="hsl(270, 100%, 60%)" />
            </div>
          </motion.div>

          {/* Wallet Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" />
                Balance del Wallet
              </h3>
              <span className="text-sm text-tamv-green flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +12.5%
              </span>
            </div>

            <div className="mb-6">
              <div className="text-4xl font-display font-bold text-gradient-cyber">
                 {wallet?.balance ? Number(wallet.balance).toLocaleString() : '0'}
              </div>
               <div className="text-muted-foreground">{wallet?.currency || 'TAMV'} Tokens</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors font-medium">
                <ArrowUpRight className="w-4 h-4" />
                Enviar
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-secondary/20 text-secondary hover:bg-secondary/30 transition-colors font-medium">
                <ArrowDownLeft className="w-4 h-4" />
                Recibir
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">FairSplit Activo</span>
                <span className="text-tamv-green">70% para creadores</span>
              </div>
            </div>
          </motion.div>

          {/* Notifications Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                NOTITAMV
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-secondary/20 text-secondary text-xs font-medium">
               {notifications.filter((n: any) => !n.read).length} Nuevas
              </span>
            </div>

            <div className="space-y-3">
             {notifications.length === 0 ? (
               <div className="text-center py-8 text-muted-foreground">
                 <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                 <p className="text-sm">No hay notificaciones</p>
               </div>
             ) : notifications.slice(0, 4).map((notif: any) => (
                <div
                  key={notif.id}
                  className={cn(
                    "p-3 rounded-lg transition-colors cursor-pointer",
                    notif.read ? "bg-muted/30" : "bg-muted/50 border-l-2 border-primary"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                     notif.notification_type === 'success' && "bg-tamv-green",
                     notif.notification_type === 'warning' && "bg-tamv-gold",
                     notif.notification_type === 'error' && "bg-destructive",
                     notif.notification_type === 'info' && "bg-primary",
                     notif.notification_type === 'transaction' && "bg-tamv-green",
                     notif.notification_type === 'dao' && "bg-primary",
                     notif.notification_type === 'security' && "bg-tamv-gold"
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {notif.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {notif.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Actividad Reciente
              </h3>
              <a href="/wallet" className="text-sm text-primary hover:text-primary/80 transition-colors">
                Ver Todo
              </a>
            </div>

            <div className="space-y-3">
             {transactions.length === 0 ? (
               <div className="text-center py-8 text-muted-foreground">
                 <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                 <p className="text-sm">No hay transacciones recientes</p>
               </div>
             ) : transactions.slice(0, 5).map((tx: any) => {
               const isIncoming = tx.tx_type === 'deposit' || tx.tx_type === 'reward';
               return (
               <div key={tx.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                   isIncoming ? "bg-tamv-green/20" : "bg-secondary/20"
                  )}>
                   {isIncoming ? (
                      <ArrowDownLeft className="w-5 h-5 text-tamv-green" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-secondary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                     {tx.description || tx.tx_type}
                    </p>
                   <p className="text-xs text-muted-foreground capitalize">
                     {tx.tx_type.replace('_', ' ')}
                   </p>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      "font-medium",
                     isIncoming ? "text-tamv-green" : "text-foreground"
                    )}>
                     {isIncoming ? '+' : '-'}{Number(tx.amount).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">TAMV</p>
                  </div>
                </div>
               );
             })}
            </div>
          </motion.div>

          {/* DAO Memberships */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Tus DAOs
              </h3>
              <a href="/daos" className="text-sm text-primary hover:text-primary/80 transition-colors">
                Ver Todo
              </a>
            </div>

            <div className="space-y-3">
             {myDAOs.length === 0 ? (
               <div className="text-center py-8 text-muted-foreground">
                 <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                 <p className="text-sm">No perteneces a ningún DAO</p>
                 <a href="/daos" className="text-primary text-sm hover:underline">Explorar DAOs</a>
               </div>
             ) : myDAOs.slice(0, 4).map((membership: any) => {
               const dao = membership.dao;
               return (
               <div key={membership.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center neon-border">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{dao.name}</p>
                   <p className="text-xs text-muted-foreground">{dao.member_count} miembros</p>
                  </div>
                  <div className="text-right">
                    <div className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium",
                     dao.status === 'active' && "bg-tamv-green/20 text-tamv-green",
                     dao.status === 'inactive' && "bg-muted text-muted-foreground",
                     dao.status === 'dissolved' && "bg-destructive/20 text-destructive"
                    )}>
                     {dao.status}
                    </div>
                  </div>
                </div>
               );
             })}
            </div>
          </motion.div>
        </div>

        {/* Quick Stats Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-4"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Países</div>
                <div className="font-display font-bold text-foreground">{projectMetrics.global.countriesAvailable}</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Servicios</div>
                <div className="font-display font-bold text-foreground">{projectMetrics.status.servicesImplemented}</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Retención 30d</div>
                <div className="font-display font-bold text-foreground">{projectMetrics.users.retention30Days}%</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Horizonte operativo: {projectVision.horizon}
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
