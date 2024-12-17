
const BASE_URL = 'https://swapi.dev/api/';

export const apiClient = async <T>(
  endpoint: string,
  method: 'GET' | 'POST' = 'GET',
  queryParams?: Record<string, string>,
  headers: Record<string, string> = {}
): Promise<T> => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => url.searchParams.append(key, value));
  }

  try {
    const response = await fetch(url.toString(), {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || 'An unknown error occurred');
  }
};
