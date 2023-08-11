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
