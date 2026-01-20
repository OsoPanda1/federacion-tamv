import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { 
  Wallet as WalletIcon, 
  ArrowUpRight, 
  ArrowDownLeft,
  TrendingUp,
  Clock,
  Filter,
  Search,
  Copy,
  ExternalLink
} from "lucide-react";
import { userWallet, transactions } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const TransactionRow = ({ tx }: { tx: typeof transactions[0] }) => {
  const isIncoming = tx.type === 'receive' || tx.type === 'reward';
  
  return (
    <motion.div
      whileHover={{ backgroundColor: "hsl(222 47% 10%)" }}
      className="flex items-center gap-4 p-4 rounded-lg border border-transparent hover:border-border/50 transition-all cursor-pointer"
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center",
        isIncoming ? "bg-tamv-green/20" : "bg-secondary/20"
      )}>
        {isIncoming ? (
          <ArrowDownLeft className="w-6 h-6 text-tamv-green" />
        ) : (
          <ArrowUpRight className="w-6 h-6 text-secondary" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground">{tx.description}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{isIncoming ? tx.from : tx.to}</span>
          <span>•</span>
          <span className="capitalize">{tx.type.replace('_', ' ')}</span>
        </div>
      </div>

      <div className="text-right">
        <p className={cn(
          "font-display font-bold text-lg",
          isIncoming ? "text-tamv-green" : "text-foreground"
        )}>
          {isIncoming ? '+' : '-'}{tx.amount.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
          <Clock className="w-3 h-3" />
          {new Date(tx.timestamp).toLocaleDateString()}
        </p>
      </div>

      <div className={cn(
        "px-3 py-1 rounded-full text-xs font-medium",
        tx.status === 'completed' && "bg-tamv-green/20 text-tamv-green",
        tx.status === 'pending' && "bg-tamv-gold/20 text-tamv-gold",
        tx.status === 'failed' && "bg-destructive/20 text-destructive"
      )}>
        {tx.status}
      </div>
    </motion.div>
  );
};

export default function Wallet() {
  const walletAddress = "0x7a3b...9f4e";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("0x7a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f4e");
    toast.success("Address copied to clipboard");
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-2xl font-bold text-foreground">
            Wallet
          </h1>
          <p className="text-muted-foreground">
            Manage your TAMV tokens and transactions
          </p>
        </motion.div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 gradient-border"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center neon-border">
                  <WalletIcon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Balance</p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-muted-foreground">{walletAddress}</span>
                    <button onClick={handleCopyAddress} className="text-primary hover:text-primary/80">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-5xl font-display font-bold text-gradient-cyber">
                  {userWallet.balance.toLocaleString()}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xl text-muted-foreground">{userWallet.currency} Tokens</span>
                  <span className="flex items-center gap-1 text-tamv-green text-sm">
                    <TrendingUp className="w-4 h-4" />
                    +12.5% this month
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 py-6">
                  <ArrowUpRight className="w-5 h-5 mr-2" />
                  Send Tokens
                </Button>
                <Button variant="outline" className="flex-1 py-6 border-secondary/50 text-secondary hover:bg-secondary/10">
                  <ArrowDownLeft className="w-5 h-5 mr-2" />
                  Receive
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Total Received", value: "45,280", change: "+8.2%" },
                { label: "Total Sent", value: "32,433", change: "" },
                { label: "DAO Contributions", value: "4,500", change: "+15%" },
                { label: "Rewards Earned", value: "3,847", change: "+22%" },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-lg bg-muted/30">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-display font-bold text-foreground">{stat.value}</p>
                  {stat.change && (
                    <p className="text-xs text-tamv-green">{stat.change}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Transaction History
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-10 w-64 bg-muted/50 border-border/50"
                />
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            {transactions.map((tx, index) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <TransactionRow tx={tx} />
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="ghost" className="text-primary">
              View All Transactions
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
