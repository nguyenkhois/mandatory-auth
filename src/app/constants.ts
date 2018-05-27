export interface User {
    sub?: string;
    name?: string;
}

export interface AuthResponse {
    token: string;
}

export interface UserCredentials {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}
