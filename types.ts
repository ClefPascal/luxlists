export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  affiliateLink: string;
  badge?: string;
  discount?: string;
  isStaffPick?: boolean;
  inStock?: boolean;
}

export type Category = 'All' | 'Desk Setup' | 'Audio' | 'Carry' | 'Lighting' | 'Accessories';

export interface User {
  email: string;
  name: string;
}

export const CATEGORIES: Category[] = ['All', 'Desk Setup', 'Audio', 'Carry', 'Lighting', 'Accessories'];
