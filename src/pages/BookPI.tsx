import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { 
  BookOpen, 
  Link as LinkIcon, 
  Clock, 
  Hash,
  Search,
  Filter,
  ChevronRight,
  Shield,
  Activity
} from "lucide-react";
import { bookPIRecords } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RecordCard = ({ record, index }: { record: typeof bookPIRecords[0]; index: number }) => {
  const eventTypeColors: Record<string, string> = {
    TRANSACTION: "bg-tamv-green/20 text-tamv-green",
    VOTE: "bg-primary/20 text-primary",
    MSR_UPDATE: "bg-accent/20 text-accent",
    DAO_JOIN: "bg-tamv-gold/20 text-tamv-gold",
    LOGIN: "bg-secondary/20 text-secondary",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card p-5 hover:neon-border transition-all cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Hash className="w-6 h-6 text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className={cn(
              "px-2 py-1 rounded text-xs font-medium",
              eventTypeColors[record.eventType] || "bg-muted text-muted-foreground"
            )}>
              {record.eventType}
            </span>
            <span className="text-xs text-muted-foreground">
              {record.entity} / {record.entityId}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Hash:</span>
              <code className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                {record.hash}
              </code>
            </div>
            <div className="flex items-center gap-2">
              <LinkIcon className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Previous:</span>
              <code className="text-xs font-mono text-muted-foreground">
                {record.prevHash}
              </code>
            </div>
          </div>

          <div className="mt-3 p-3 rounded-lg bg-muted/30">
            <pre className="text-xs text-foreground overflow-x-auto">
              {JSON.stringify(record.data, null, 2)}
            </pre>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
            <Clock className="w-3 h-3" />
            {new Date(record.timestamp).toLocaleString()}
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
        </div>
      </div>
    </motion.div>
  );
};

export default function BookPI() {
  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center neon-border">
            <BookOpen className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              BookPI Ledger
            </h1>
            <p className="text-muted-foreground">
              Immutable audit log of all civilizational events
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Records", value: "1.2M", icon: Hash },
            { label: "Chain Integrity", value: "100%", icon: Shield },
            { label: "Today's Events", value: "8,472", icon: Activity },
            { label: "Block Height", value: "847,293", icon: LinkIcon },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search & Filter */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by hash, entity, or event type..."
              className="pl-10 bg-muted/50 border-border/50"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <div className="flex items-center gap-2">
            {['All', 'Transaction', 'Vote', 'MSR', 'DAO'].map((type) => (
              <Button
                key={type}
                variant={type === 'All' ? 'default' : 'ghost'}
                size="sm"
                className={type === 'All' ? 'bg-primary/20 text-primary' : ''}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Chain Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-primary" />
            Recent Ledger Entries
          </h2>

          <div className="space-y-4">
            {bookPIRecords.map((record, index) => (
              <div key={record.id} className="relative">
                {/* Chain connector */}
                {index < bookPIRecords.length - 1 && (
                  <div className="absolute left-6 top-[72px] w-0.5 h-8 bg-gradient-to-b from-primary/50 to-transparent" />
                )}
                <RecordCard record={record} index={index} />
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="ghost" className="text-primary">
              Load More Records
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
