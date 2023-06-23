export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
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
            foreignKeyName: "course_review_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      courses: {
        Row: {
          category: number
          course_promises: Json | null
          course_purpose: string | null
          created_at: string | null
          id: number
          image: string | null
          language: string
          long_description: string | null
          requirements: string | null
          short_description: string | null
          sub_category: number
          title: string
          updated_at: string | null
        }
        Insert: {
          category: number
          course_promises?: Json | null
          course_purpose?: string | null
          created_at?: string | null
          id?: number
          image?: string | null
          language: string
          long_description?: string | null
          requirements?: string | null
          short_description?: string | null
          sub_category: number
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: number
          course_promises?: Json | null
          course_purpose?: string | null
          created_at?: string | null
          id?: number
          image?: string | null
          language?: string
          long_description?: string | null
          requirements?: string | null
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
            foreignKeyName: "enrollment_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
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
      topics: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
          sub_category: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
          sub_category: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          sub_category?: number
        }
        Relationships: [
          {
            foreignKeyName: "topics_category_fkey"
            columns: ["sub_category"]
            referencedRelation: "sub_category"
            referencedColumns: ["id"]
          }
        ]
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
      [_ in never]: never
    }
    Functions: {
      create_user:
        | {
            Args: {
              email: string
              password: string
            }
            Returns: undefined
          }
        | {
            Args: {
              username: string
              email: string
              password: string
            }
            Returns: undefined
          }
        | {
            Args: {
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
        | {
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
        | {
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
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
