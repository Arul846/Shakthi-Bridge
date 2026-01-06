
export enum UserPath {
  SELLER = 'SELLER',
  BUYER = 'BUYER',
  ADMIN = 'ADMIN'
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  sellerId: string;
  sellerName: string;
  location: string;
  isVerified: boolean;
}

export interface SellerProfile {
  id: string;
  name: string;
  location: string;
  experience: number;
  skills: string[];
  bio: string;
  category: string;
  products: Product[];
  language: string;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  status: 'PENDING' | 'PACKAGING' | 'SHIPPED' | 'DELIVERED';
  amount: number;
  date: string;
}
