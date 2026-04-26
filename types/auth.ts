export type RegisterRequest = {
  email: string;
  password: string;
  userName?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type CheckSessionRequest = {
  success: boolean;
};

export type CheckSessionResponse = {
  success: boolean;
};

