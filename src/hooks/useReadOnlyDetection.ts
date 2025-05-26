
import { useState, useEffect } from 'react';

const API_BASE_URL = "https://3000-i55ier1dg4ii27z5jww1z-a32dc834.manus.computer/api";

interface ReadOnlyDetectionResult {
  isReadOnly: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useReadOnlyDetection = (): ReadOnlyDetectionResult => {
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const detectReadOnlyMode = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/status`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setIsReadOnly(data.readOnly || false);
      } catch (err) {
        console.error('Error detecting read-only mode:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setIsReadOnly(true); // Default to read-only on error
      } finally {
        setIsLoading(false);
      }
    };

    detectReadOnlyMode();
  }, []);

  return { isReadOnly, isLoading, error };
};
