import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import { useLatestAPI } from './useLatestAPI';

export function useWizelineData(type, pageSize, tags) {
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
              `[[at(document.type, "${type}")]]` , `[[at(document.tags, "${tags}")]]`
          )}&lang=en-us&pageSize=${pageSize}`,
          {
            signal: controller.signal,
          }
        );
        const data = await response.json();

        // console.log('data in useWizelineData w/ type ' + type, data)

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
  }, [apiRef, isApiMetadataLoading, pageSize, tags, type]);

  return data;
}
