import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Globe,
  Zap,
  Activity,
  Eye,
  Lock,
  Server
} from "lucide-react";
import { riskEvents } from "@/data/mockData";
import { cn } from "@/lib/utils";

const SecurityMetric = ({ label, value, status, icon: Icon }: {
  label: string;
  value: string;
  status: 'good' | 'warning' | 'critical';
  icon: any;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="glass-card p-5"
  >
    <div className="flex items-center justify-between mb-3">
      <div className={cn(
        "w-10 h-10 rounded-lg flex items-center justify-center",
        status === 'good' && "bg-tamv-green/20",
        status === 'warning' && "bg-tamv-gold/20",
        status === 'critical' && "bg-destructive/20"
      )}>
        <Icon className={cn(
          "w-5 h-5",
          status === 'good' && "text-tamv-green",
          status === 'warning' && "text-tamv-gold",
          status === 'critical' && "text-destructive"
        )} />
      </div>
      <div className={cn(
        "w-2 h-2 rounded-full",
        status === 'good' && "status-online",
        status === 'warning' && "status-warning",
        status === 'critical' && "status-danger"
      )} />
    </div>
    <div className="text-2xl font-display font-bold text-foreground">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </motion.div>
);

const RiskEventRow = ({ event, index }: { event: typeof riskEvents[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
    className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
  >
    <div className={cn(
      "w-12 h-12 rounded-lg flex items-center justify-center",
      event.decision === 'allow' && "bg-tamv-green/20",
      event.decision === 'challenge' && "bg-tamv-gold/20",
      event.decision === 'block' && "bg-destructive/20",
      event.decision === 'honeypot' && "bg-secondary/20"
    )}>
      {event.decision === 'allow' && <CheckCircle className="w-6 h-6 text-tamv-green" />}
      {event.decision === 'challenge' && <AlertTriangle className="w-6 h-6 text-tamv-gold" />}
      {event.decision === 'block' && <XCircle className="w-6 h-6 text-destructive" />}
      {event.decision === 'honeypot' && <Zap className="w-6 h-6 text-secondary" />}
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <span className="font-mono text-foreground">{event.ip}</span>
        <span className="px-2 py-0.5 rounded bg-muted text-xs text-muted-foreground">
          {event.country}
        </span>
      </div>
      <p className="text-sm text-muted-foreground truncate">{event.reason}</p>
    </div>

    <div className="text-right">
      <div className="flex items-center gap-2 justify-end mb-1">
        <span className="text-sm text-muted-foreground">Risk Score</span>
        <div className={cn(
          "font-display font-bold text-lg",
          event.score < 30 && "text-tamv-green",
          event.score >= 30 && event.score < 70 && "text-tamv-gold",
          event.score >= 70 && "text-destructive"
        )}>
          {event.score}
        </div>
      </div>
      <div className={cn(
        "px-3 py-1 rounded-full text-xs font-medium inline-block",
        event.decision === 'allow' && "bg-tamv-green/20 text-tamv-green",
        event.decision === 'challenge' && "bg-tamv-gold/20 text-tamv-gold",
        event.decision === 'block' && "bg-destructive/20 text-destructive",
        event.decision === 'honeypot' && "bg-secondary/20 text-secondary"
      )}>
        {event.decision.toUpperCase()}
      </div>
    </div>
  </motion.div>
);

export default function Security() {
  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center neon-border-magenta">
            <Shield className="w-7 h-7 text-secondary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              TENOCHTITLAN Security
            </h1>
            <p className="text-muted-foreground">
              Advanced threat detection and honeypot deception system
            </p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="px-4 py-2 glass-card rounded-lg flex items-center gap-2">
              <div className="status-online" />
              <span className="text-sm text-foreground">All Systems Secure</span>
            </div>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SecurityMetric
            icon={Shield}
            label="Threats Blocked (24h)"
            value="847"
            status="good"
          />
          <SecurityMetric
            icon={Eye}
            label="Active Honeypots"
            value="4"
            status="good"
          />
          <SecurityMetric
            icon={AlertTriangle}
            label="Challenges Issued"
            value="23"
            status="warning"
          />
          <SecurityMetric
            icon={Lock}
            label="Security Score"
            value="98.5"
            status="good"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Risk Events */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Recent Security Events
                </h2>
                <span className="text-sm text-muted-foreground">Last 24 hours</span>
              </div>

              <div className="space-y-3">
                {riskEvents.map((event, index) => (
                  <RiskEventRow key={event.id} event={event} index={index} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Honeypot Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-secondary" />
                Honeypot Network
              </h3>

              <div className="space-y-4">
                {[
                  { name: "Auth Decoy", captures: 45, status: "active" },
                  { name: "API Trap", captures: 23, status: "active" },
                  { name: "Data Lure", captures: 12, status: "active" },
                  { name: "Admin Bait", captures: 8, status: "triggered" },
                ].map((pot) => (
                  <div key={pot.name} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      pot.status === 'active' ? "status-online" : "status-warning"
                    )} />
                    <span className="flex-1 text-sm text-foreground">{pot.name}</span>
                    <span className="text-xs text-muted-foreground">{pot.captures} captures</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Geographic Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-primary" />
                Threat Origins
              </h3>

              <div className="space-y-3">
                {[
                  { country: "Unknown/TOR", percentage: 35, color: "bg-destructive" },
                  { country: "Russia", percentage: 22, color: "bg-tamv-gold" },
                  { country: "China", percentage: 18, color: "bg-tamv-gold" },
                  { country: "United States", percentage: 15, color: "bg-primary" },
                  { country: "Other", percentage: 10, color: "bg-muted-foreground" },
                ].map((origin) => (
                  <div key={origin.country}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground">{origin.country}</span>
                      <span className="text-muted-foreground">{origin.percentage}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${origin.percentage}%` }}
                        transition={{ duration: 0.8 }}
                        className={cn("h-full rounded-full", origin.color)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
