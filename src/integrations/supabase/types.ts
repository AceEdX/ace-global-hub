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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      exchange_programs: {
        Row: {
          accommodation_details: string | null
          application_deadline: string
          country: string
          created_at: string
          created_by: string | null
          description: string
          duration: string
          eligibility: string | null
          end_date: string | null
          facilities: string[] | null
          host_school_id: string | null
          host_school_name: string
          id: string
          program_type: Database["public"]["Enums"]["program_type"]
          safety_certifications: string[] | null
          slots_remaining: number
          start_date: string | null
          status: Database["public"]["Enums"]["program_status"]
          title: string
          total_slots: number
          updated_at: string
        }
        Insert: {
          accommodation_details?: string | null
          application_deadline: string
          country: string
          created_at?: string
          created_by?: string | null
          description?: string
          duration: string
          eligibility?: string | null
          end_date?: string | null
          facilities?: string[] | null
          host_school_id?: string | null
          host_school_name: string
          id?: string
          program_type?: Database["public"]["Enums"]["program_type"]
          safety_certifications?: string[] | null
          slots_remaining?: number
          start_date?: string | null
          status?: Database["public"]["Enums"]["program_status"]
          title: string
          total_slots?: number
          updated_at?: string
        }
        Update: {
          accommodation_details?: string | null
          application_deadline?: string
          country?: string
          created_at?: string
          created_by?: string | null
          description?: string
          duration?: string
          eligibility?: string | null
          end_date?: string | null
          facilities?: string[] | null
          host_school_id?: string | null
          host_school_name?: string
          id?: string
          program_type?: Database["public"]["Enums"]["program_type"]
          safety_certifications?: string[] | null
          slots_remaining?: number
          start_date?: string | null
          status?: Database["public"]["Enums"]["program_status"]
          title?: string
          total_slots?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "exchange_programs_host_school_id_fkey"
            columns: ["host_school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      program_applications: {
        Row: {
          application_type: Database["public"]["Enums"]["program_type"]
          created_at: string
          id: string
          notes: string | null
          program_id: string
          school_id: string | null
          status: Database["public"]["Enums"]["application_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          application_type?: Database["public"]["Enums"]["program_type"]
          created_at?: string
          id?: string
          notes?: string | null
          program_id: string
          school_id?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          application_type?: Database["public"]["Enums"]["program_type"]
          created_at?: string
          id?: string
          notes?: string | null
          program_id?: string
          school_id?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_applications_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "exchange_programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_applications_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      program_versions: {
        Row: {
          changed_by: string | null
          created_at: string
          id: string
          program_id: string
          snapshot: Json
        }
        Insert: {
          changed_by?: string | null
          created_at?: string
          id?: string
          program_id: string
          snapshot: Json
        }
        Update: {
          changed_by?: string | null
          created_at?: string
          id?: string
          program_id?: string
          snapshot?: Json
        }
        Relationships: [
          {
            foreignKeyName: "program_versions_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "exchange_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      schools: {
        Row: {
          admin_user_id: string | null
          city: string | null
          country: string
          created_at: string
          description: string | null
          id: string
          name: string
          trust_score: number | null
          updated_at: string
          verified: boolean
          website: string | null
        }
        Insert: {
          admin_user_id?: string | null
          city?: string | null
          country: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          trust_score?: number | null
          updated_at?: string
          verified?: boolean
          website?: string | null
        }
        Update: {
          admin_user_id?: string | null
          city?: string | null
          country?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          trust_score?: number | null
          updated_at?: string
          verified?: boolean
          website?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "super_admin"
        | "school_admin"
        | "student"
        | "teacher"
        | "parent"
      application_status: "pending" | "approved" | "rejected" | "waitlisted"
      program_status: "open" | "closed" | "locked"
      program_type: "student" | "teacher" | "both"
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
      app_role: ["super_admin", "school_admin", "student", "teacher", "parent"],
      application_status: ["pending", "approved", "rejected", "waitlisted"],
      program_status: ["open", "closed", "locked"],
      program_type: ["student", "teacher", "both"],
    },
  },
} as const
