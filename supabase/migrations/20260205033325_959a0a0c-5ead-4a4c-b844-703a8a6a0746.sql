-- ========================================
-- TAMV ECOSYSTEM - COMPLETE DATABASE SCHEMA
-- ========================================

-- 1. ROLE ENUM FOR USERS
CREATE TYPE public.app_role AS ENUM ('user', 'creator', 'admin', 'sentinel');

-- 2. USER ROLES TABLE (security best practice - separate from profiles)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- 3. PROFILES TABLE
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    username TEXT UNIQUE,
    display_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 4. MSR (Multi-Signal Reputation) LEDGER
CREATE TABLE public.msr_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    wisdom INTEGER NOT NULL DEFAULT 0,
    community INTEGER NOT NULL DEFAULT 0,
    creation INTEGER NOT NULL DEFAULT 0,
    total_score INTEGER GENERATED ALWAYS AS (wisdom + community + creation) STORED,
    last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 5. WALLETS
CREATE TABLE public.wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    balance DECIMAL(20, 8) NOT NULL DEFAULT 0,
    locked_balance DECIMAL(20, 8) NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'TAMV',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 6. TRANSACTIONS
CREATE TYPE public.transaction_type AS ENUM ('transfer', 'deposit', 'withdrawal', 'dao_contribution', 'reward', 'fee');
CREATE TYPE public.transaction_status AS ENUM ('pending', 'completed', 'failed', 'reversed');

CREATE TABLE public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_wallet_id UUID REFERENCES public.wallets(id),
    to_wallet_id UUID REFERENCES public.wallets(id),
    amount DECIMAL(20, 8) NOT NULL,
    fee DECIMAL(20, 8) DEFAULT 0,
    tx_type transaction_type NOT NULL,
    status transaction_status NOT NULL DEFAULT 'pending',
    description TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 7. DAOs
CREATE TYPE public.dao_status AS ENUM ('active', 'inactive', 'dissolved');

CREATE TABLE public.daos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    avatar_url TEXT,
    treasury_balance DECIMAL(20, 8) NOT NULL DEFAULT 0,
    member_count INTEGER NOT NULL DEFAULT 0,
    status dao_status NOT NULL DEFAULT 'active',
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 8. DAO MEMBERS
CREATE TYPE public.dao_role AS ENUM ('member', 'moderator', 'admin', 'founder');

CREATE TABLE public.dao_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dao_id UUID REFERENCES public.daos(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role dao_role NOT NULL DEFAULT 'member',
    joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    contribution DECIMAL(20, 8) DEFAULT 0,
    UNIQUE (dao_id, user_id)
);

-- 9. PROPOSALS
CREATE TYPE public.proposal_status AS ENUM ('draft', 'active', 'passed', 'rejected', 'executed');

CREATE TABLE public.proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dao_id UUID REFERENCES public.daos(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    proposer_id UUID REFERENCES auth.users(id) NOT NULL,
    status proposal_status NOT NULL DEFAULT 'draft',
    votes_for INTEGER NOT NULL DEFAULT 0,
    votes_against INTEGER NOT NULL DEFAULT 0,
    quorum INTEGER NOT NULL DEFAULT 50,
    deadline TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 10. VOTES
CREATE TYPE public.vote_choice AS ENUM ('for', 'against', 'abstain');

CREATE TABLE public.votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    proposal_id UUID REFERENCES public.proposals(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    choice vote_choice NOT NULL,
    weight INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (proposal_id, user_id)
);

-- 11. BOOKPI - IMMUTABLE AUDIT LOG
CREATE TYPE public.bookpi_event_type AS ENUM (
    'login', 'logout', 'transaction', 'vote', 'proposal_created', 
    'dao_joined', 'dao_created', 'msr_update', 'security_event', 
    'sanction', 'reward', 'system'
);

CREATE TABLE public.bookpi_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type bookpi_event_type NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    user_id UUID REFERENCES auth.users(id),
    payload JSONB NOT NULL DEFAULT '{}',
    hash TEXT NOT NULL,
    prev_hash TEXT,
    block_number BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index for hash chain integrity
CREATE INDEX idx_bookpi_block ON public.bookpi_records(block_number);
CREATE INDEX idx_bookpi_entity ON public.bookpi_records(entity_type, entity_id);

-- 12. NOTIFICATIONS (NOTITAMV)
CREATE TYPE public.notification_type AS ENUM ('info', 'success', 'warning', 'error', 'transaction', 'dao', 'security');

CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    notification_type notification_type NOT NULL DEFAULT 'info',
    read BOOLEAN NOT NULL DEFAULT false,
    action_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 13. TENOCHTITLAN SECURITY - RISK EVENTS
CREATE TYPE public.risk_level AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE public.risk_decision AS ENUM ('allow', 'challenge', 'block', 'honeypot');

CREATE TABLE public.risk_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_address INET,
    user_id UUID REFERENCES auth.users(id),
    risk_score DECIMAL(5, 2) NOT NULL DEFAULT 0,
    risk_level risk_level NOT NULL DEFAULT 'low',
    decision risk_decision NOT NULL DEFAULT 'allow',
    event_type TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 14. HONEYPOT ACTIVITY LOG
CREATE TABLE public.honeypot_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    risk_event_id UUID REFERENCES public.risk_events(id),
    ip_address INET NOT NULL,
    endpoint TEXT NOT NULL,
    method TEXT NOT NULL,
    payload JSONB,
    headers JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 15. ISABELLA AI - CONVERSATION LOGS
CREATE TABLE public.isabella_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    session_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.isabella_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES public.isabella_conversations(id) ON DELETE CASCADE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    tool_calls JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 16. SERVICE STATUS (for Hub monitoring)
CREATE TYPE public.service_status AS ENUM ('operational', 'degraded', 'maintenance', 'outage');

CREATE TABLE public.service_health (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_name TEXT NOT NULL UNIQUE,
    status service_status NOT NULL DEFAULT 'operational',
    uptime_percentage DECIMAL(5, 2) DEFAULT 100.00,
    last_check TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    metadata JSONB DEFAULT '{}'
);

-- ========================================
-- ENABLE ROW LEVEL SECURITY
-- ========================================

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.msr_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dao_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookpi_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.honeypot_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.isabella_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.isabella_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_health ENABLE ROW LEVEL SECURITY;

-- ========================================
-- SECURITY DEFINER FUNCTION FOR ROLE CHECK
-- ========================================

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- ========================================
-- RLS POLICIES
-- ========================================

-- User Roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
    FOR SELECT USING (auth.uid() = user_id);

-- Profiles
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- MSR Scores
CREATE POLICY "MSR scores are viewable by everyone" ON public.msr_scores
    FOR SELECT USING (true);
CREATE POLICY "System can update MSR" ON public.msr_scores
    FOR ALL USING (auth.uid() = user_id);

-- Wallets
CREATE POLICY "Users can view own wallet" ON public.wallets
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own wallet" ON public.wallets
    FOR UPDATE USING (auth.uid() = user_id);

-- Transactions
CREATE POLICY "Users can view own transactions" ON public.transactions
    FOR SELECT USING (
        from_wallet_id IN (SELECT id FROM public.wallets WHERE user_id = auth.uid())
        OR to_wallet_id IN (SELECT id FROM public.wallets WHERE user_id = auth.uid())
    );
CREATE POLICY "Users can create transactions from own wallet" ON public.transactions
    FOR INSERT WITH CHECK (
        from_wallet_id IN (SELECT id FROM public.wallets WHERE user_id = auth.uid())
    );

-- DAOs
CREATE POLICY "DAOs are viewable by everyone" ON public.daos
    FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create DAOs" ON public.daos
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "DAO admins can update" ON public.daos
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.dao_members 
            WHERE dao_id = daos.id 
            AND user_id = auth.uid() 
            AND role IN ('admin', 'founder')
        )
    );

-- DAO Members
CREATE POLICY "DAO members visible to all" ON public.dao_members
    FOR SELECT USING (true);
CREATE POLICY "Users can join DAOs" ON public.dao_members
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave DAOs" ON public.dao_members
    FOR DELETE USING (auth.uid() = user_id);

-- Proposals
CREATE POLICY "Proposals visible to all" ON public.proposals
    FOR SELECT USING (true);
CREATE POLICY "DAO members can create proposals" ON public.proposals
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.dao_members 
            WHERE dao_id = proposals.dao_id 
            AND user_id = auth.uid()
        )
    );

-- Votes
CREATE POLICY "Votes visible to all" ON public.votes
    FOR SELECT USING (true);
CREATE POLICY "Users can vote once per proposal" ON public.votes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- BookPI Records (read-only for users)
CREATE POLICY "BookPI records viewable by authenticated" ON public.bookpi_records
    FOR SELECT USING (auth.uid() IS NOT NULL);

-- Notifications
CREATE POLICY "Users see own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Risk Events (sentinels only)
CREATE POLICY "Sentinels can view risk events" ON public.risk_events
    FOR SELECT USING (public.has_role(auth.uid(), 'sentinel') OR public.has_role(auth.uid(), 'admin'));

-- Honeypot Activity (admins only)
CREATE POLICY "Admins can view honeypot" ON public.honeypot_activity
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Isabella Conversations
CREATE POLICY "Users see own conversations" ON public.isabella_conversations
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create own conversations" ON public.isabella_conversations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Isabella Messages
CREATE POLICY "Users see own messages" ON public.isabella_messages
    FOR SELECT USING (
        conversation_id IN (
            SELECT id FROM public.isabella_conversations WHERE user_id = auth.uid()
        )
    );
CREATE POLICY "Users can add messages" ON public.isabella_messages
    FOR INSERT WITH CHECK (
        conversation_id IN (
            SELECT id FROM public.isabella_conversations WHERE user_id = auth.uid()
        )
    );

-- Service Health (public read)
CREATE POLICY "Service health visible to all" ON public.service_health
    FOR SELECT USING (true);

-- ========================================
-- TRIGGERS FOR AUTOMATIC PROFILE/WALLET/MSR CREATION
-- ========================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Create profile
    INSERT INTO public.profiles (user_id, username, display_name)
    VALUES (NEW.id, NEW.email, split_part(NEW.email, '@', 1));
    
    -- Create wallet
    INSERT INTO public.wallets (user_id, balance)
    VALUES (NEW.id, 1000.00);
    
    -- Create MSR scores
    INSERT INTO public.msr_scores (user_id, wisdom, community, creation)
    VALUES (NEW.id, 10, 10, 10);
    
    -- Assign default role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
    
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========================================
-- BOOKPI HASH CHAIN FUNCTION
-- ========================================

CREATE OR REPLACE FUNCTION public.calculate_bookpi_hash(
    p_event_type bookpi_event_type,
    p_entity_type TEXT,
    p_entity_id UUID,
    p_payload JSONB,
    p_prev_hash TEXT
)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    v_data TEXT;
BEGIN
    v_data := CONCAT(
        p_event_type::TEXT,
        p_entity_type,
        COALESCE(p_entity_id::TEXT, ''),
        p_payload::TEXT,
        COALESCE(p_prev_hash, 'genesis')
    );
    RETURN encode(sha256(v_data::bytea), 'hex');
END;
$$;

CREATE OR REPLACE FUNCTION public.insert_bookpi_record()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_prev_hash TEXT;
    v_block_number BIGINT;
BEGIN
    -- Get previous hash
    SELECT hash, block_number INTO v_prev_hash, v_block_number
    FROM public.bookpi_records
    ORDER BY block_number DESC
    LIMIT 1;
    
    v_block_number := COALESCE(v_block_number, 0) + 1;
    
    NEW.prev_hash := v_prev_hash;
    NEW.block_number := v_block_number;
    NEW.hash := public.calculate_bookpi_hash(
        NEW.event_type,
        NEW.entity_type,
        NEW.entity_id,
        NEW.payload,
        v_prev_hash
    );
    
    RETURN NEW;
END;
$$;

CREATE TRIGGER bookpi_hash_trigger
    BEFORE INSERT ON public.bookpi_records
    FOR EACH ROW EXECUTE FUNCTION public.insert_bookpi_record();

-- ========================================
-- SEED INITIAL DATA
-- ========================================

-- Service Health
INSERT INTO public.service_health (service_name, status, uptime_percentage) VALUES
    ('core-api', 'operational', 99.97),
    ('economy-api', 'operational', 99.95),
    ('dao-api', 'operational', 99.98),
    ('msr-ledger', 'operational', 99.99),
    ('isabella-ai', 'operational', 99.90),
    ('notitamv', 'operational', 99.96),
    ('tenochtitlan', 'operational', 99.99);

-- Sample DAOs
INSERT INTO public.daos (name, description, treasury_balance, member_count) VALUES
    ('Cultura Digital MX', 'Preservación y difusión de la cultura digital mexicana', 125000.00, 342),
    ('CreadorxsMX', 'Red de creadores de contenido independiente', 89500.00, 567),
    ('TechForGood', 'Tecnología al servicio de la comunidad', 234000.00, 189),
    ('ArtDAO', 'Colectivo de artistas digitales', 67800.00, 423),
    ('EduFederation', 'Red educativa descentralizada', 156000.00, 891);

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.service_health;