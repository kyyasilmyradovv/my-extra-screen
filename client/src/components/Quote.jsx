import { useState, useEffect } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getApiUrl } from '../utils/api';

const Quote = () => {
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(getApiUrl('/quote'));
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      const data = await response.json();
      setQuote(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching quote:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleRefresh = () => {
    fetchQuote();
  };

  return (
    <div className="w-full max-w-4xl px-4">
      <div className="flex items-start gap-4">
        {/* Quote Text */}
        <div className="flex-1 text-center">
          {isLoading ? (
            <p className="text-white/50 text-lg md:text-xl lg:text-2xl font-light italic">
              Loading quote...
            </p>
          ) : error ? (
            <p className="text-white/50 text-lg md:text-xl lg:text-2xl font-light italic">
              Failed to load quote
            </p>
          ) : quote ? (
            <>
              <p className="text-white/80 text-lg md:text-xl lg:text-2xl font-light italic leading-relaxed">
                "{quote.quote}"
              </p>
              {quote.author && (
                <p className="text-white/50 text-sm md:text-base mt-4 font-normal">
                  — {quote.author}
                </p>
              )}
            </>
          ) : null}
        </div>

        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="text-white/50 hover:text-white/80 transition-colors p-2 hover:bg-white/10 rounded-lg flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Refresh quote"
        >
          <RefreshIcon className="text-xl md:text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Quote;
