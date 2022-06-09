export interface AuthResponse {
    id?: string;
    username?: string;
    email?: string;
    name?: string;
    msg?: string;
    token?: string;
    success?: boolean;
    favorites?: number [];
}

export interface User {
    id?: string;
    username?: string;
    email?: string;
    name?: string;
    password?: string;
    conditions?: boolean;
}