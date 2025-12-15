
export interface AdminTypes {
  id: string;
  firstName: string;
  email: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
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

export interface BlogTypes {
  _id?: string;
  createdAt?: string;
  title: string;
  text:string;
  image?:string;
}

export interface ServiceTypes {
  _id?: string;
  createdAt?: string;
  title: string;
  text:string;
  image?:string;
}

export interface StoryTypes {
  _id?: string;
  createdAt?: string;
  title: string;
  text:string;
  image?:string;
  year:string
}
