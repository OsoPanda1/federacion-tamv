import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Shield, 
  Wallet, 
  Users, 
  Bot, 
  Zap, 
  Globe,
  ChevronDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Shield,
    title: "TENOCHTITLAN Security",
    description: "Military-grade protection with honeypot deception"
  },
  {
    icon: Wallet,
    title: "Sovereign Economy",
    description: "Decentralized transactions with MSR reputation"
  },
  {
    icon: Users,
    title: "DAO Governance",
    description: "Collective decision-making for the civilization"
  },
  {
    icon: Bot,
    title: "Isabella AI",
    description: "Intelligent assistant for all platform operations"
  },
  {
    icon: Zap,
    title: "Real-time Systems",
    description: "Instant notifications and live data streams"
  },
  {
    icon: Globe,
    title: "Federated Network",
    description: "7 interconnected service blocks"
  }
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background cyber-grid relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10">
        <nav className="container mx-auto px-6 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center neon-border">
              <span className="text-primary font-display font-bold text-2xl">T</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-foreground">TAMV</h1>
              <p className="text-xs text-muted-foreground">Civilizational Platform</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/info" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Documentation
            </Link>
            <Link to="/info#economy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Economy
            </Link>
            <Link to="/info#security" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Security
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                Join Civilization
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
          >
            <div className="status-online" />
            <span className="text-sm text-muted-foreground">Systems Online • 7 Blocks Connected</span>
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">The </span>
            <span className="text-gradient-cyber">Civilizational</span>
            <br />
            <span className="text-foreground">Operating System</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Build, govern, and thrive in a federated ecosystem where reputation, economy, 
            and collective intelligence converge into a new paradigm of digital civilization.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-display gradient-border"
              >
                Enter the Platform
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/info">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-6 text-lg border-border/50 hover:bg-muted/50"
              >
                Read Manifesto
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Federated Architecture
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Seven interconnected service blocks powering a complete civilizational infrastructure
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 group hover:neon-border transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="glass-card p-8 md:p-12 gradient-border">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "99.99%", label: "Uptime" },
              { value: "12,847", label: "Citizens" },
              { value: "847", label: "Active DAOs" },
              { value: "$2.4M", label: "Treasury" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient-cyber mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Join?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Become a citizen of TAMV and participate in building the future of digital civilization.
          </p>
          <Link to="/register">
            <Button 
              size="lg" 
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-6 text-lg font-display"
            >
              Create Your Identity
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-display font-bold">T</span>
              </div>
              <span className="text-sm text-muted-foreground">
                © 2024 TAMV Platform. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/info" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Documentation
              </Link>
              <Link to="/info#security" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Security
              </Link>
              <Link to="/info#economy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Economy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
