export interface LangTypes {
  en: string,
  uz: string,
  ru: string,
  kr: string
}


export interface AdminTypes {
  _id: string;
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

export interface ErrorTypes {
  response: {
    data: {
      message: string
      statusCode: number
    }
  }
}

export interface BlogTypes {
  _id?: string;
  createdAt?: string;
  title: LangTypes
  text: LangTypes;
  image?: string;
}

export interface ServiceTypes {
  _id?: string;
  createdAt?: string;
  title: LangTypes;
  text: LangTypes;
  image?: string;
}

export interface StoryTypes {
  _id?: string;
  createdAt?: string;
  title: string;
  text: string;
  image?: string;
  year: string
}

export interface CommentTypes {
  _id?: string;
  createdAt?: string;
  name: string;
  text: string;
  image?: string;
  job: string
}

export interface ContactTypes {
  _id?: string;
  createdAt?: string;
  name: string;
  phone: string;
  email: string;
  service: string
}