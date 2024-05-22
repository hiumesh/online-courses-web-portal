export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      category: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      course_instructor: {
        Row: {
          course_id: number
          user_id: string
        }
        Insert: {
          course_id: number
          user_id: string
        }
        Update: {
          course_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_instructor_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_instructor_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_lg"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_instructor_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_md"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_instructor_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_sm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_instructor_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      course_review: {
        Row: {
          body: string
          course_id: number
          created_at: string | null
          id: number
          rating: number
          user_id: string
        }
        Insert: {
          body: string
          course_id: number
          created_at?: string | null
          id?: number
          rating: number
          user_id: string
        }
        Update: {
          body?: string
          course_id?: number
          created_at?: string | null
          id?: number
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_review_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_review_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_lg"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_review_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_md"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_review_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_sm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_review_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      course_section: {
        Row: {
          course_id: number
          created_at: string | null
          id: number
          order_index: number
          title: string
        }
        Insert: {
          course_id: number
          created_at?: string | null
          id?: number
          order_index: number
          title: string
        }
        Update: {
          course_id?: number
          created_at?: string | null
          id?: number
          order_index?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_section_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_section_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_lg"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_section_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_md"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_section_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_sm"
            referencedColumns: ["id"]
          },
        ]
      }
      course_section_content: {
        Row: {
          created_at: string | null
          id: number
          order_index: number
          resources: Json | null
          section_id: number
          title: string
          type: Database["public"]["Enums"]["course_section_content_type_enum"]
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          order_index: number
          resources?: Json | null
          section_id: number
          title: string
          type: Database["public"]["Enums"]["course_section_content_type_enum"]
          url: string
        }
        Update: {
          created_at?: string | null
          id?: number
          order_index?: number
          resources?: Json | null
          section_id?: number
          title?: string
          type?: Database["public"]["Enums"]["course_section_content_type_enum"]
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_section_content_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "course_section"
            referencedColumns: ["id"]
          },
        ]
      }
      course_tags: {
        Row: {
          course_id: number
          tag_id: number
        }
        Insert: {
          course_id: number
          tag_id: number
        }
        Update: {
          course_id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_tags_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_tags_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_lg"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_tags_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_md"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_tags_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_sm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      course_topics: {
        Row: {
          course_id: number
          topic_id: number
        }
        Insert: {
          course_id: number
          topic_id: number
        }
        Update: {
          course_id?: number
          topic_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_topics_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_topics_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_lg"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_topics_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_md"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_topics_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_sm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_topics_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          avg_rating: number
          category: number
          created_at: string | null
          enrollment_count: number
          id: number
          image: string | null
          is_paid: Database["public"]["Enums"]["course_access_enum"]
          language: Database["public"]["Enums"]["language_enum"]
          level: Database["public"]["Enums"]["course_level_enum"]
          meta_data: Json | null
          review_count: number
          short_description: string | null
          sub_category: number
          title: string
          updated_at: string | null
        }
        Insert: {
          avg_rating?: number
          category: number
          created_at?: string | null
          enrollment_count?: number
          id?: number
          image?: string | null
          is_paid?: Database["public"]["Enums"]["course_access_enum"]
          language: Database["public"]["Enums"]["language_enum"]
          level?: Database["public"]["Enums"]["course_level_enum"]
          meta_data?: Json | null
          review_count?: number
          short_description?: string | null
          sub_category: number
          title: string
          updated_at?: string | null
        }
        Update: {
          avg_rating?: number
          category?: number
          created_at?: string | null
          enrollment_count?: number
          id?: number
          image?: string | null
          is_paid?: Database["public"]["Enums"]["course_access_enum"]
          language?: Database["public"]["Enums"]["language_enum"]
          level?: Database["public"]["Enums"]["course_level_enum"]
          meta_data?: Json | null
          review_count?: number
          short_description?: string | null
          sub_category?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_sub_category_fkey"
            columns: ["sub_category"]
            isOneToOne: false
            referencedRelation: "sub_category"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollment: {
        Row: {
          course_id: number
          created_at: string | null
          id: number
          user_id: string
        }
        Insert: {
          course_id?: number
          created_at?: string | null
          id?: number
          user_id: string
        }
        Update: {
          course_id?: number
          created_at?: string | null
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollment_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_lg"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_md"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_sm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      price: {
        Row: {
          amount: number | null
          course_id: number
          currency: string | null
          end_date: string | null
          id: number
          is_promotional: boolean | null
          start_date: string | null
        }
        Insert: {
          amount?: number | null
          course_id: number
          currency?: string | null
          end_date?: string | null
          id?: number
          is_promotional?: boolean | null
          start_date?: string | null
        }
        Update: {
          amount?: number | null
          course_id?: number
          currency?: string | null
          end_date?: string | null
          id?: number
          is_promotional?: boolean | null
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "price_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_lg"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_md"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_sm"
            referencedColumns: ["id"]
          },
        ]
      }
      sub_category: {
        Row: {
          category_id: number
          created_at: string | null
          description: string | null
          id: number
          name: string
        }
        Insert: {
          category_id: number
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          category_id?: number
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "sub_category_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      topics: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      user_profile: {
        Row: {
          account_type: string
          avatar: string | null
          first_name: string | null
          last_name: string | null
          user_id: string
          username: string
        }
        Insert: {
          account_type?: string
          avatar?: string | null
          first_name?: string | null
          last_name?: string | null
          user_id: string
          username: string
        }
        Update: {
          account_type?: string
          avatar?: string | null
          first_name?: string | null
          last_name?: string | null
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profile_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      courses_lg: {
        Row: {
          amount: number | null
          avg_rating: number | null
          category: string | null
          created_at: string | null
          enrollment_count: number | null
          id: number | null
          image: string | null
          instructor: Json | null
          is_paid: Database["public"]["Enums"]["course_access_enum"] | null
          language: Database["public"]["Enums"]["language_enum"] | null
          level: Database["public"]["Enums"]["course_level_enum"] | null
          meta_data: Json | null
          review_count: number | null
          short_description: string | null
          sub_category: string | null
          tag: Json | null
          title: string | null
          topic: Json | null
        }
        Relationships: []
      }
      courses_md: {
        Row: {
          amount: number | null
          avg_rating: number | null
          category: string | null
          created_at: string | null
          enrollment_count: number | null
          id: number | null
          image: string | null
          instructor: Json | null
          is_paid: Database["public"]["Enums"]["course_access_enum"] | null
          language: Database["public"]["Enums"]["language_enum"] | null
          level: Database["public"]["Enums"]["course_level_enum"] | null
          review_count: number | null
          short_description: string | null
          sub_category: string | null
          tag: Json | null
          title: string | null
          topic: Json | null
        }
        Relationships: []
      }
      courses_sm: {
        Row: {
          avg_rating: number | null
          category: string | null
          id: number | null
          is_paid: Database["public"]["Enums"]["course_access_enum"] | null
          language: Database["public"]["Enums"]["language_enum"] | null
          level: Database["public"]["Enums"]["course_level_enum"] | null
          short_description: string | null
          sub_category: string | null
          title: string | null
          topic: Json | null
        }
        Relationships: []
      }
      sub_category_topics: {
        Row: {
          course_count: number | null
          name: string | null
          topic: string | null
        }
        Relationships: []
      }
      topic_main_and_sub_category: {
        Row: {
          category: Json | null
          name: string | null
          sub_category: Json | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_user: {
        Args: {
          user_id: string
          username: string
          email: string
          password: string
          avatar: string
          first_name: string
          last_name: string
          account_type: string
        }
        Returns: undefined
      }
      get_category_filters: {
        Args: {
          categories: string[]
          sub_categories: string[]
          topics: string[]
          levels: Database["public"]["Enums"]["course_level_enum"][]
          rating: number
          languages: Database["public"]["Enums"]["language_enum"][]
          price: Database["public"]["Enums"]["course_access_enum"][]
        }
        Returns: Json
      }
      get_courses_list: {
        Args: {
          q: string
          categories: string[]
          sub_categories: string[]
          topics: string[]
          levels: Database["public"]["Enums"]["course_level_enum"][]
          rating: number
          languages: Database["public"]["Enums"]["language_enum"][]
          price: Database["public"]["Enums"]["course_access_enum"][]
          sort: string
          page_size: number
          p: number
        }
        Returns: {
          id: number
          image: string
          title: string
          short_description: string
          enrollment_count: number
          instructors: Json
          tags: Json
          is_paid: Database["public"]["Enums"]["course_access_enum"]
          avg_rating: number
          review_count: number
          level: Database["public"]["Enums"]["course_level_enum"]
          amount: number
        }[]
      }
      get_text_search_filters: {
        Args: {
          q: string
          topics: string[]
          levels: Database["public"]["Enums"]["course_level_enum"][]
          rating: number
          languages: Database["public"]["Enums"]["language_enum"][]
          price: Database["public"]["Enums"]["course_access_enum"][]
        }
        Returns: Json
      }
    }
    Enums: {
      course_access_enum: "PAID" | "FREE"
      course_level_enum: "ALL_LEVELS" | "BEGINNER" | "INTERMEDIATE" | "EXPERT"
      course_section_content_type_enum: "Video" | "Document"
      language_enum:
        | "English"
        | "Hindi"
        | "Sanskrit"
        | "Spanish"
        | "French"
        | "German"
        | "Italian"
        | "Japanese"
        | "Chinese"
        | "Russian"
        | "Other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
