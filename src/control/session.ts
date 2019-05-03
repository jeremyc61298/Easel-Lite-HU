// Controller for session storage
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