import type { User } from '@/types';

export const AUTH_TOKEN_COOKIE = 'shop-haohung-token';
export const AUTH_USER_COOKIE = 'shop-haohung-user';

export function encodeSessionUser(user: User) {
  return encodeURIComponent(JSON.stringify(user));
}

export function decodeSessionUser(value: string | undefined) {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(value)) as User;
  } catch {
    return null;
  }
}
