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
   Star,
   Loader2
 } from "lucide-react";
 import { cn } from "@/lib/utils";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { useDAOs, useMyDAOs, useJoinDAO, DAO } from "@/hooks/useDAOs";
 import { useToast } from "@/hooks/use-toast";

 const DAOCard = ({ dao, index, onJoin, isJoining }: { dao: DAO; index: number; onJoin: (id: string) => void; isJoining: boolean }) => (
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
           <span className="text-xs text-muted-foreground">DAO Activo</span>
        </div>
      </div>
      <div className={cn(
        "px-3 py-1 rounded-full text-xs font-medium",
        dao.status === 'active' && "bg-tamv-green/20 text-tamv-green",
         dao.status === 'inactive' && "bg-tamv-gold/20 text-tamv-gold",
         dao.status === 'dissolved' && "bg-muted text-muted-foreground"
      )}>
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
           ${(Number(dao.treasury_balance) / 1000).toFixed(0)}K
        </p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <Users className="w-3 h-3" />
          Members
        </p>
         <p className="font-medium text-foreground">{dao.member_count}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <Vote className="w-3 h-3" />
           Estado
        </p>
         <p className="font-medium text-foreground capitalize">{dao.status}</p>
      </div>
    </div>

    <Button 
       variant="ghost"
       onClick={() => onJoin(dao.id)}
       disabled={isJoining}
      className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-colors"
    >
       {isJoining ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
       Unirse al DAO
      <ArrowRight className="w-4 h-4 ml-2" />
    </Button>
  </motion.div>
);

export default function DAOs() {
   const { data: daos = [], isLoading } = useDAOs();
   const { data: myDAOs = [] } = useMyDAOs();
   const joinDAO = useJoinDAO();
   const { toast } = useToast();
 
   const handleJoinDAO = async (daoId: string) => {
     try {
       await joinDAO.mutateAsync(daoId);
       toast({
         title: "¡Unido al DAO!",
         description: "Ahora eres miembro de este DAO",
       });
     } catch (error: any) {
       toast({
         title: "Error",
         description: error.message || "No se pudo unir al DAO",
         variant: "destructive",
       });
     }
   };
 
   if (isLoading) {
     return (
       <AppLayout>
         <div className="flex items-center justify-center min-h-[60vh]">
           <div className="flex flex-col items-center gap-4">
             <Loader2 className="w-8 h-8 animate-spin text-primary" />
             <span className="text-muted-foreground">Cargando DAOs...</span>
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
           { label: "Your Memberships", value: String(myDAOs.length), icon: Star },
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
         {daos.length === 0 ? (
           <div className="col-span-full text-center py-12">
             <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
             <p className="text-muted-foreground">No hay DAOs disponibles</p>
           </div>
         ) : daos.map((dao, index) => (
           <DAOCard 
             key={dao.id} 
             dao={dao} 
             index={index} 
             onJoin={handleJoinDAO}
             isJoining={joinDAO.isPending}
           />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
