// Types received from the api
export interface Class {
    department: string;
    number: number;
    title: string;
    teacher: User;
    students: User[];
}

export interface User {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
}