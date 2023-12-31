export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
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
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_instructor_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses_md"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_instructor_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses_sm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_instructor_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_review_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses_md"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_review_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses_sm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_review_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_tags_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses_md"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_tags_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses_sm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_tags_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
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
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_topics_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses_md"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_topics_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses_sm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_topics_topic_id_fkey"
            columns: ["topic_id"]
            referencedRelation: "topics"
            referencedColumns: ["id"]
          }
        ]
      }
      courses: {
        Row: {
          avg_rating: number
          category: number
          course_promises: Json | null
          course_purpose: string | null
          created_at: string | null
          enrollment_count: number
          id: number
          image: string | null
          is_paid: Database["public"]["Enums"]["course_access_enum"]
          language: Database["public"]["Enums"]["language_enum"]
          level: Database["public"]["Enums"]["course_level_enum"]
          long_description: string | null
          requirements: string | null
          review_count: number
          short_description: string | null
          sub_category: number
          title: string
          updated_at: string | null
        }
        Insert: {
          avg_rating?: number
          category: number
          course_promises?: Json | null
          course_purpose?: string | null
          created_at?: string | null
          enrollment_count?: number
          id?: number
          image?: string | null
          is_paid?: Database["public"]["Enums"]["course_access_enum"]
          language: Database["public"]["Enums"]["language_enum"]
          level?: Database["public"]["Enums"]["course_level_enum"]
          long_description?: string | null
          requirements?: string | null
          review_count?: number
          short_description?: string | null
          sub_category: number
          title: string
          updated_at?: string | null
        }
        Update: {
          avg_rating?: number
          category?: number
          course_promises?: Json | null
          course_purpose?: string | null
          created_at?: string | null
          enrollment_count?: number
          id?: number
          image?: string | null
          is_paid?: Database["public"]["Enums"]["course_access_enum"]
          language?: Database["public"]["Enums"]["language_enum"]
          level?: Database["public"]["Enums"]["course_level_enum"]
          long_description?: string | null
          requirements?: string | null
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
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_sub_category_fkey"
            columns: ["sub_category"]
            referencedRelation: "sub_category"
            referencedColumns: ["id"]
          }
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
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses_md"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses_sm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses_md"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses_sm"
            referencedColumns: ["id"]
          }
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
            referencedRelation: "category"
            referencedColumns: ["id"]
          }
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
      topic_connections: {
        Row: {
          from_id: number
          id: number
          to_id: number
        }
        Insert: {
          from_id: number
          id?: number
          to_id: number
        }
        Update: {
          from_id?: number
          id?: number
          to_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "topic_connections_from_id_fkey"
            columns: ["from_id"]
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "topic_connections_to_id_fkey"
            columns: ["to_id"]
            referencedRelation: "topics"
            referencedColumns: ["id"]
          }
        ]
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
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
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
      get_text_search_courses_list: {
        Args: {
          q: string
          topics: string[]
          levels: Database["public"]["Enums"]["course_level_enum"][]
          rating: number
          languages: Database["public"]["Enums"]["language_enum"][]
          price: Database["public"]["Enums"]["course_access_enum"][]
          sort: string
          page_size: number
          page_number: number
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
      get_xx: {
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
