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
          id: number
          image: string | null
          is_paid: boolean
          language: string
          level: number
          long_description: string | null
          requirements: string | null
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
          id?: number
          image?: string | null
          is_paid?: boolean
          language: string
          level?: number
          long_description?: string | null
          requirements?: string | null
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
          id?: number
          image?: string | null
          is_paid?: boolean
          language?: string
          level?: number
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
      sub_category_topics: {
        Row: {
          sub_category_id: number
          topic_id: number
        }
        Insert: {
          sub_category_id: number
          topic_id: number
        }
        Update: {
          sub_category_id?: number
          topic_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "sub_category_topics_sub_category_id_fkey"
            columns: ["sub_category_id"]
            referencedRelation: "sub_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sub_category_topics_topic_id_fkey"
            columns: ["topic_id"]
            referencedRelation: "topics"
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
          enrollment: number | null
          id: number | null
          image: string | null
          instructor: string | null
          is_paid: boolean | null
          level: number | null
          short_description: string | null
          sub_category: string | null
          tag: string | null
          title: string | null
          topic: string | null
        }
        Relationships: []
      }
      courses_sm: {
        Row: {
          avg_rating: number | null
          category: string | null
          id: number | null
          is_paid: boolean | null
          language: string | null
          level: number | null
          sub_category: string | null
          topic: string | null
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
          levels: number[]
          rating: number
          languages: string[]
          price: boolean[]
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      filter_table_one: {
        category: string
        rating_3_up: number
        rating_3_half_up: number
        rating_4_up: number
        rating_4_half_up: number
        paid: number
        free: number
        level1: number
        level2: number
        level3: number
        level4: number
      }
      id_table: {
        id: number
      }
    }
  }
}
