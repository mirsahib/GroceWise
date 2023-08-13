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
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
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
      shopping_product_list: {
        Row: {
          id: number
          product_id: number | null
          shopping_list_id: number | null
        }
        Insert: {
          id: number
          product_id?: number | null
          shopping_list_id?: number | null
        }
        Update: {
          id?: number
          product_id?: number | null
          shopping_list_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "shopping_product_list_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopping_product_list_shopping_list_id_fkey"
            columns: ["shopping_list_id"]
            referencedRelation: "shopping_list"
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
      create_shopping_list: {
        Args: {
          input_user_id: string
          date: string
          product_id_arr: number[]
        }
        Returns: number
      }
      get_all_product_info: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_unique_categories: {
        Args: Record<PropertyKey, never>
        Returns: string[]
      }
      get_user_product_info: {
        Args: {
          input_user_id: string
        }
        Returns: Json
      }
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

