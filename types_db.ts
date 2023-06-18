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
      courses: {
        Row: {
          category: number
          created_at: string | null
          description: string
          id: number
          instructor_id: string
          sub_category: number
          title: string
        }
        Insert: {
          category: number
          created_at?: string | null
          description: string
          id?: number
          instructor_id: string
          sub_category: number
          title: string
        }
        Update: {
          category?: number
          created_at?: string | null
          description?: string
          id?: number
          instructor_id?: string
          sub_category?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_category_fkey"
            columns: ["category"]
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_instructor_id_fkey"
            columns: ["instructor_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_sub_category_fkey"
            columns: ["sub_category"]
            referencedRelation: "sub-category"
            referencedColumns: ["id"]
          }
        ]
      }
      "sub-category": {
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
      tags: {
        Row: {
          category: number
          created_at: string | null
          description: string
          id: number
          name: string
        }
        Insert: {
          category: number
          created_at?: string | null
          description: string
          id?: number
          name: string
        }
        Update: {
          category?: number
          created_at?: string | null
          description?: string
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tags_category_fkey"
            columns: ["category"]
            referencedRelation: "sub-category"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
