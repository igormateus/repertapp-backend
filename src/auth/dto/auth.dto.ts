export class AuthDto {
  id: string;
  username: string;
  name: string | null;
  email: string | null;
}

export type AuthSelect = {
  id: boolean;
  username: boolean;
  name: boolean;
  email: boolean;
};

export const authSelect: AuthSelect = {
  id: true,
  username: true,
  name: true,
  email: true,
};
