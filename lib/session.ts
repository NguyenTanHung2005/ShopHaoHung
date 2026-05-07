import type { User } from '@/types';

export const AUTH_TOKEN_COOKIE = 'sports-shop-token';
export const AUTH_USER_COOKIE = 'sports-shop-user';

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
