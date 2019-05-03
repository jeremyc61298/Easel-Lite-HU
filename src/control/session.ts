// Controller for session storage
import { TokenPayload } from "../types/token";

const tokenSessionKey = "loginToken";

export function setToken(token: string) {
    sessionStorage.setItem(tokenSessionKey, token);
}

export function getToken(): string | null {
    return sessionStorage.getItem(tokenSessionKey);
}

export function clearToken() {
    sessionStorage.removeItem(tokenSessionKey);
}