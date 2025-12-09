
export interface AdminTypes {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role?: string;
  lang: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserTypes {
  id: string
  firstName: string
  lastName: string
  emailAddress: string
  createdAt: number
  avatar: string
}

export interface ErrorTypes{
  response:{
    data:{
      message: string
      statusCode:number
    }
  }
}

export interface CategoriesTypes {
  id: string;
  image_url: string | null;
  is_active: boolean;
  translations: {
    id: number;
    language: string;
    title: string;
    description: string | null;
  }[];
  created_at: string;
  updated_at: string;
}

export interface ProductsTypes {
  id: string;
  price: number;
  category_id: string;
  image_urls: string[];
  stock: number;
  translations: {
    language: string;
    title: string;
  }[];
}