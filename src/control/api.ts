// Controller for interfacing with the Easel-Lite API
import { apiHost, apiPort, apiPath, RequestMethods } from "../config";
import { getToken } from "./session";
import { Class } from "../types/api";

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

    if (response.ok) {
        let body = await response.json();
        return body.token;
    } else {
        console.log(await response.json());
        return null;
    }
}

export async function getClasses(): Promise<Class[]> {
    let response = await apiCall(RequestMethods.get, "/classes", true);

    if (response.ok) {
        let body = await response.json();
        console.log(body);
        return body;
    } else {
        console.log(response.json());
        return Promise.resolve([]);
    }
}