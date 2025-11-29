import { useState, useEffect } from 'react';
import { getApiUrl } from '../utils/api';

const UserCounter = () => {
  const [userCount, setUserCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Phrases to choose from - impressive alternatives
  const phrases = [
    'productive',
    'staying focused',
    'maximizing productivity',
    'achieving their goals',
    'making progress',
    'staying on track',
  ];

  // Select a random phrase once on mount
  const [currentPhrase] = useState(() => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  });

  const fetchOnlineCounter = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(getApiUrl('/online-counter'));
      if (!response.ok) {
        throw new Error('Failed to fetch online counter');
      }
      const data = await response.json();
      setUserCount(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOnlineCounter();
    // refresh the counter periodically (every 10 minutes)
    const interval = setInterval(fetchOnlineCounter, 600000);
    return () => clearInterval(interval);
  }, []);

  // Format number with commas
  const formatNumber = (num) => {
    if (num === null || num === undefined) return '0';
    return num.toLocaleString('en-US');
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10">
      <p className="text-white/60 text-sm md:text-base text-center font-light">
        {isLoading ? (
          <>...</>
        ) : error ? (
          <>Unable to load counter</>
        ) : (
          <>
            Right now there are{' '}
            <span className="text-white/80 font-medium">
              {formatNumber(userCount)}
            </span>{' '}
            people {currentPhrase} all around the world.
          </>
        )}
      </p>
    </div>
  );
};

export default UserCounter;
