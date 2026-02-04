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
  ChevronDown,
  GraduationCap,
  ShoppingBag,
  Gamepad2,
  Heart,
  Newspaper,
  Building,
  Sparkles,
  Video,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { projectMetrics, projectVision, ecosystemServices } from "@/data/tamvEcosystem";

const features = [
  {
    icon: Shield,
    title: "TENOCHTITLAN Security",
    description: "4 sistemas de protección con ANUBIS, HORUS, DEKATEOTL y AZTEK GODS"
  },
  {
    icon: Wallet,
    title: "Economía Federada",
    description: "30+ formas de monetización ética con FairSplit"
  },
  {
    icon: Users,
    title: "DAO Governance",
    description: "Gobernanza descentralizada con representación fractal"
  },
  {
    icon: Bot,
    title: "Isabella AI",
    description: "IA ética explicable con supervisión humana"
  },
  {
    icon: Globe,
    title: "Red Social Avanzada",
    description: "Videos 8K, chats cuánticos, hasta 100K miembros"
  },
  {
    icon: Zap,
    title: "Tecnología XR/VR/4D",
    description: "Motor de render hiperrealista con física cuántica"
  }
];

const services = [
  { icon: Video, name: "Red Social 8K", status: "active" },
  { icon: GraduationCap, name: "Universidad TAMV", status: "development" },
  { icon: ShoppingBag, name: "Marketplace Global", status: "active" },
  { icon: Gamepad2, name: "Gaming & Esports", status: "active" },
  { icon: Heart, name: "Salud Digital", status: "development" },
  { icon: Newspaper, name: "Noticias Verificadas", status: "development" },
  { icon: Building, name: "Bienes Raíces VR", status: "active" },
  { icon: Sparkles, name: "Dream Spaces", status: "active" }
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
              <p className="text-xs text-muted-foreground">Territorio Autónomo de Memoria Viva</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/info" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Documentación
            </Link>
            <Link to="/info#economy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Economía
            </Link>
            <Link to="/info#security" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Seguridad
            </Link>
            <Link to="/info#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Servicios
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Iniciar Sesión
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                Unirse a la Civilización
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
            <span className="text-sm text-muted-foreground">
              {projectMetrics.status.completion}% Completo • {projectMetrics.global.countriesAvailable} Países
            </span>
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">El Primer </span>
            <span className="text-gradient-cyber">Ecosistema Civilizacional</span>
            <br />
            <span className="text-foreground">Federado Antifrágil</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            {projectVision.tagline}
          </p>

          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Arquitectura civilizatoria con tecnología nativa XR/VR/3D/4D, economía federada con 30+ formas de monetización, 
            y seguridad TENOCHTITLAN con 4 sistemas de protección.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-display gradient-border"
              >
                Entrar a la Plataforma
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/info">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-6 text-lg border-border/50 hover:bg-muted/50"
              >
                Leer el Manifiesto
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

      {/* Services Grid */}
      <section className="relative z-10 container mx-auto px-6 py-20 border-t border-border/30">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Servicios del Ecosistema
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {projectMetrics.status.servicesImplemented} servicios implementados y listos para producción
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-4 text-center hover:neon-border transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground text-sm mb-1">{service.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                service.status === 'active' 
                  ? 'bg-tamv-green/20 text-tamv-green' 
                  : 'bg-tamv-gold/20 text-tamv-gold'
              }`}>
                {service.status === 'active' ? 'Activo' : 'En Desarrollo'}
              </span>
            </motion.div>
          ))}
        </div>
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
            Arquitectura Federada de 7 Capas
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Infraestructura civilizacional completa con tecnología cuántica-clásica híbrida
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
              { value: `${projectMetrics.technical.uptime}%`, label: "Uptime" },
              { value: `${(projectMetrics.users.activeMonthly / 1000000).toFixed(1)}M`, label: "Usuarios Activos" },
              { value: `$${(projectMetrics.economic.monthlyRevenue / 1000000).toFixed(0)}M`, label: "Ingresos Mensuales" },
              { value: `${projectMetrics.users.npsScore}`, label: "NPS Score" },
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

      {/* Founder Section */}
      <section className="relative z-10 container mx-auto px-6 py-20 border-t border-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 max-w-4xl mx-auto text-center"
        >
          <Star className="w-12 h-12 text-tamv-gold mx-auto mb-6" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Visionario Latinoamericano
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            "Cuando tropezamos con puertas cerradas y ventanas de indiferencia, 
            construimos nuestro propio espacio—total, abierto, imparable."
          </p>
          <p className="text-sm text-muted-foreground">
            — Edwin Oswaldo Castillo Trejo (Anubis Villaseñor), CEO Fundador
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Orgullosamente de Real del Monte, Hidalgo, México
          </p>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¿Listo para Unirte?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Conviértete en ciudadano de TAMV y participa en construir el futuro de la civilización digital.
            Horizonte operativo: 2026–2040.
          </p>
          <Link to="/register">
            <Button 
              size="lg" 
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-6 text-lg font-display"
            >
              Crear Tu Identidad ID-NVIDA
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
                © 2026 TAMV Platform. Territorio Autónomo de Memoria Viva.
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/info" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Documentación
              </Link>
              <Link to="/info#security" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Seguridad
              </Link>
              <Link to="/info#economy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Economía
              </Link>
              <a 
                href="https://github.com/OsoPanda1/ecosistema-nextgen-tamv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
