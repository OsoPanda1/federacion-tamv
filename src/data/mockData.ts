// Mock data for the TAMV Platform

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: 'user' | 'creator' | 'admin' | 'sentinel';
  createdAt: string;
}

export interface MSR {
  wisdom: number;
  community: number;
  creation: number;
}

export interface WalletData {
  id: string;
  balance: number;
  currency: string;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'dao_contribution' | 'reward';
  amount: number;
  from: string;
  to: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

export interface DAO {
  id: string;
  name: string;
  description: string;
  treasury: number;
  members: number;
  activeProposals: number;
  category: string;
  status: 'active' | 'voting' | 'paused';
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  read: boolean;
  timestamp: string;
}

export interface BookPIRecord {
  id: string;
  eventType: string;
  entity: string;
  entityId: string;
  hash: string;
  prevHash: string;
  timestamp: string;
  data: Record<string, any>;
}

export interface RiskEvent {
  id: string;
  ip: string;
  score: number;
  decision: 'allow' | 'challenge' | 'block' | 'honeypot';
  timestamp: string;
  country: string;
  reason: string;
}

export interface ServiceStatus {
  name: string;
  status: 'online' | 'degraded' | 'offline';
  uptime: number;
  latency: number;
  lastCheck: string;
}

// Demo User
export const currentUser: User = {
  id: "usr_001",
  email: "citizen@tamv.io",
  name: "Aiden Nakamoto",
  avatar: "",
  role: "creator",
  createdAt: "2024-01-15T00:00:00Z"
};

// MSR Reputation
export const userMSR: MSR = {
  wisdom: 78,
  community: 92,
  creation: 65
};

// Wallet
export const userWallet: WalletData = {
  id: "wal_001",
  balance: 12847.52,
  currency: "TAMV"
};

// Transactions
export const transactions: Transaction[] = [
  {
    id: "tx_001",
    type: "receive",
    amount: 500,
    from: "DAO: Genesis Council",
    to: "You",
    timestamp: "2024-01-20T14:32:00Z",
    status: "completed",
    description: "Proposal reward distribution"
  },
  {
    id: "tx_002",
    type: "send",
    amount: 150,
    from: "You",
    to: "Creator: Maya Chen",
    timestamp: "2024-01-19T09:15:00Z",
    status: "completed",
    description: "Support for Dreamspace project"
  },
  {
    id: "tx_003",
    type: "dao_contribution",
    amount: 1000,
    from: "You",
    to: "DAO: Builders Guild",
    timestamp: "2024-01-18T16:45:00Z",
    status: "completed",
    description: "Treasury contribution"
  },
  {
    id: "tx_004",
    type: "reward",
    amount: 250,
    from: "TAMV System",
    to: "You",
    timestamp: "2024-01-17T11:00:00Z",
    status: "completed",
    description: "Weekly MSR bonus"
  },
  {
    id: "tx_005",
    type: "receive",
    amount: 75,
    from: "Citizen: Leo Park",
    to: "You",
    timestamp: "2024-01-16T08:30:00Z",
    status: "completed",
    description: "Collaboration payment"
  }
];

// DAOs
export const daos: DAO[] = [
  {
    id: "dao_001",
    name: "Genesis Council",
    description: "The founding governance body of TAMV civilization",
    treasury: 2500000,
    members: 1247,
    activeProposals: 8,
    category: "Governance",
    status: "active"
  },
  {
    id: "dao_002",
    name: "Builders Guild",
    description: "Infrastructure and development collective",
    treasury: 890000,
    members: 456,
    activeProposals: 12,
    category: "Development",
    status: "voting"
  },
  {
    id: "dao_003",
    name: "Creative Nexus",
    description: "Artists, musicians, and digital creators",
    treasury: 340000,
    members: 892,
    activeProposals: 5,
    category: "Creative",
    status: "active"
  },
  {
    id: "dao_004",
    name: "Security Sentinels",
    description: "Platform security and threat response",
    treasury: 1200000,
    members: 128,
    activeProposals: 3,
    category: "Security",
    status: "active"
  },
  {
    id: "dao_005",
    name: "Education Alliance",
    description: "Knowledge sharing and mentorship programs",
    treasury: 560000,
    members: 673,
    activeProposals: 7,
    category: "Education",
    status: "active"
  }
];

// Notifications
export const notifications: Notification[] = [
  {
    id: "notif_001",
    title: "Proposal Vote Required",
    content: "Genesis Council: Infrastructure Expansion requires your vote",
    type: "warning",
    read: false,
    timestamp: "2024-01-20T15:00:00Z"
  },
  {
    id: "notif_002",
    title: "MSR Milestone",
    content: "Congratulations! Your Community score reached 90+",
    type: "success",
    read: false,
    timestamp: "2024-01-20T12:00:00Z"
  },
  {
    id: "notif_003",
    title: "Security Alert",
    content: "TENOCHTITLAN detected unusual activity from your region",
    type: "alert",
    read: true,
    timestamp: "2024-01-19T18:30:00Z"
  },
  {
    id: "notif_004",
    title: "New DAO Invitation",
    content: "You've been invited to join the Innovation Lab",
    type: "info",
    read: true,
    timestamp: "2024-01-19T10:00:00Z"
  }
];

// BookPI Audit Records
export const bookPIRecords: BookPIRecord[] = [
  {
    id: "bpi_001",
    eventType: "TRANSACTION",
    entity: "wallet",
    entityId: "wal_001",
    hash: "0xa3f8c2d1e5b7...9f4a",
    prevHash: "0xb2e7d1c4f8a6...3e2d",
    timestamp: "2024-01-20T14:32:00Z",
    data: { amount: 500, type: "receive" }
  },
  {
    id: "bpi_002",
    eventType: "VOTE",
    entity: "proposal",
    entityId: "prop_042",
    hash: "0xc4d9e2f6a7b8...1c5e",
    prevHash: "0xa3f8c2d1e5b7...9f4a",
    timestamp: "2024-01-20T13:15:00Z",
    data: { choice: "approve", weight: 92 }
  },
  {
    id: "bpi_003",
    eventType: "MSR_UPDATE",
    entity: "msr",
    entityId: "usr_001",
    hash: "0xd5e0f3g7b8c9...2d6f",
    prevHash: "0xc4d9e2f6a7b8...1c5e",
    timestamp: "2024-01-20T11:00:00Z",
    data: { wisdom: 78, community: 92, creation: 65 }
  },
  {
    id: "bpi_004",
    eventType: "DAO_JOIN",
    entity: "dao",
    entityId: "dao_002",
    hash: "0xe6f1g4h8c9d0...3e7g",
    prevHash: "0xd5e0f3g7b8c9...2d6f",
    timestamp: "2024-01-19T16:45:00Z",
    data: { member: "usr_001", role: "contributor" }
  },
  {
    id: "bpi_005",
    eventType: "LOGIN",
    entity: "auth",
    entityId: "usr_001",
    hash: "0xf7g2h5i9d0e1...4f8h",
    prevHash: "0xe6f1g4h8c9d0...3e7g",
    timestamp: "2024-01-19T09:00:00Z",
    data: { ip: "***.***.12.45", device: "desktop" }
  }
];

// Security Risk Events
export const riskEvents: RiskEvent[] = [
  {
    id: "risk_001",
    ip: "192.168.1.***",
    score: 15,
    decision: "allow",
    timestamp: "2024-01-20T15:30:00Z",
    country: "US",
    reason: "Normal traffic pattern"
  },
  {
    id: "risk_002",
    ip: "45.33.***.*",
    score: 72,
    decision: "challenge",
    timestamp: "2024-01-20T14:45:00Z",
    country: "Unknown",
    reason: "Multiple failed auth attempts"
  },
  {
    id: "risk_003",
    ip: "185.220.***.*",
    score: 95,
    decision: "honeypot",
    timestamp: "2024-01-20T12:20:00Z",
    country: "TOR Exit",
    reason: "Known malicious actor"
  },
  {
    id: "risk_004",
    ip: "103.21.***.*",
    score: 88,
    decision: "block",
    timestamp: "2024-01-20T10:15:00Z",
    country: "RU",
    reason: "SQL injection attempt"
  },
  {
    id: "risk_005",
    ip: "172.16.***.*",
    score: 25,
    decision: "allow",
    timestamp: "2024-01-20T09:00:00Z",
    country: "DE",
    reason: "Verified user"
  }
];

// Service Status
export const serviceStatus: ServiceStatus[] = [
  { name: "Core API", status: "online", uptime: 99.99, latency: 12, lastCheck: "2024-01-20T15:45:00Z" },
  { name: "Economy API", status: "online", uptime: 99.95, latency: 18, lastCheck: "2024-01-20T15:45:00Z" },
  { name: "DAO API", status: "online", uptime: 99.92, latency: 24, lastCheck: "2024-01-20T15:45:00Z" },
  { name: "MSR Ledger", status: "online", uptime: 100, latency: 8, lastCheck: "2024-01-20T15:45:00Z" },
  { name: "Isabella AI", status: "degraded", uptime: 98.5, latency: 145, lastCheck: "2024-01-20T15:45:00Z" },
  { name: "ANUBIS Gateway", status: "online", uptime: 99.99, latency: 5, lastCheck: "2024-01-20T15:45:00Z" },
  { name: "BookPI Ledger", status: "online", uptime: 100, latency: 10, lastCheck: "2024-01-20T15:45:00Z" }
];
