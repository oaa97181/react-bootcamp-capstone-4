import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import { useLatestAPI } from './useLatestAPI';

export function useWizelineData(category, pageSize) {
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [data, setData] = useState(() => ({
    data: {},
    isLoading: true,
  }));

  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const controller = new AbortController();

    async function getFeaturedBanners() {
      try {
        setData({ data: {}, isLoading: true });

        const response = await fetch(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
            `[[at(document.type, "${category}")]]`
          )}&lang=en-us&pageSize=${pageSize}`,
          {
            signal: controller.signal,
          }
        );
        const data = await response.json();

        console.log(data)

        setData({ data, isLoading: false });
      } catch (err) {
        setData({ data: {}, isLoading: false });
        console.error(err);
      }
    }

    getFeaturedBanners();

    return () => {
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading]);

  return data;
}
