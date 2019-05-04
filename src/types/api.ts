// Types received from the api
export interface Class {
    _id: string;
    department: string;
    number: number;
    title: string;
    teacher: User;
}

export interface User {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
}

export interface CreateableClass {
    _id: string,
    department: string;
    number: number;
    title: string;
    teacher: string;
}