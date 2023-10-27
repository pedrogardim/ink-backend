export {};

interface CurrentUserData {
  id: number;
  role: string;
}

declare global {
  namespace Express {
    export interface Request {
      currentUser?: Language;
    }
  }
}
