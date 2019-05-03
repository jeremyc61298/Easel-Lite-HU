import { getToken } from "./session";
import { TokenPayload } from "../types/token";

// Controller for jwt

export function getPayload(): TokenPayload | null {
    let token = getToken();

    if (!token) {
        return null;
    } else {
        return JSON.parse(atob(token.split(".")[1]))
    }
}

export function tokenExpired(): boolean {
    let payload = getPayload();
    const now = new Date().getTime() / 1000;

    return (!payload || payload.exp < now);
}