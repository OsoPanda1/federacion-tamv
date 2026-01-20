import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { 
  Server, 
  Activity, 
  Shield, 
  TrendingUp, 
  Users,
  Wallet,
  Bot,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap
} from "lucide-react";
import { serviceStatus, riskEvents } from "@/data/mockData";
import { cn } from "@/lib/utils";

const ServiceCard = ({ service }: { service: typeof serviceStatus[0] }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="glass-card p-4"
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          service.status === 'online' && "bg-tamv-green/20",
          service.status === 'degraded' && "bg-tamv-gold/20",
          service.status === 'offline' && "bg-destructive/20"
        )}>
          <Server className={cn(
            "w-5 h-5",
            service.status === 'online' && "text-tamv-green",
            service.status === 'degraded' && "text-tamv-gold",
            service.status === 'offline' && "text-destructive"
          )} />
        </div>
        <div>
          <h4 className="font-medium text-foreground">{service.name}</h4>
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              service.status === 'online' && "status-online",
              service.status === 'degraded' && "status-warning",
              service.status === 'offline' && "status-danger"
            )} />
            <span className="text-xs text-muted-foreground capitalize">{service.status}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <span className="text-muted-foreground">Uptime</span>
        <p className="font-medium text-foreground">{service.uptime}%</p>
      </div>
      <div>
        <span className="text-muted-foreground">Latency</span>
        <p className="font-medium text-foreground">{service.latency}ms</p>
      </div>
    </div>
  </motion.div>
);

const MetricCard = ({ icon: Icon, label, value, change, changeType }: {
  icon: any;
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-5"
  >
    <div className="flex items-center justify-between mb-3">
      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <span className={cn(
        "text-xs font-medium px-2 py-1 rounded-full",
        changeType === 'positive' && "bg-tamv-green/20 text-tamv-green",
        changeType === 'negative' && "bg-destructive/20 text-destructive",
        changeType === 'neutral' && "bg-muted text-muted-foreground"
      )}>
        {change}
      </span>
    </div>
    <div className="text-2xl font-display font-bold text-foreground">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </motion.div>
);

export default function Hub() {
  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-2xl font-bold text-foreground">
            Developer Hub
          </h1>
          <p className="text-muted-foreground">
            System control and infrastructure monitoring
          </p>
        </motion.div>

        {/* Metrics Row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            icon={Activity}
            label="Total Requests (24h)"
            value="2.4M"
            change="+18.2%"
            changeType="positive"
          />
          <MetricCard
            icon={Users}
            label="Active Users"
            value="12,847"
            change="+5.4%"
            changeType="positive"
          />
          <MetricCard
            icon={Wallet}
            label="Total Value Locked"
            value="$8.2M"
            change="+2.1%"
            changeType="positive"
          />
          <MetricCard
            icon={Shield}
            label="Threats Blocked"
            value="847"
            change="-12%"
            changeType="positive"
          />
        </div>

        {/* Services Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Federated Services
            </h2>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-tamv-green" />
              <span className="text-muted-foreground">
                {serviceStatus.filter(s => s.status === 'online').length}/{serviceStatus.length} Online
              </span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {serviceStatus.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Security Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Security Overview
              </h3>
              <a href="/security" className="text-sm text-primary hover:text-primary/80">
                Full Dashboard
              </a>
            </div>

            <div className="space-y-3">
              {riskEvents.slice(0, 4).map((event) => (
                <div key={event.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    event.decision === 'allow' && "bg-tamv-green/20",
                    event.decision === 'challenge' && "bg-tamv-gold/20",
                    event.decision === 'block' && "bg-destructive/20",
                    event.decision === 'honeypot' && "bg-secondary/20"
                  )}>
                    {event.decision === 'allow' && <CheckCircle className="w-5 h-5 text-tamv-green" />}
                    {event.decision === 'challenge' && <AlertTriangle className="w-5 h-5 text-tamv-gold" />}
                    {event.decision === 'block' && <Shield className="w-5 h-5 text-destructive" />}
                    {event.decision === 'honeypot' && <Zap className="w-5 h-5 text-secondary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{event.ip}</p>
                    <p className="text-xs text-muted-foreground truncate">{event.reason}</p>
                  </div>
                  <div className="text-right">
                    <div className={cn(
                      "text-sm font-medium",
                      event.score < 30 && "text-tamv-green",
                      event.score >= 30 && event.score < 70 && "text-tamv-gold",
                      event.score >= 70 && "text-destructive"
                    )}>
                      Risk: {event.score}
                    </div>
                    <div className="text-xs text-muted-foreground capitalize">{event.decision}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Isabella Agents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                Isabella AI Agents
              </h3>
              <a href="/isabella" className="text-sm text-primary hover:text-primary/80">
                Console
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="text-2xl font-display font-bold text-foreground">24</div>
                <div className="text-sm text-muted-foreground">Active Agents</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="text-2xl font-display font-bold text-foreground">1.2K</div>
                <div className="text-sm text-muted-foreground">Tasks/Hour</div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { name: "Transaction Monitor", status: "active", tasks: 342 },
                { name: "Risk Analyzer", status: "active", tasks: 128 },
                { name: "Governance Advisor", status: "idle", tasks: 45 },
                { name: "Content Moderator", status: "active", tasks: 89 },
              ].map((agent) => (
                <div key={agent.name} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    agent.status === 'active' ? "status-online" : "bg-muted-foreground"
                  )} />
                  <span className="flex-1 text-sm text-foreground">{agent.name}</span>
                  <span className="text-xs text-muted-foreground">{agent.tasks} tasks</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
