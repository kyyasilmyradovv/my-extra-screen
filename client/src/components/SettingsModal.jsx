import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { backgroundColors } from '../utils/backgroundColors';

const SettingsModal = ({
  isOpen,
  onClose,
  timeFormat,
  onTimeFormatChange,
  showSeconds,
  onShowSecondsChange,
  showQuotes,
  onShowQuotesChange,
  showProductivePeople,
  onShowProductivePeopleChange,
  workTime,
  onWorkTimeChange,
  restTime,
  onRestTimeChange,
  showTabs,
  onShowTabsChange,
  clockType,
  onClockTypeChange,
}) => {
  const [selectedFormat, setSelectedFormat] = useState(timeFormat);
  const [showSecondsValue, setShowSecondsValue] = useState(showSeconds);
  const [showQuotesValue, setShowQuotesValue] = useState(showQuotes);
  const [showProductivePeopleValue, setShowProductivePeopleValue] =
    useState(showProductivePeople);
  const [workTimeValue, setWorkTimeValue] = useState(workTime);
  const [restTimeValue, setRestTimeValue] = useState(restTime);
  const [showTabsValue, setShowTabsValue] = useState(showTabs);
  const [clockTypeValue, setClockTypeValue] = useState(clockType);
  const [backgroundColorValue, setBackgroundColorValue] = useState(() => {
    const saved = localStorage.getItem('backgroundColor');
    return saved || 'default';
  });

  useEffect(() => {
    setSelectedFormat(timeFormat);
  }, [timeFormat]);

  useEffect(() => {
    setShowSecondsValue(showSeconds);
  }, [showSeconds]);

  useEffect(() => {
    setShowQuotesValue(showQuotes);
  }, [showQuotes]);

  useEffect(() => {
    setShowProductivePeopleValue(showProductivePeople);
  }, [showProductivePeople]);

  useEffect(() => {
    setWorkTimeValue(workTime);
  }, [workTime]);

  useEffect(() => {
    setRestTimeValue(restTime);
  }, [restTime]);

  useEffect(() => {
    setShowTabsValue(showTabs);
  }, [showTabs]);

  useEffect(() => {
    setClockTypeValue(clockType);
  }, [clockType]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleFormatChange = (format) => {
    setSelectedFormat(format);
    onTimeFormatChange(format);
  };

  const handleShowSecondsChange = (checked) => {
    setShowSecondsValue(checked);
    onShowSecondsChange(checked);
  };

  const handleShowQuotesChange = (checked) => {
    setShowQuotesValue(checked);
    onShowQuotesChange(checked);
  };

  const handleShowProductivePeopleChange = (checked) => {
    setShowProductivePeopleValue(checked);
    onShowProductivePeopleChange(checked);
  };

  const handleWorkTimeChange = (time) => {
    setWorkTimeValue(time);
    onWorkTimeChange(time);
  };

  const handleRestTimeChange = (time) => {
    setRestTimeValue(time);
    onRestTimeChange(time);
  };

  const handleShowTabsChange = (checked) => {
    setShowTabsValue(checked);
    onShowTabsChange(checked);
  };

  const handleClockTypeChange = (type) => {
    setClockTypeValue(type);
    onClockTypeChange(type);
  };

  const handleBackgroundColorChange = (colorId) => {
    setBackgroundColorValue(colorId);
    localStorage.setItem('backgroundColor', colorId);
    // Trigger a custom event to notify App.jsx to update
    window.dispatchEvent(
      new CustomEvent('backgroundColorChanged', { detail: colorId })
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="settings-modal-title"
    >
      <div
        className="bg-[#1f2937] rounded-2xl p-8 w-full max-w-md mx-4 border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2
            id="settings-modal-title"
            className="text-2xl font-semibold text-white"
          >
            Settings
          </h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            aria-label="Close settings"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Clock Type Setting */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/90 mb-3">
            Clock Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'digital', name: 'Digital', icon: '🕐' },
              { id: 'minimal', name: 'Minimal', icon: '🕒' },
              { id: 'modern', name: 'Modern', icon: '🕓' },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => handleClockTypeChange(type.id)}
                className={`relative p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                  clockTypeValue === type.id
                    ? 'border-indigo-500 bg-indigo-500/20 ring-2 ring-indigo-500/50'
                    : 'border-white/20 bg-white/5 hover:border-white/40'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-2xl">{type.icon}</span>
                  <span className="text-sm font-medium text-white/90">
                    {type.name}
                  </span>
                </div>
                {clockTypeValue === type.id && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Time Format Setting */}
        <div className="mb-6">
          <label
            htmlFor="time-format"
            className="block text-sm font-medium text-white/90 mb-3"
          >
            Time Format
          </label>
          <FormControl fullWidth>
            <Select
              id="time-format"
              value={selectedFormat}
              onChange={(e) => handleFormatChange(e.target.value)}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: '#1f2937',
                    color: 'white',
                    '& .MuiMenuItem-root': {
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(99, 102, 241, 0.3)',
                        '&:hover': {
                          backgroundColor: 'rgba(99, 102, 241, 0.4)',
                        },
                      },
                    },
                  },
                },
              }}
              sx={{
                backgroundColor: '#2d3748',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0.5rem',
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: '2px solid #6366f1',
                },
                '& .MuiSvgIcon-root': { color: 'white' },
              }}
            >
              <MenuItem value="24h">24 Hour</MenuItem>
              <MenuItem value="12h">12 Hour</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Pomodoro Timer Settings */}
        <div className="mb-6">
          <div className="flex gap-4">
            {/* Work Time */}
            <div className="flex-1">
              <label
                htmlFor="work-time"
                className="block text-sm font-medium text-white/90 mb-3"
              >
                Pomodoro Work Time
              </label>
              <FormControl fullWidth>
                <Select
                  id="work-time"
                  value={workTimeValue}
                  onChange={(e) =>
                    handleWorkTimeChange(parseInt(e.target.value, 10))
                  }
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: '#1f2937',
                        color: 'white',
                        '& .MuiMenuItem-root': {
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          },
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(99, 102, 241, 0.3)',
                            '&:hover': {
                              backgroundColor: 'rgba(99, 102, 241, 0.4)',
                            },
                          },
                        },
                      },
                    },
                  }}
                  sx={{
                    backgroundColor: '#2d3748',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '0.5rem',
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: '2px solid #6366f1',
                    },
                    '& .MuiSvgIcon-root': { color: 'white' },
                  }}
                >
                  <MenuItem value={25}>25 minutes</MenuItem>
                  <MenuItem value={60}>1 hour</MenuItem>
                  <MenuItem value={120}>2 hours</MenuItem>
                  <MenuItem value={240}>4 hours</MenuItem>
                </Select>
              </FormControl>
            </div>
            {/* Rest Time */}
            <div className="flex-1">
              <label
                htmlFor="rest-time"
                className="block text-sm font-medium text-white/90 mb-3"
              >
                Pomodoro Rest Time
              </label>
              <FormControl fullWidth>
                <Select
                  id="rest-time"
                  value={restTimeValue}
                  onChange={(e) =>
                    handleRestTimeChange(parseInt(e.target.value, 10))
                  }
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: '#1f2937',
                        color: 'white',
                        '& .MuiMenuItem-root': {
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          },
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(99, 102, 241, 0.3)',
                            '&:hover': {
                              backgroundColor: 'rgba(99, 102, 241, 0.4)',
                            },
                          },
                        },
                      },
                    },
                  }}
                  sx={{
                    backgroundColor: '#2d3748',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '0.5rem',
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: '2px solid #6366f1',
                    },
                    '& .MuiSvgIcon-root': { color: 'white' },
                  }}
                >
                  <MenuItem value={5}>5 minutes</MenuItem>
                  <MenuItem value={15}>15 minutes</MenuItem>
                  <MenuItem value={60}>1 hour</MenuItem>
                  <MenuItem value={120}>2 hours</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        {/* Show Seconds Setting */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <label
              htmlFor="show-seconds"
              className="text-sm font-medium text-white cursor-pointer"
            >
              Show Seconds
            </label>
            <Switch
              id="show-seconds"
              checked={showSecondsValue}
              onChange={(e) => handleShowSecondsChange(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#6366f1' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#6366f1',
                },
                '& .MuiSwitch-track': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            />
          </div>
        </div>

        {/* Show Quotes Setting */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <label
              htmlFor="show-quotes"
              className="text-sm font-medium text-white cursor-pointer"
            >
              Show Quotes
            </label>
            <Switch
              id="show-quotes"
              checked={showQuotesValue}
              onChange={(e) => handleShowQuotesChange(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#6366f1' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#6366f1',
                },
                '& .MuiSwitch-track': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            />
          </div>
        </div>

        {/* Show Productive People Setting */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <label
              htmlFor="show-productive-people"
              className="text-sm font-medium text-white cursor-pointer"
            >
              Show Productive People
            </label>
            <Switch
              id="show-productive-people"
              checked={showProductivePeopleValue}
              onChange={(e) =>
                handleShowProductivePeopleChange(e.target.checked)
              }
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#6366f1' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#6366f1',
                },
                '& .MuiSwitch-track': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            />
          </div>
        </div>

        {/* Show Clock/Pomodoro Tabs Setting */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <label
              htmlFor="show-tabs"
              className="text-sm font-medium text-white cursor-pointer"
            >
              Show Clock/Pomodoro Tabs
            </label>
            <Switch
              id="show-tabs"
              checked={showTabsValue}
              onChange={(e) => handleShowTabsChange(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#6366f1' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#6366f1',
                },
                '& .MuiSwitch-track': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            />
          </div>
        </div>

        {/* Background Color Setting */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/90 mb-3">
            Background Color
          </label>

          {/* Solid Colors */}
          <div className="mb-4">
            <p className="text-xs text-white/60 mb-2">Solid Colors</p>
            <div className="flex flex-wrap gap-3">
              {backgroundColors.solid.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleBackgroundColorChange(color.id)}
                  className={`w-12 h-12 rounded-full border-2 transition-all hover:scale-110 ${
                    backgroundColorValue === color.id
                      ? 'border-white ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#1f2937]'
                      : 'border-white/30 hover:border-white/50'
                  }`}
                  style={{ backgroundColor: color.color }}
                  aria-label={color.name}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Gradient Colors */}
          <div className="mb-4">
            <p className="text-xs text-white/60 mb-2">More Gradient Colors</p>
            <div className="flex flex-wrap gap-3">
              {backgroundColors.gradient.map((gradient) => (
                <button
                  key={gradient.id}
                  onClick={() => handleBackgroundColorChange(gradient.id)}
                  className={`w-12 h-12 rounded-full border-2 transition-all hover:scale-110 ${
                    backgroundColorValue === gradient.id
                      ? 'border-white ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#1f2937]'
                      : 'border-white/30 hover:border-white/50'
                  }`}
                  style={{ background: gradient.gradient }}
                  aria-label={gradient.name}
                  title={gradient.name}
                />
              ))}
              <button
                onClick={() =>
                  handleBackgroundColorChange(backgroundColors.animated.id)
                }
                className={`w-12 h-12 rounded-full border-2 transition-all hover:scale-110 relative overflow-hidden ${
                  backgroundColorValue === backgroundColors.animated.id
                    ? 'border-white ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#1f2937]'
                    : 'border-white/30 hover:border-white/50'
                }`}
                style={{ background: backgroundColors.animated.preview }}
                aria-label={backgroundColors.animated.name}
                title={backgroundColors.animated.name}
              >
                <div className="absolute inset-0 animate-shimmer rounded-full"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-sm text-gray-300 text-center">
          You know better how you will be more productive.
        </p>
      </div>
    </div>
  );
};

export default SettingsModal;
