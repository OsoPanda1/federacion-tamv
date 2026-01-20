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
  Zap
} from "lucide-react";
import { 
  currentUser, 
  userMSR, 
  userWallet, 
  transactions, 
  notifications, 
  daos 
} from "@/data/mockData";
import { cn } from "@/lib/utils";

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

export default function Dashboard() {
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
              Welcome back, {currentUser.name.split(' ')[0]}
            </h1>
            <p className="text-muted-foreground">
              Your civilizational dashboard overview
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 glass-card rounded-lg">
              <div className="status-online" />
              <span className="text-sm text-muted-foreground">All Systems Online</span>
            </div>
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
                  {currentUser.name}
                </h3>
                <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium capitalize">
                    {currentUser.role}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-tamv-gold/20 text-tamv-gold text-xs font-medium">
                    Verified
                  </span>
                </div>
              </div>
            </div>

            {/* MSR Reputation */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <Star className="w-4 h-4 text-tamv-gold" />
                  MSR Reputation
                </h4>
                <span className="text-sm text-muted-foreground">
                  Avg: {Math.round((userMSR.wisdom + userMSR.community + userMSR.creation) / 3)}
                </span>
              </div>
              <MSRBar label="Wisdom" value={userMSR.wisdom} color="hsl(186, 100%, 50%)" />
              <MSRBar label="Community" value={userMSR.community} color="hsl(330, 100%, 50%)" />
              <MSRBar label="Creation" value={userMSR.creation} color="hsl(270, 100%, 60%)" />
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
                Wallet Balance
              </h3>
              <span className="text-sm text-tamv-green flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +12.5%
              </span>
            </div>

            <div className="mb-6">
              <div className="text-4xl font-display font-bold text-gradient-cyber">
                {userWallet.balance.toLocaleString()}
              </div>
              <div className="text-muted-foreground">{userWallet.currency} Tokens</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors font-medium">
                <ArrowUpRight className="w-4 h-4" />
                Send
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-secondary/20 text-secondary hover:bg-secondary/30 transition-colors font-medium">
                <ArrowDownLeft className="w-4 h-4" />
                Receive
              </button>
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
                {notifications.filter(n => !n.read).length} New
              </span>
            </div>

            <div className="space-y-3">
              {notifications.slice(0, 4).map((notif) => (
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
                      notif.type === 'success' && "bg-tamv-green",
                      notif.type === 'warning' && "bg-tamv-gold",
                      notif.type === 'alert' && "bg-destructive",
                      notif.type === 'info' && "bg-primary"
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
                Recent Activity
              </h3>
              <a href="/wallet" className="text-sm text-primary hover:text-primary/80 transition-colors">
                View All
              </a>
            </div>

            <div className="space-y-3">
              {transactions.slice(0, 5).map((tx) => (
                <div key={tx.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    (tx.type === 'receive' || tx.type === 'reward') ? "bg-tamv-green/20" : "bg-secondary/20"
                  )}>
                    {(tx.type === 'receive' || tx.type === 'reward') ? (
                      <ArrowDownLeft className="w-5 h-5 text-tamv-green" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-secondary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {tx.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(tx.type === 'receive' || tx.type === 'reward') ? tx.from : tx.to}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      "font-medium",
                      (tx.type === 'receive' || tx.type === 'reward') ? "text-tamv-green" : "text-foreground"
                    )}>
                      {(tx.type === 'receive' || tx.type === 'reward') ? '+' : '-'}{tx.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">TAMV</p>
                  </div>
                </div>
              ))}
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
                Your DAOs
              </h3>
              <a href="/daos" className="text-sm text-primary hover:text-primary/80 transition-colors">
                View All
              </a>
            </div>

            <div className="space-y-3">
              {daos.slice(0, 4).map((dao) => (
                <div key={dao.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center neon-border">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{dao.name}</p>
                    <p className="text-xs text-muted-foreground">{dao.members} members</p>
                  </div>
                  <div className="text-right">
                    <div className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium",
                      dao.status === 'active' && "bg-tamv-green/20 text-tamv-green",
                      dao.status === 'voting' && "bg-tamv-gold/20 text-tamv-gold",
                      dao.status === 'paused' && "bg-muted text-muted-foreground"
                    )}>
                      {dao.status}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {dao.activeProposals} proposals
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
