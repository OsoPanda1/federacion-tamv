import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { 
  Users, 
  Wallet, 
  Vote, 
  Plus,
  Search,
  Filter,
  ArrowRight,
  Zap,
  Star
} from "lucide-react";
import { daos } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DAOCard = ({ dao, index }: { dao: typeof daos[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.02 }}
    className="glass-card p-6 cursor-pointer group"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center neon-border group-hover:shadow-glow-cyan transition-shadow">
          <Zap className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">
            {dao.name}
          </h3>
          <span className="text-xs text-muted-foreground">{dao.category}</span>
        </div>
      </div>
      <div className={cn(
        "px-3 py-1 rounded-full text-xs font-medium",
        dao.status === 'active' && "bg-tamv-green/20 text-tamv-green",
        dao.status === 'voting' && "bg-tamv-gold/20 text-tamv-gold",
        dao.status === 'paused' && "bg-muted text-muted-foreground"
      )}>
        {dao.status === 'voting' && <span className="mr-1">●</span>}
        {dao.status}
      </div>
    </div>

    <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
      {dao.description}
    </p>

    <div className="grid grid-cols-3 gap-4 mb-4">
      <div>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <Wallet className="w-3 h-3" />
          Treasury
        </p>
        <p className="font-medium text-foreground">
          ${(dao.treasury / 1000).toFixed(0)}K
        </p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <Users className="w-3 h-3" />
          Members
        </p>
        <p className="font-medium text-foreground">{dao.members}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <Vote className="w-3 h-3" />
          Proposals
        </p>
        <p className="font-medium text-foreground">{dao.activeProposals}</p>
      </div>
    </div>

    <Button 
      variant="ghost" 
      className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-colors"
    >
      View DAO
      <ArrowRight className="w-4 h-4 ml-2" />
    </Button>
  </motion.div>
);

export default function DAOs() {
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
              DAOs
            </h1>
            <p className="text-muted-foreground">
              Decentralized governance organizations of the TAMV civilization
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Create DAO
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Total DAOs", value: "847", icon: Users },
            { label: "Total Treasury", value: "$5.5M", icon: Wallet },
            { label: "Active Proposals", value: "35", icon: Vote },
            { label: "Your Memberships", value: "5", icon: Star },
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
              placeholder="Search DAOs..."
              className="pl-10 bg-muted/50 border-border/50"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <div className="flex items-center gap-2">
            {['All', 'Governance', 'Development', 'Creative'].map((cat) => (
              <Button
                key={cat}
                variant={cat === 'All' ? 'default' : 'ghost'}
                size="sm"
                className={cat === 'All' ? 'bg-primary/20 text-primary' : ''}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* DAO Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {daos.map((dao, index) => (
            <DAOCard key={dao.id} dao={dao} index={index} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
