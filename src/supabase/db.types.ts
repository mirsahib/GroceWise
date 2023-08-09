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
      products: {
        Row: {
          brand: string | null
          category: string | null
          created_at: string | null
          id: number
          img_url: string | null
          price: number | null
          shelf_life: number | null
          title: string | null
        }
        Insert: {
          brand?: string | null
          category?: string | null
          created_at?: string | null
          id?: number
          img_url?: string | null
          price?: number | null
          shelf_life?: number | null
          title?: string | null
        }
        Update: {
          brand?: string | null
          category?: string | null
          created_at?: string | null
          id?: number
          img_url?: string | null
          price?: number | null
          shelf_life?: number | null
          title?: string | null
        }
        Relationships: []
      }
      shopping_list: {
        Row: {
          created_at: string | null
          id: number
          productlist: number[] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          productlist?: number[] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          productlist?: number[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shopping_list_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          }
        ]
      }
      user_profile: {
        Row: {
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profile_id_fkey"
            columns: ["id"]
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
      search_products: {
        Args: {
          product_title: string
        }
        Returns: {
          brand: string | null
          category: string | null
          created_at: string | null
          id: number
          img_url: string | null
          price: number | null
          shelf_life: number | null
          title: string | null
        }[]
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
