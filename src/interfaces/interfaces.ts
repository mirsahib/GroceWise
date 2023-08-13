import { Database } from "@/db/schema";

export interface ChildrenProp {
  children: React.ReactNode;
}

export interface ItemLinkProps {
  href: string;
  children: React.ReactNode;
  separator?: boolean;
}

export interface IconProps {
  size?: string | number | '1rem';
}

export interface SearchFormInputs {
  search: string;
}
export interface ProductEntry {
  product_id: number;
  product_title: string;
  shopping_list_id: number;
  user_id: string;
}
export interface TransformedUserData {
  user_id: string;
  product_id: number[];
}
export interface UserProductEntry {
  product_id: number;
  product_title: string;
  shopping_list_id: number;
}

export interface ProductCardProps {
  product_id: number;
  product_image: string;
  product_title: string;
  product_description: string;
  product_price: number;
  product_shelf_life: string;
}
export interface Product {
  product_id: number;
  product_title: string;
  price: number;
  img_url: string;
}

export interface ShoppingList {
  shopping_list_id: number;
  products: Product[];
  created_at: string;
}
export interface ShoppingListProps {
  shoppingList: {
    shopping_list_id: number;
    created_at: string;
    products: Product[];
  };
}
export type Products = Database['public']['Tables']['products']['Row']
