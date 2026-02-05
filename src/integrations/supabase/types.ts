export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      bookpi_records: {
        Row: {
          block_number: number
          created_at: string
          entity_id: string | null
          entity_type: string
          event_type: Database["public"]["Enums"]["bookpi_event_type"]
          hash: string
          id: string
          payload: Json
          prev_hash: string | null
          user_id: string | null
        }
        Insert: {
          block_number?: number
          created_at?: string
          entity_id?: string | null
          entity_type: string
          event_type: Database["public"]["Enums"]["bookpi_event_type"]
          hash: string
          id?: string
          payload?: Json
          prev_hash?: string | null
          user_id?: string | null
        }
        Update: {
          block_number?: number
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          event_type?: Database["public"]["Enums"]["bookpi_event_type"]
          hash?: string
          id?: string
          payload?: Json
          prev_hash?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      dao_members: {
        Row: {
          contribution: number | null
          dao_id: string
          id: string
          joined_at: string
          role: Database["public"]["Enums"]["dao_role"]
          user_id: string
        }
        Insert: {
          contribution?: number | null
          dao_id: string
          id?: string
          joined_at?: string
          role?: Database["public"]["Enums"]["dao_role"]
          user_id: string
        }
        Update: {
          contribution?: number | null
          dao_id?: string
          id?: string
          joined_at?: string
          role?: Database["public"]["Enums"]["dao_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dao_members_dao_id_fkey"
            columns: ["dao_id"]
            isOneToOne: false
            referencedRelation: "daos"
            referencedColumns: ["id"]
          },
        ]
      }
      daos: {
        Row: {
          avatar_url: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          member_count: number
          name: string
          status: Database["public"]["Enums"]["dao_status"]
          treasury_balance: number
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          member_count?: number
          name: string
          status?: Database["public"]["Enums"]["dao_status"]
          treasury_balance?: number
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          member_count?: number
          name?: string
          status?: Database["public"]["Enums"]["dao_status"]
          treasury_balance?: number
          updated_at?: string
        }
        Relationships: []
      }
      honeypot_activity: {
        Row: {
          created_at: string
          endpoint: string
          headers: Json | null
          id: string
          ip_address: unknown
          method: string
          payload: Json | null
          risk_event_id: string | null
        }
        Insert: {
          created_at?: string
          endpoint: string
          headers?: Json | null
          id?: string
          ip_address: unknown
          method: string
          payload?: Json | null
          risk_event_id?: string | null
        }
        Update: {
          created_at?: string
          endpoint?: string
          headers?: Json | null
          id?: string
          ip_address?: unknown
          method?: string
          payload?: Json | null
          risk_event_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "honeypot_activity_risk_event_id_fkey"
            columns: ["risk_event_id"]
            isOneToOne: false
            referencedRelation: "risk_events"
            referencedColumns: ["id"]
          },
        ]
      }
      isabella_conversations: {
        Row: {
          created_at: string
          id: string
          session_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          session_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          session_id?: string
          user_id?: string
        }
        Relationships: []
      }
      isabella_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
          tool_calls: Json | null
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
          tool_calls?: Json | null
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
          tool_calls?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "isabella_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "isabella_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      msr_scores: {
        Row: {
          community: number
          creation: number
          id: string
          last_updated: string
          total_score: number | null
          user_id: string
          wisdom: number
        }
        Insert: {
          community?: number
          creation?: number
          id?: string
          last_updated?: string
          total_score?: number | null
          user_id: string
          wisdom?: number
        }
        Update: {
          community?: number
          creation?: number
          id?: string
          last_updated?: string
          total_score?: number | null
          user_id?: string
          wisdom?: number
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          content: string | null
          created_at: string
          id: string
          notification_type: Database["public"]["Enums"]["notification_type"]
          read: boolean
          title: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          content?: string | null
          created_at?: string
          id?: string
          notification_type?: Database["public"]["Enums"]["notification_type"]
          read?: boolean
          title: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          content?: string | null
          created_at?: string
          id?: string
          notification_type?: Database["public"]["Enums"]["notification_type"]
          read?: boolean
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      proposals: {
        Row: {
          created_at: string
          dao_id: string
          deadline: string | null
          description: string
          id: string
          proposer_id: string
          quorum: number
          status: Database["public"]["Enums"]["proposal_status"]
          title: string
          updated_at: string
          votes_against: number
          votes_for: number
        }
        Insert: {
          created_at?: string
          dao_id: string
          deadline?: string | null
          description: string
          id?: string
          proposer_id: string
          quorum?: number
          status?: Database["public"]["Enums"]["proposal_status"]
          title: string
          updated_at?: string
          votes_against?: number
          votes_for?: number
        }
        Update: {
          created_at?: string
          dao_id?: string
          deadline?: string | null
          description?: string
          id?: string
          proposer_id?: string
          quorum?: number
          status?: Database["public"]["Enums"]["proposal_status"]
          title?: string
          updated_at?: string
          votes_against?: number
          votes_for?: number
        }
        Relationships: [
          {
            foreignKeyName: "proposals_dao_id_fkey"
            columns: ["dao_id"]
            isOneToOne: false
            referencedRelation: "daos"
            referencedColumns: ["id"]
          },
        ]
      }
      risk_events: {
        Row: {
          created_at: string
          decision: Database["public"]["Enums"]["risk_decision"]
          event_type: string
          id: string
          ip_address: unknown
          metadata: Json | null
          risk_level: Database["public"]["Enums"]["risk_level"]
          risk_score: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          decision?: Database["public"]["Enums"]["risk_decision"]
          event_type: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          risk_level?: Database["public"]["Enums"]["risk_level"]
          risk_score?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          decision?: Database["public"]["Enums"]["risk_decision"]
          event_type?: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          risk_level?: Database["public"]["Enums"]["risk_level"]
          risk_score?: number
          user_id?: string | null
        }
        Relationships: []
      }
      service_health: {
        Row: {
          id: string
          last_check: string
          metadata: Json | null
          service_name: string
          status: Database["public"]["Enums"]["service_status"]
          uptime_percentage: number | null
        }
        Insert: {
          id?: string
          last_check?: string
          metadata?: Json | null
          service_name: string
          status?: Database["public"]["Enums"]["service_status"]
          uptime_percentage?: number | null
        }
        Update: {
          id?: string
          last_check?: string
          metadata?: Json | null
          service_name?: string
          status?: Database["public"]["Enums"]["service_status"]
          uptime_percentage?: number | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string
          description: string | null
          fee: number | null
          from_wallet_id: string | null
          id: string
          metadata: Json | null
          status: Database["public"]["Enums"]["transaction_status"]
          to_wallet_id: string | null
          tx_type: Database["public"]["Enums"]["transaction_type"]
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string
          description?: string | null
          fee?: number | null
          from_wallet_id?: string | null
          id?: string
          metadata?: Json | null
          status?: Database["public"]["Enums"]["transaction_status"]
          to_wallet_id?: string | null
          tx_type: Database["public"]["Enums"]["transaction_type"]
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string
          description?: string | null
          fee?: number | null
          from_wallet_id?: string | null
          id?: string
          metadata?: Json | null
          status?: Database["public"]["Enums"]["transaction_status"]
          to_wallet_id?: string | null
          tx_type?: Database["public"]["Enums"]["transaction_type"]
        }
        Relationships: [
          {
            foreignKeyName: "transactions_from_wallet_id_fkey"
            columns: ["from_wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_to_wallet_id_fkey"
            columns: ["to_wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      votes: {
        Row: {
          choice: Database["public"]["Enums"]["vote_choice"]
          created_at: string
          id: string
          proposal_id: string
          user_id: string
          weight: number
        }
        Insert: {
          choice: Database["public"]["Enums"]["vote_choice"]
          created_at?: string
          id?: string
          proposal_id: string
          user_id: string
          weight?: number
        }
        Update: {
          choice?: Database["public"]["Enums"]["vote_choice"]
          created_at?: string
          id?: string
          proposal_id?: string
          user_id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "votes_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          balance: number
          created_at: string
          currency: string
          id: string
          locked_balance: number
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          currency?: string
          id?: string
          locked_balance?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          currency?: string
          id?: string
          locked_balance?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_bookpi_hash: {
        Args: {
          p_entity_id: string
          p_entity_type: string
          p_event_type: Database["public"]["Enums"]["bookpi_event_type"]
          p_payload: Json
          p_prev_hash: string
        }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "user" | "creator" | "admin" | "sentinel"
      bookpi_event_type:
        | "login"
        | "logout"
        | "transaction"
        | "vote"
        | "proposal_created"
        | "dao_joined"
        | "dao_created"
        | "msr_update"
        | "security_event"
        | "sanction"
        | "reward"
        | "system"
      dao_role: "member" | "moderator" | "admin" | "founder"
      dao_status: "active" | "inactive" | "dissolved"
      notification_type:
        | "info"
        | "success"
        | "warning"
        | "error"
        | "transaction"
        | "dao"
        | "security"
      proposal_status: "draft" | "active" | "passed" | "rejected" | "executed"
      risk_decision: "allow" | "challenge" | "block" | "honeypot"
      risk_level: "low" | "medium" | "high" | "critical"
      service_status: "operational" | "degraded" | "maintenance" | "outage"
      transaction_status: "pending" | "completed" | "failed" | "reversed"
      transaction_type:
        | "transfer"
        | "deposit"
        | "withdrawal"
        | "dao_contribution"
        | "reward"
        | "fee"
      vote_choice: "for" | "against" | "abstain"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["user", "creator", "admin", "sentinel"],
      bookpi_event_type: [
        "login",
        "logout",
        "transaction",
        "vote",
        "proposal_created",
        "dao_joined",
        "dao_created",
        "msr_update",
        "security_event",
        "sanction",
        "reward",
        "system",
      ],
      dao_role: ["member", "moderator", "admin", "founder"],
      dao_status: ["active", "inactive", "dissolved"],
      notification_type: [
        "info",
        "success",
        "warning",
        "error",
        "transaction",
        "dao",
        "security",
      ],
      proposal_status: ["draft", "active", "passed", "rejected", "executed"],
      risk_decision: ["allow", "challenge", "block", "honeypot"],
      risk_level: ["low", "medium", "high", "critical"],
      service_status: ["operational", "degraded", "maintenance", "outage"],
      transaction_status: ["pending", "completed", "failed", "reversed"],
      transaction_type: [
        "transfer",
        "deposit",
        "withdrawal",
        "dao_contribution",
        "reward",
        "fee",
      ],
      vote_choice: ["for", "against", "abstain"],
    },
  },
} as const
