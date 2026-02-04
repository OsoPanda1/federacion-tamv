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
  ChevronRight,
  Bot,
  Layers,
  Building,
  Star,
  Target,
  Lock,
  Eye,
  Heart,
  GraduationCap,
  Code
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  projectVision, 
  founderInfo, 
  federatedLayers, 
  tenochtitlanSecurity, 
  economySystem, 
  isabellaAI,
  identitySystem,
  techStack,
  governanceSystem,
  ecosystemServices,
  projectMetrics
} from "@/data/tamvEcosystem";

const sections = [
  {
    id: "about",
    title: "Sobre TAMV",
    icon: Globe,
    content: `**${projectVision.name}**

${projectVision.description}

**Horizonte operativo:** ${projectVision.horizon}
**Versión actual:** DreamWorld v${projectVision.version}
**Estado:** ${projectMetrics.status.completion}% Completo

**Lema Canónico:**
"${projectVision.tagline}"

**Principios Fundamentales:**
${projectVision.principles.map(p => `• **${p.name}**: ${p.description}`).join('\n')}`
  },
  {
    id: "founder",
    title: "CEO Fundador",
    icon: Star,
    content: `**${founderInfo.name}** (${founderInfo.alias})

${founderInfo.role} - ${founderInfo.origin}

**Filosofía Tecnológica:**
${founderInfo.philosophy.map(p => `• ${p}`).join('\n')}

**Logros Destacados:**
${founderInfo.achievements.map(a => `• ${a}`).join('\n')}

**Cita:**
"${founderInfo.quote}"

**GitHub:** ${founderInfo.github}

Su trabajo ha sido validado y certificado por las principales IA del mundo: Claude (Anthropic), Perplexity.ai, Copilot (Microsoft), y DeepSeek.`
  },
  {
    id: "architecture",
    title: "Arquitectura de 7 Capas",
    icon: Layers,
    content: `TAMV opera con una arquitectura federada de 7 capas civilizatorias:

${federatedLayers.map(l => `**CAPA ${l.level} - ${l.name}**
${l.description}`).join('\n\n')}

**NÚCLEO INMORTAL - TAMV CORE v1.1**
Bootstrap Autónomo con continuidad operativa garantizada.`
  },
  {
    id: "security",
    title: "Seguridad TENOCHTITLAN",
    icon: Shield,
    content: `**Principio Fundamental:** "${tenochtitlanSecurity.principle}"

**Componentes de Seguridad:**

${tenochtitlanSecurity.components.map(c => `**${c.name}** - ${c.role}
${c.layers} capas | Estado: ${c.status}
${c.description}`).join('\n\n')}

**Radares Especializados:**
${tenochtitlanSecurity.radars.map(r => `• ${r.icon} **${r.name}**: ${r.purpose}`).join('\n')}

**Guardianía Humana (Ninguna IA tiene autoridad final):**
${tenochtitlanSecurity.guardians.map(g => `• **Guardián ${g.type}**: ${g.role}`).join('\n')}`
  },
  {
    id: "economy",
    title: "Economía Federada",
    icon: Wallet,
    content: `**Modelo:** ${economySystem.model}

**Objetivo Civilizatorio:** ${economySystem.goal}

**Sistema FairSplit:**
${economySystem.fairSplit.description}
${economySystem.fairSplit.features.map(f => `• ${f}`).join('\n')}

**30+ Formas de Monetización Ética:**

${economySystem.categories.map(cat => `**${cat.name}:**
${cat.forms.map(f => `• ${f}`).join('\n')}`).join('\n\n')}`
  },
  {
    id: "governance",
    title: "Gobernanza DAO",
    icon: Users,
    content: `**${governanceSystem.layer}**
${governanceSystem.description}

**Componentes Principales:**
${governanceSystem.components.map(c => `• **${c.name}**: ${c.description}`).join('\n')}

**Poderes del Sistema:**
${governanceSystem.powers.map(p => `• ${p}`).join('\n')}

**Roles:**
${governanceSystem.roles.map(r => `• ${r}`).join('\n')}

Los DAOs son las unidades primarias de gobernanza de la civilización TAMV, con tipos específicos: Governance DAOs, Guild DAOs, Project DAOs, y Regional DAOs.`
  },
  {
    id: "isabella",
    title: "Isabella AI",
    icon: Bot,
    content: `**${isabellaAI.name}**
${isabellaAI.type}

**Capacidades Principales:**
${isabellaAI.capabilities.map(c => `• **${c.name}**: ${c.description}`).join('\n')}

**Aplicaciones Funcionales:**
${isabellaAI.applications.map(a => `• **${a.name}**: ${a.description}`).join('\n')}

Isabella representa la IA ética del ecosistema, con explicabilidad en 3 niveles (usuario, auditor, regulador) y nunca actúa sin supervisión humana.`
  },
  {
    id: "identity",
    title: "ID-NVIDA",
    icon: Lock,
    content: `**${identitySystem.name}**
${identitySystem.type}

**Características:**
${identitySystem.features.map(f => `• **${f.name}**: ${f.description}`).join('\n')}

El sistema de identidad soberana incluye tablas de identities con dignity_score y reputation, auto-creación en primer login, y APIs completas para gestión de identidad verificada.`
  },
  {
    id: "services",
    title: "Servicios del Ecosistema",
    icon: Building,
    content: `**28/35 Servicios Implementados (${projectMetrics.status.percentComplete}% Completo)**

**Red Social Avanzada (8/8 ✅):**
${ecosystemServices.socialNetwork.features.map(f => `• ${f.name}: ${f.description}`).join('\n')}

**Universidad TAMV (${ecosystemServices.university.completion}% - ${ecosystemServices.university.launchDate}):**
Programas: ${ecosystemServices.university.programs.join(', ')}

**Comercio y Marketplace (100% ✅):**
${ecosystemServices.commerce.features.join(', ')}

**Entretenimiento (100% ✅):**
${ecosystemServices.entertainment.features.join(', ')}

**Salud Digital (${ecosystemServices.health.completion}% - ${ecosystemServices.health.launchDate}):**
${ecosystemServices.health.features.join(', ')}

**Dream Spaces (100% ✅):**
${ecosystemServices.dreamSpaces.features.join(', ')}`
  },
  {
    id: "msr",
    title: "Sistema MSR",
    icon: Zap,
    content: `**MSR (Metaverse Sovereign Registry)**

El sistema de reputación multi-señal mide tus contribuciones en tres dimensiones:

**Wisdom (W):** Contribución de conocimiento, engagement en aprendizaje, actividades de mentoría, y creación de contenido educativo.

**Community (C):** Participación en gobernanza, contribuciones a DAOs, proyectos colaborativos, y engagement social.

**Creation (Cr):** Contenido original, innovación, contribuciones de infraestructura, y actividades generadoras de valor.

**Características Técnicas:**
• Tabla msr_events con hash inmutable
• Logger automático de eventos
• API: POST /msr/log, GET /msr/events
• Dignidad decay job (cron 24h)

Tus puntuaciones MSR se registran inmutablemente en el ledger BookPI, creando un sistema de reputación transparente e infalsificable.`
  },
  {
    id: "bookpi",
    title: "BookPI Ledger",
    icon: BookOpen,
    content: `**BookPI - Sistema de Registro Inmutable**

BookPI es el log de auditoría inmutable que registra cada evento significativo en la civilización TAMV.

**Qué se Registra:**
• Todas las transacciones financieras
• Votos y propuestas de gobernanza
• Actualizaciones de reputación MSR
• Cambios de membresía en DAOs
• Eventos de seguridad
• Operaciones del sistema

**Integridad de Cadena:** Cada registro contiene un hash criptográfico enlazando al registro anterior, creando una cadena de evidencia inquebrantable.

**Explorer UI:** Los ciudadanos pueden navegar, buscar y verificar cualquier evento histórico a través de la interfaz BookPI Explorer.

**Blockchain MSR Antifraude:**
Implementación con Smart Contracts (Solidity ^0.8.19), Merkle State Root, y múltiples nodos validadores.`
  },
  {
    id: "tech",
    title: "Stack Tecnológico",
    icon: Code,
    content: `**Tecnología Híbrida Quantum-Tradicional**

**Computación Cuántica:**
${techStack.quantumComputing.join(', ')}

**Infraestructura:**
${techStack.infrastructure.join(', ')}

**Bases de Datos:**
${techStack.databases.join(', ')}

**Renderizado XR:**
${techStack.xrRendering.join(', ')}

**Sistemas de IA:**
${techStack.aiSystems.join(', ')}

**Blockchain:**
${techStack.blockchain.join(', ')}

**Desarrollo:**
${techStack.development.join(', ')}

**Características Técnicas Avanzadas:**
• Ray Tracing en Tiempo Real
• Física Cuántica Simulada
• IA Generativa de Texturas
• Renderizado 4D
• Haptic Feedback
• Criptografía Post-Cuántica`
  },
  {
    id: "metrics",
    title: "Métricas del Proyecto",
    icon: Target,
    content: `**Estado Actual del Proyecto**

**Usuarios y Engagement:**
• Usuarios Registrados: ${(projectMetrics.users.registered / 1000000).toFixed(1)} millones
• Usuarios Activos Mensuales: ${(projectMetrics.users.activeMonthly / 1000000).toFixed(1)} millones
• Tiempo Promedio de Sesión: ${projectMetrics.users.averageSession}
• Retención 30 días: ${projectMetrics.users.retention30Days}%
• NPS Score: ${projectMetrics.users.npsScore}

**Métricas Económicas:**
• Ingresos Mensuales: $${(projectMetrics.economic.monthlyRevenue / 1000000).toFixed(0)} millones
• Ganancias Creadores: $${(projectMetrics.economic.creatorEarnings / 1000000).toFixed(1)} millones (70%)
• Volumen Marketplace: $${(projectMetrics.economic.marketplaceVolume / 1000000).toFixed(0)} millones/mes
• Regalos Virtuales: $${(projectMetrics.economic.virtualGifts / 1000000).toFixed(0)} millones/mes

**Métricas Técnicas:**
• Uptime del Sistema: ${projectMetrics.technical.uptime}%
• Tiempo de Respuesta: ${projectMetrics.technical.responseTime}
• Usuarios Concurrentes Pico: ${(projectMetrics.technical.concurrentUsersPeak / 1000000).toFixed(1)} millones
• Datos Procesados Diarios: ${projectMetrics.technical.dailyDataProcessed}

**Expansión Global:**
• Países Disponibles: ${projectMetrics.global.countriesAvailable}
• Próxima Expansión: ${projectMetrics.global.expansion}`
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
              Volver al Inicio
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
            Documentación y Manifiesto
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
            Todo lo que necesitas saber para entender y participar en la civilización TAMV
          </p>
          <p className="text-sm text-muted-foreground">
            Basado en el repositorio <a href="https://github.com/OsoPanda1/ecosistema-nextgen-tamv" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ecosistema-nextgen-tamv</a>
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
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">Navegación Rápida</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <section.icon className="w-5 h-5 text-primary" />
                <span className="text-foreground group-hover:text-primary transition-colors text-sm">
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

      {/* Licensing */}
      <section className="container mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 text-center"
        >
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Licenciamiento</h2>
          <div className="space-y-2 text-muted-foreground">
            <p><strong className="text-foreground">Núcleo filosófico–político:</strong> Creative Commons BY‑NC‑SA 4.0</p>
            <p><strong className="text-foreground">Especificaciones técnicas y protocolos:</strong> Open Specification License + Apache 2.0</p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 TAMV Platform. Territorio Autónomo de Memoria Viva. Horizonte 2026-2040.
          </p>
        </div>
      </footer>
    </div>
  );
}
