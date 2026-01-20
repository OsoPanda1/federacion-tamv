import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Cpu,
  Bot,
  Wallet,
  Users,
  Shield,
  BookOpen,
  Vote,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  Settings
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Cpu, label: "Dev Hub", path: "/hub" },
  { icon: Bot, label: "Isabella AI", path: "/isabella" },
  { icon: Wallet, label: "Wallet", path: "/wallet" },
  { icon: Users, label: "DAOs", path: "/daos" },
  { icon: Vote, label: "Governance", path: "/governance" },
  { icon: Shield, label: "Security", path: "/security" },
  { icon: BookOpen, label: "BookPI", path: "/bookpi" },
];

interface AppSidebarProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-background cyber-grid">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 260 }}
        className="fixed left-0 top-0 h-full z-50 glass-card border-r border-border/50"
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center neon-border">
              <span className="text-primary font-display font-bold text-xl">T</span>
            </div>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="font-display font-bold text-lg text-foreground">TAMV</h1>
                <p className="text-xs text-muted-foreground">Civilizational OS</p>
              </motion.div>
            )}
          </Link>

          {/* Nav Items */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Tooltip key={item.path} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                        "hover:bg-primary/10 group",
                        isActive && "bg-primary/15 neon-border"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "w-5 h-5 transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                        )}
                      />
                      {!collapsed && (
                        <span
                          className={cn(
                            "text-sm font-medium transition-colors",
                            isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                          )}
                        >
                          {item.label}
                        </span>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      {item.label}
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="space-y-1 pt-4 border-t border-border/50">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full hover:bg-muted/50 transition-colors">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  {!collapsed && <span className="text-sm text-muted-foreground">Notifications</span>}
                </button>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right">Notifications</TooltipContent>}
            </Tooltip>

            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full hover:bg-muted/50 transition-colors">
                  <Settings className="w-5 h-5 text-muted-foreground" />
                  {!collapsed && <span className="text-sm text-muted-foreground">Settings</span>}
                </button>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right">Settings</TooltipContent>}
            </Tooltip>

            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to="/"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full hover:bg-destructive/10 transition-colors group"
                >
                  <LogOut className="w-5 h-5 text-muted-foreground group-hover:text-destructive" />
                  {!collapsed && <span className="text-sm text-muted-foreground group-hover:text-destructive">Logout</span>}
                </Link>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right">Logout</TooltipContent>}
            </Tooltip>
          </div>

          {/* Collapse Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-muted border border-border"
          >
            {collapsed ? (
              <ChevronRight className="w-3 h-3" />
            ) : (
              <ChevronLeft className="w-3 h-3" />
            )}
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300",
          collapsed ? "ml-20" : "ml-[260px]"
        )}
      >
        {children}
      </main>
    </div>
  );
}
