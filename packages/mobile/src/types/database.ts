export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  public: {
    Tables: {
      invitations: {
        Row: {
          created_at: string;
          id: string;
          recoverer_id: string;
          recoverer_message: string | null;
          sponsor_id: string;
          status: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          recoverer_id: string;
          recoverer_message?: string | null;
          sponsor_id: string;
          status?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          recoverer_id?: string;
          recoverer_message?: string | null;
          sponsor_id?: string;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "invitations_recoverer_id_fkey";
            columns: ["recoverer_id"];
            isOneToOne: false;
            referencedRelation: "recoverers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invitations_sponsor_id_fkey";
            columns: ["sponsor_id"];
            isOneToOne: false;
            referencedRelation: "sponsors";
            referencedColumns: ["id"];
          },
        ];
      };
      recoverer_locations: {
        Row: {
          altitude: number | null;
          altitude_accuracy: number | null;
          id: string;
          latitude: number;
          longitude: number;
          recorded_at: string | null;
          recoverer_id: string;
        };
        Insert: {
          altitude?: number | null;
          altitude_accuracy?: number | null;
          id?: string;
          latitude: number;
          longitude: number;
          recorded_at?: string | null;
          recoverer_id: string;
        };
        Update: {
          altitude?: number | null;
          altitude_accuracy?: number | null;
          id?: string;
          latitude?: number;
          longitude?: number;
          recorded_at?: string | null;
          recoverer_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "recoverer_locations_recoverer_fkey";
            columns: ["recoverer_id"];
            isOneToOne: false;
            referencedRelation: "recoverers";
            referencedColumns: ["id"];
          },
        ];
      };
      recoverers: {
        Row: {
          alerts_enabled: boolean;
          background_location_permission: boolean;
          created_at: string | null;
          first_name: string;
          foreground_location_permission: boolean;
          id: string;
          last_name: string;
          sponsor_id: string | null;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          alerts_enabled?: boolean;
          background_location_permission?: boolean;
          created_at?: string | null;
          first_name: string;
          foreground_location_permission?: boolean;
          id?: string;
          last_name: string;
          sponsor_id?: string | null;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          alerts_enabled?: boolean;
          background_location_permission?: boolean;
          created_at?: string | null;
          first_name?: string;
          foreground_location_permission?: boolean;
          id?: string;
          last_name?: string;
          sponsor_id?: string | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "recoverers_sponsor_fkey";
            columns: ["sponsor_id"];
            isOneToOne: false;
            referencedRelation: "sponsors";
            referencedColumns: ["id"];
          },
        ];
      };
      sponsors: {
        Row: {
          email: string | null;
          first_name: string;
          id: string;
          last_name: string;
          notifications_enabled: boolean;
          phone: string | null;
          recoverer_id: string | null;
          user_id: string | null;
        };
        Insert: {
          email?: string | null;
          first_name: string;
          id?: string;
          last_name: string;
          notifications_enabled?: boolean;
          phone?: string | null;
          recoverer_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          email?: string | null;
          first_name?: string;
          id?: string;
          last_name?: string;
          notifications_enabled?: boolean;
          phone?: string | null;
          recoverer_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "sponsors_recoverer_id_fkey";
            columns: ["recoverer_id"];
            isOneToOne: false;
            referencedRelation: "recoverers";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
