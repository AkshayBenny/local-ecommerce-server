import { atom } from 'recoil';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  [key: string]: any;
}

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export const tokenState = atom<string | null>({
  key: 'tokenState',
  default: null,
});
