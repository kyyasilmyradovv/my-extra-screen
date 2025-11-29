import { useState, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import SettingsModal from './SettingsModal';
import ContactModal from './ContactModal';
import AboutModal from './AboutModal';
import Quote from './Quote';
import Clock from './Clock';
import Pomodoro from './Pomodoro';

const Layout = ({
  showProductivePeople,
  onShowProductivePeopleChange,
  UserCounterComponent,
  onModalStateChange,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('clock'); // 'clock' or 'pomodoro'
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Check if any modal is open
  const isAnyModalOpen = isSettingsOpen || isContactOpen || isAboutOpen;

  // Notify parent when modal state changes
  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(isAnyModalOpen);
    }
  }, [isAnyModalOpen, onModalStateChange]);
  const [timeFormat, setTimeFormat] = useState(() => {
    // Load from localStorage or default to 24h
    const saved = localStorage.getItem('timeFormat');
    return saved || '24h';
  });
  const [showSeconds, setShowSeconds] = useState(() => {
    // Load from localStorage or default to true
    const saved = localStorage.getItem('showSeconds');
    return saved !== null ? saved === 'true' : true;
  });
  const [showQuotes, setShowQuotes] = useState(() => {
    // Load from localStorage or default to true
    const saved = localStorage.getItem('showQuotes');
    return saved !== null ? saved === 'true' : false;
  });
  const [workTime, setWorkTime] = useState(() => {
    // Load from localStorage or default to 25 minutes
    const saved = localStorage.getItem('pomodoroWorkTime');
    return saved ? parseInt(saved, 10) : 25;
  });
  const [restTime, setRestTime] = useState(() => {
    // Load from localStorage or default to 5 minutes
    const saved = localStorage.getItem('pomodoroRestTime');
    return saved ? parseInt(saved, 10) : 5;
  });
  const [showTabs, setShowTabs] = useState(() => {
    // Load from localStorage or default to true
    const saved = localStorage.getItem('showTabs');
    return saved !== null ? saved === 'true' : true;
  });
  const [clockType, setClockType] = useState(() => {
    // Load from localStorage or default to 'digital'
    const saved = localStorage.getItem('clockType');
    return saved || 'digital';
  });

  const handleTimeFormatChange = (format) => {
    setTimeFormat(format);
    localStorage.setItem('timeFormat', format);
  };

  const handleShowSecondsChange = (show) => {
    setShowSeconds(show);
    localStorage.setItem('showSeconds', show.toString());
  };

  const handleShowQuotesChange = (show) => {
    setShowQuotes(show);
    localStorage.setItem('showQuotes', show.toString());
  };

  const handleWorkTimeChange = (time) => {
    setWorkTime(time);
    localStorage.setItem('pomodoroWorkTime', time.toString());
  };

  const handleRestTimeChange = (time) => {
    setRestTime(time);
    localStorage.setItem('pomodoroRestTime', time.toString());
  };

  const handleShowTabsChange = (show) => {
    setShowTabs(show);
    localStorage.setItem('showTabs', show.toString());
  };

  const handleClockTypeChange = (type) => {
    setClockType(type);
    localStorage.setItem('clockType', type);
  };

  // Fullscreen functionality
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <section
      className="flex flex-col items-center justify-center gap-16 z-10 relative"
      aria-label="Digital clock and timer display"
    >
      {/* Logo */}
      <div className="fixed top-6 left-6 z-50">
        <img
          src="/my-extra-screen-logo.svg"
          alt="My Extra Screen"
          className="h-28 w-auto opacity-80 hover:opacity-100 transition-opacity"
        />
      </div>
      {/* Tabs */}
      {showTabs && (
        <div
          className={`flex items-center gap-2 bg-white/5 rounded-lg p-1 border border-white/10 ${
            activeTab === 'clock' ? '-mt-12' : ''
          }`}
        >
          <button
            onClick={() => setActiveTab('clock')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'clock'
                ? 'bg-indigo-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Clock
          </button>
          <button
            onClick={() => setActiveTab('pomodoro')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'pomodoro'
                ? 'bg-indigo-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Pomodoro
          </button>
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === 'clock' ? (
        <Clock
          timeFormat={timeFormat}
          showSeconds={showSeconds}
          clockType={clockType}
        />
      ) : (
        <Pomodoro workTime={workTime} restTime={restTime} />
      )}

      {/* Decorative elements */}
      {activeTab === 'clock' && (
        <div className="flex gap-4 mt-8" aria-hidden="true">
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.6)] animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-[0_0_20px_rgba(139,92,246,0.6)] animate-pulse-delay-1"></div>
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-pink-500 to-amber-500 shadow-[0_0_20px_rgba(236,72,153,0.6)] animate-pulse-delay-2"></div>
        </div>
      )}

      {/* Quote */}
      {showQuotes && (
        <div className="min-h-[120px] md:min-h-[140px] flex items-center justify-center w-full">
          <Quote />
        </div>
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        timeFormat={timeFormat}
        onTimeFormatChange={handleTimeFormatChange}
        showSeconds={showSeconds}
        onShowSecondsChange={handleShowSecondsChange}
        showQuotes={showQuotes}
        onShowQuotesChange={handleShowQuotesChange}
        showProductivePeople={showProductivePeople}
        onShowProductivePeopleChange={onShowProductivePeopleChange}
        workTime={workTime}
        onWorkTimeChange={handleWorkTimeChange}
        restTime={restTime}
        onRestTimeChange={handleRestTimeChange}
        showTabs={showTabs}
        onShowTabsChange={handleShowTabsChange}
        clockType={clockType}
        onClockTypeChange={handleClockTypeChange}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* About Modal */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      {/* User Counter - Rendered from App */}
      {UserCounterComponent}

      {/* Bottom Right Icons */}
      <div className="fixed bottom-6 right-6 flex items-center gap-4 z-50">
        <button
          onClick={toggleFullscreen}
          className="text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? (
            <FullscreenExitIcon className="text-xl md:text-2xl" />
          ) : (
            <FullscreenIcon className="text-xl md:text-2xl" />
          )}
        </button>
        <button
          onClick={() => {
            if (!isAnyModalOpen) {
              setIsSettingsOpen(true);
            }
          }}
          disabled={isAnyModalOpen}
          className={`transition-colors p-2 rounded-lg ${
            isAnyModalOpen
              ? 'text-white/30 cursor-not-allowed'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Open settings"
        >
          <SettingsIcon className="text-xl md:text-2xl" />
        </button>
        <button
          onClick={() => {
            if (!isAnyModalOpen) {
              setIsContactOpen(true);
            }
          }}
          disabled={isAnyModalOpen}
          className={`transition-colors p-2 rounded-lg ${
            isAnyModalOpen
              ? 'text-white/30 cursor-not-allowed'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Contact the builder"
        >
          <SendIcon className="text-xl md:text-2xl" />
        </button>
        <button
          onClick={() => {
            if (!isAnyModalOpen) {
              setIsAboutOpen(true);
            }
          }}
          disabled={isAnyModalOpen}
          className={`transition-colors p-2 rounded-lg ${
            isAnyModalOpen
              ? 'text-white/30 cursor-not-allowed'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
          aria-label="About"
        >
          <InfoIcon className="text-xl md:text-2xl" />
        </button>
      </div>
    </section>
  );
};

export default Layout;
