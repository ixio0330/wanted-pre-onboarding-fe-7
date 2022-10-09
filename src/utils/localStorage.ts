export function getToken() {
  return localStorage.getItem('ACCESS_TOEKN');
}

export function setToken(access_token: string) {
  localStorage.setItem('ACCESS_TOEKN', access_token);
}

export function removeToken() {
  localStorage.removeItem('ACCESS_TOEKN');
}