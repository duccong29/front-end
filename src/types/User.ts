export interface Role {
    name: string;
}

export interface User {
    id: string; 
    userName: string;
    firstName: string;
    lastName: string;
    dob: string;
    roles: Role[];
}

export interface LoginResponse {
    user?: User;
}
export interface UserResponse {
    code: number;
    data: User;
  }