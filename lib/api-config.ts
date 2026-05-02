export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const getApiUrl = (path: string) => {
  if (path.startsWith('http')) return path;
  return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};
