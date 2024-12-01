import { useState, useEffect } from 'react';

export const useFetch = <T,>(url: string): { data: T | null; error: string | null } => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError('Hiba történt az adatok betöltésekor');
      }
    };

    fetchData();
  }, [url]);

  return { data, error };
};
