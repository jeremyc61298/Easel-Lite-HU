// Controller for interfacing with the Easel-Lite API
import { apiHost, apiPort, apiPath, RequestMethods } from "../config";
import { getToken } from "./session";
import { Class, User, CreateableClass } from "../types/api";

export function apiCall(method: RequestMethods, pathname: string, authenticate: boolean, body?: object): Promise<Response> {
    const url = `http://${apiHost}:${apiPort}${apiPath}${pathname}`;
    let headers: any = {};
    let options: any = {method, headers, mode: 'cors'};
    
    if (authenticate) {
        // Get the jwt from the session storage
        options.headers["Authorization"] = "Bearer " + getToken();
    }
    
    if (body) {
        options.headers["Content-type"] = "application/json";
        options.body = JSON.stringify(body);
    }

    return fetch(url, options);
}

export async function postLogin(username: string, password: string): Promise<string|null> {
    let response = await apiCall(RequestMethods.post, "/login", false, {username, password});

    let body = await response.json();

    if (response.ok) {
        return body.token;
    } else {
        console.log(body);
        return null;
    }
}

export async function getClasses(): Promise<Class[]> {
    let response = await apiCall(RequestMethods.get, "/classes?sort=department+number", true);

    let body = await response.json();

    if (response.ok) {
        return body;
    } else {
        console.log(body);
        return Promise.resolve([]);
    }
}

export async function getClass(dept: string, num: string): Promise<Class|null> {
    let response = await apiCall(RequestMethods.get, `/classes/${dept}${num}`, true);

    let body = await response.json();

    if (response.ok && !body.message) {
        return body;
    } else {
        console.log(body.message);
        return null;
    }
}

export async function postClass(c: CreateableClass): Promise<Class|null> {
    let response = await apiCall(RequestMethods.post, "/classes", true, c);

    let body = await response.json();

    if (response.ok && !body.message) {
        return body;
    } else {
        console.log(body.message);
        return null;
    }
}

export async function deleteClass(id: string) {
    let response = await apiCall(RequestMethods.delete, `/classes/${id}`, true);

    let body = await response.json();

    if (response.ok) {
        return body;
    } else {
        console.log(body);
        return null;
    }
}

export async function updateClass(updatedClass: CreateableClass) {
    let response = await apiCall(RequestMethods.put, `/classes/${updatedClass._id}`, true, updatedClass);

    let body = await response.json();
    if (response.ok) {
        return body;
    } else {
        console.log(body);
        return null;
    }
}

export async function getTeachers(): Promise<User[]> {
    let response = await apiCall(RequestMethods.get, "/users?role=teacher", true);

    let body = await response.json();

    if (response.ok) {
        return body;
    } else {
        console.log(body);
        return Promise.resolve([]);
    }
}