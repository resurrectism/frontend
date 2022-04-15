const fetchWithRefresh = (
  refreshToken: () => Promise<Response>,
): typeof fetch => {
  return async (url: RequestInfo, options?: RequestInit) => {
    const response = await fetch(url, options);

    if (response.status === 401) {
      await refreshToken();
      return fetch(url, options);
    }

    return response;
  };
};

export default fetchWithRefresh;
