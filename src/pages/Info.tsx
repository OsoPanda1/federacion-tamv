import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft,
  BookOpen,
  Shield,
  Wallet,
  Users,
  Zap,
  Globe,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  {
    id: "about",
    title: "About TAMV",
    icon: Globe,
    content: `TAMV is a civilizational operating system designed to power the next generation of decentralized societies. Built on principles of collective intelligence, sovereign economy, and federated governance, TAMV provides the infrastructure for communities to self-organize, transact, and evolve.

Our platform connects seven federated service blocks that together form a complete digital civilization stack: Core API, Economy API, DAO API, MSR Ledger, Isabella AI, ANUBIS Gateway, and BookPI Ledger.`
  },
  {
    id: "economy",
    title: "Economy Model",
    icon: Wallet,
    content: `The TAMV economy operates on a triple-layer system:

**Token Layer**: TAMV tokens serve as the primary medium of exchange, governance, and value capture within the ecosystem.

**Transaction Fees**: A 0.5% fee on all transactions is automatically split:
- 40% to Creator (originator of value)
- 30% to Infrastructure (platform maintenance)
- 30% to DAO Treasury (collective wealth)

**MSR Reputation**: Your Multi-Signal Reputation (Wisdom, Community, Creation) influences your voting power, access levels, and economic opportunities.`
  },
  {
    id: "daos",
    title: "DAO Governance",
    icon: Users,
    content: `DAOs (Decentralized Autonomous Organizations) are the primary governance units of TAMV civilization.

**Types of DAOs**:
- Governance DAOs (platform-wide decisions)
- Guild DAOs (professional communities)
- Project DAOs (specific initiatives)
- Regional DAOs (geographic communities)

**Proposal System**: Any citizen can create proposals. Voting power is weighted by MSR scores, ensuring that reputation and contribution determine influence.

**Treasury Management**: Each DAO manages its own treasury with transparent on-chain accounting via BookPI.`
  },
  {
    id: "security",
    title: "TENOCHTITLAN Security",
    icon: Shield,
    content: `TENOCHTITLAN is our advanced security gateway that protects the civilization from threats while maintaining transparency.

**ANUBIS Gateway**: Every request passes through our intelligent gateway that calculates real-time risk scores based on:
- Request patterns and anomalies
- Geographic risk indicators
- Historical behavior analysis
- Threat intelligence feeds

**Honeypot Network**: Suspicious actors are automatically routed to convincing decoy systems that capture attack patterns while protecting real infrastructure.

**Rate Limiting & Challenges**: Progressive security measures from soft challenges (CAPTCHAs) to hard blocks, based on risk thresholds.`
  },
  {
    id: "msr",
    title: "MSR Reputation",
    icon: Zap,
    content: `The Multi-Signal Reputation (MSR) system measures your contributions across three dimensions:

**Wisdom (W)**: Knowledge contribution, learning engagement, mentorship activities, and educational content creation.

**Community (C)**: Governance participation, DAO contributions, collaborative projects, and social engagement.

**Creation (Cr)**: Original content, innovation, infrastructure contributions, and value-generating activities.

Your MSR scores are immutably recorded on the BookPI ledger, creating a transparent and unforgeable reputation system.`
  },
  {
    id: "bookpi",
    title: "BookPI Ledger",
    icon: BookOpen,
    content: `BookPI is the immutable audit log that records every significant event in the TAMV civilization.

**What Gets Logged**:
- All financial transactions
- Governance votes and proposals
- MSR reputation updates
- DAO membership changes
- Security events
- System operations

**Chain Integrity**: Each record contains a cryptographic hash linking to the previous record, creating an unbreakable chain of evidence.

**Explorer UI**: Citizens can browse, search, and verify any historical event through the BookPI Explorer interface.`
  }
];

export default function Info() {
  return (
    <div className="min-h-screen bg-background cyber-grid">
      {/* Header */}
      <header className="border-b border-border/50">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center neon-border">
              <span className="text-primary font-display font-bold text-xl">T</span>
            </div>
            <span className="font-display font-bold text-lg text-foreground">TAMV</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Documentation & Manifesto
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to understand and participate in the TAMV civilization
          </p>
        </motion.div>
      </section>

      {/* Table of Contents */}
      <section className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">Quick Navigation</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <section.icon className="w-5 h-5 text-primary" />
                <span className="text-foreground group-hover:text-primary transition-colors">
                  {section.title}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Content Sections */}
      <section className="container mx-auto px-6 pb-20">
        <div className="space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center neon-border">
                  <section.icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {section.title}
                </h2>
              </div>
              <div className="prose prose-invert max-w-none">
                {section.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground whitespace-pre-wrap mb-4">
                    {paragraph.split('**').map((text, j) => 
                      j % 2 === 1 ? <strong key={j} className="text-foreground">{text}</strong> : text
                    )}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 TAMV Platform. Building the future of digital civilization.
          </p>
        </div>
      </footer>
    </div>
  );
}
