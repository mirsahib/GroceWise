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
