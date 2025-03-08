export const getFetch = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json(); // JSON Server는 항상 JSON을 반환하므로 바로 파싱 가능
};

export const createFetch = async <T, R>(url: string, body: T): Promise<R> => {
  const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json', 
      },
      body: JSON.stringify(body),
  });

  if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json(); 
};
