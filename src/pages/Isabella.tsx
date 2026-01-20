import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Wallet,
  Vote,
  Shield,
  TrendingUp,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  toolCall?: {
    name: string;
    result: string;
  };
}

const suggestionChips = [
  { icon: Wallet, text: "Check my wallet balance" },
  { icon: TrendingUp, text: "Analyze my MSR score" },
  { icon: Vote, text: "Show active proposals" },
  { icon: Shield, text: "Security status report" },
];

export default function Isabella() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Greetings, Citizen. I am Isabella, your AI companion for navigating the TAMV civilization. I can help you with wallet operations, governance participation, reputation analysis, and system insights. How may I assist you today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateResponse = async (userMessage: string) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1500));

    let response = "";
    let toolCall: Message['toolCall'] | undefined;

    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('wallet') || lowerMessage.includes('balance')) {
      toolCall = { name: "get_wallet_balance", result: "12,847.52 TAMV" };
      response = "I've checked your wallet. Your current balance is **12,847.52 TAMV tokens**. This represents a 12.5% increase from last month. Would you like me to analyze your recent transactions or suggest ways to grow your holdings?";
    } else if (lowerMessage.includes('msr') || lowerMessage.includes('reputation')) {
      toolCall = { name: "analyze_msr", result: "W:78 C:92 Cr:65" };
      response = "Your MSR reputation analysis:\n\n• **Wisdom:** 78/100 - Above average, showing consistent learning\n• **Community:** 92/100 - Excellent! Top 10% of citizens\n• **Creation:** 65/100 - Room for growth\n\n**Recommendation:** Consider contributing more to open projects to boost your Creation score.";
    } else if (lowerMessage.includes('proposal') || lowerMessage.includes('vote')) {
      toolCall = { name: "get_active_proposals", result: "8 active" };
      response = "There are **8 active proposals** requiring attention:\n\n1. **Infrastructure Expansion** - Genesis Council (Closes in 2 days)\n2. **Treasury Allocation Q1** - Builders Guild (Voting now)\n3. **New Creator Program** - Creative Nexus\n\nWould you like me to summarize any specific proposal or help you cast your vote?";
    } else if (lowerMessage.includes('security') || lowerMessage.includes('tenochtitlan')) {
      toolCall = { name: "security_report", result: "All systems secure" };
      response = "TENOCHTITLAN Security Status: **All Systems Secure** ✓\n\n• **Threats blocked today:** 127\n• **Your risk score:** 15 (Low)\n• **Active honeypots:** 4\n• **Last scan:** 2 minutes ago\n\nNo suspicious activity detected on your account. Would you like a detailed security audit?";
    } else {
      response = "I understand you're asking about \"" + userMessage + "\". As your AI companion, I can help with:\n\n• Wallet operations and transaction analysis\n• MSR reputation insights\n• Governance and voting guidance\n• Security status and alerts\n• DAO participation\n\nCould you be more specific about what you'd like to explore?";
    }

    setIsTyping(false);
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
      toolCall
    }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    simulateResponse(input);
  };

  const handleSuggestion = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    simulateResponse(text);
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-2rem)] flex flex-col p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center neon-border animate-pulse-glow">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Isabella AI Console
            </h1>
            <p className="text-muted-foreground">
              Your intelligent companion for the TAMV civilization
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2 px-3 py-1.5 glass-card rounded-full">
            <div className="status-online" />
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </motion.div>

        {/* Chat Area */}
        <div className="flex-1 glass-card rounded-xl flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={cn(
                    "flex gap-4",
                    msg.role === 'user' && "flex-row-reverse"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                    msg.role === 'assistant' 
                      ? "bg-primary/20 neon-border" 
                      : "bg-secondary/20 neon-border-magenta"
                  )}>
                    {msg.role === 'assistant' ? (
                      <Bot className="w-5 h-5 text-primary" />
                    ) : (
                      <User className="w-5 h-5 text-secondary" />
                    )}
                  </div>
                  <div className={cn(
                    "max-w-[70%] space-y-2",
                    msg.role === 'user' && "text-right"
                  )}>
                    {msg.toolCall && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/20 text-xs">
                        <Sparkles className="w-3 h-3 text-accent" />
                        <span className="text-accent font-mono">{msg.toolCall.name}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="text-foreground">{msg.toolCall.result}</span>
                      </div>
                    )}
                    <div className={cn(
                      "rounded-xl p-4",
                      msg.role === 'assistant' 
                        ? "bg-muted/50 text-left" 
                        : "bg-primary/20"
                    )}>
                      <p className="text-sm text-foreground whitespace-pre-wrap">
                        {msg.content}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center neon-border">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/50">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  <span className="text-sm text-muted-foreground">Isabella is thinking...</span>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-6 pb-4"
            >
              <p className="text-xs text-muted-foreground mb-3">Quick actions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestionChips.map((chip) => (
                  <button
                    key={chip.text}
                    onClick={() => handleSuggestion(chip.text)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 hover:bg-muted text-sm text-foreground transition-colors"
                  >
                    <chip.icon className="w-4 h-4 text-primary" />
                    {chip.text}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-border/50">
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Isabella anything..."
                className="flex-1 bg-muted/50 border-border/50 focus:border-primary"
              />
              <Button 
                type="submit" 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!input.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
