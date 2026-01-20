import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { 
  Vote, 
  Clock, 
  Users, 
  CheckCircle,
  XCircle,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const proposals = [
  {
    id: "prop_001",
    title: "Infrastructure Expansion Phase 2",
    dao: "Genesis Council",
    description: "Proposal to allocate 500,000 TAMV for expanding core infrastructure and improving system latency across all nodes.",
    status: "active",
    votesFor: 892,
    votesAgainst: 145,
    totalVotes: 1247,
    quorum: 60,
    currentQuorum: 83,
    endDate: "2024-01-22T00:00:00Z",
    category: "Infrastructure"
  },
  {
    id: "prop_002",
    title: "Creator Grant Program Q1 2024",
    dao: "Creative Nexus",
    description: "Establish a 100,000 TAMV fund for supporting emerging creators in the ecosystem.",
    status: "active",
    votesFor: 654,
    votesAgainst: 89,
    totalVotes: 892,
    quorum: 50,
    currentQuorum: 72,
    endDate: "2024-01-25T00:00:00Z",
    category: "Funding"
  },
  {
    id: "prop_003",
    title: "Security Protocol Upgrade",
    dao: "Security Sentinels",
    description: "Implement enhanced TENOCHTITLAN security measures including quantum-resistant encryption.",
    status: "passed",
    votesFor: 124,
    votesAgainst: 4,
    totalVotes: 128,
    quorum: 80,
    currentQuorum: 100,
    endDate: "2024-01-18T00:00:00Z",
    category: "Security"
  },
  {
    id: "prop_004",
    title: "Reduce Transaction Fees",
    dao: "Builders Guild",
    description: "Proposal to reduce base transaction fees from 0.5% to 0.3% to encourage more economic activity.",
    status: "active",
    votesFor: 287,
    votesAgainst: 156,
    totalVotes: 456,
    quorum: 55,
    currentQuorum: 97,
    endDate: "2024-01-23T00:00:00Z",
    category: "Economy"
  }
];

const ProposalCard = ({ proposal, index }: { proposal: typeof proposals[0]; index: number }) => {
  const forPercentage = Math.round((proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100);
  const daysLeft = Math.max(0, Math.ceil((new Date(proposal.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-primary font-medium">{proposal.dao}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{proposal.category}</span>
          </div>
          <h3 className="font-display font-semibold text-lg text-foreground mb-2">
            {proposal.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {proposal.description}
          </p>
        </div>
        <div className={cn(
          "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1",
          proposal.status === 'active' && "bg-primary/20 text-primary",
          proposal.status === 'passed' && "bg-tamv-green/20 text-tamv-green",
          proposal.status === 'failed' && "bg-destructive/20 text-destructive"
        )}>
          {proposal.status === 'active' && <AlertCircle className="w-3 h-3" />}
          {proposal.status === 'passed' && <CheckCircle className="w-3 h-3" />}
          {proposal.status === 'failed' && <XCircle className="w-3 h-3" />}
          {proposal.status}
        </div>
      </div>

      {/* Voting Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-tamv-green flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            For: {proposal.votesFor} ({forPercentage}%)
          </span>
          <span className="text-destructive flex items-center gap-1">
            <XCircle className="w-4 h-4" />
            Against: {proposal.votesAgainst} ({100 - forPercentage}%)
          </span>
        </div>
        <div className="h-3 rounded-full bg-muted/50 overflow-hidden flex">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${forPercentage}%` }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="h-full bg-tamv-green"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${100 - forPercentage}%` }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="h-full bg-destructive"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div>
          <p className="text-muted-foreground flex items-center gap-1">
            <Users className="w-3 h-3" />
            Quorum
          </p>
          <p className={cn(
            "font-medium",
            proposal.currentQuorum >= proposal.quorum ? "text-tamv-green" : "text-foreground"
          )}>
            {proposal.currentQuorum}% / {proposal.quorum}%
          </p>
        </div>
        <div>
          <p className="text-muted-foreground flex items-center gap-1">
            <Vote className="w-3 h-3" />
            Total Votes
          </p>
          <p className="font-medium text-foreground">{proposal.votesFor + proposal.votesAgainst}</p>
        </div>
        <div>
          <p className="text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Time Left
          </p>
          <p className="font-medium text-foreground">
            {proposal.status === 'active' ? `${daysLeft} days` : 'Ended'}
          </p>
        </div>
      </div>

      {/* Actions */}
      {proposal.status === 'active' && (
        <div className="flex gap-3">
          <Button className="flex-1 bg-tamv-green/20 text-tamv-green hover:bg-tamv-green/30">
            <CheckCircle className="w-4 h-4 mr-2" />
            Vote For
          </Button>
          <Button variant="outline" className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10">
            <XCircle className="w-4 h-4 mr-2" />
            Vote Against
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default function Governance() {
  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-2xl font-bold text-foreground">
            Governance
          </h1>
          <p className="text-muted-foreground">
            Participate in civilizational decision-making
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Active Proposals", value: "35", icon: Vote, trend: "+5 this week" },
            { label: "Your Votes Cast", value: "127", icon: CheckCircle, trend: "92% participation" },
            { label: "Voting Power", value: "92", icon: TrendingUp, trend: "Based on MSR" },
            { label: "Proposals Created", value: "3", icon: AlertCircle, trend: "2 passed" },
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
              <div className="text-xs text-primary mt-1">{stat.trend}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Proposals Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Active Proposals
            </h2>
            <Button variant="ghost" className="text-primary">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            {proposals.map((proposal, index) => (
              <ProposalCard key={proposal.id} proposal={proposal} index={index} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
