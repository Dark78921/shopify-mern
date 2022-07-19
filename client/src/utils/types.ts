export interface ReviewTypes {
  _id?: string;
  comment: string;
  rating: number;
  user: {
    id: string;
    username: string;
  };
}

export interface ProductType {
  varified: boolean;
  images: [string];
  price: number;
  countInStock: number;
  name: string;
  _id: string;
  category: string;
  description: string;
  reviews: ReviewTypes[];
  avgRating: number;
  // __v: string
}

export interface OrderType {
  product: ProductType;
  user: string;
  address: string;
  postalCode: number;
  price: number;
  shippingPrice: boolean;
  _id: string;
  isDelivered: boolean;
  totalPrice: number;
}

export interface CartType {
  image: string;
  price: number;
  inStock: number;
  name: string;
  id: string;
  qty: number;
}

export enum MethodEnum {
  Login = 'login',
  Signup = 'signup',
}

export interface UserType {
  id: string;
  username: string;
  isAdmin: boolean;
  email: string;
  token: string;
}
