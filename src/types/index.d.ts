export {};

export interface CurrentUserData {
  userId: number;
  role: string;
}

declare global {
  namespace Express {
    export interface Request {
      currentUser?: Language;
    }
  }
}
