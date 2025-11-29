import { useState, useEffect } from 'react';

const Clock = ({ timeFormat, showSeconds, clockType = 'digital' }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    let ampm = '';

    if (timeFormat === '12h') {
      ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      hours = hours.toString().padStart(2, '0');
    } else {
      hours = hours.toString().padStart(2, '0');
    }

    return {
      hours,
      minutes,
      seconds,
      ampm,
      rawHours: date.getHours(),
      rawMinutes: date.getMinutes(),
      rawSeconds: date.getSeconds(),
    };
  };

  const formatDate = (date) => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const dayName = days[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${dayName}, ${month} ${day}, ${year}`;
  };

  const { hours, minutes, seconds, ampm } = formatTime(time);
  const dateString = formatDate(time);

  // Render different clock types
  const renderDigital = () => (
    <>
      {/* Date */}
      <time
        dateTime={time.toISOString()}
        className="text-white/70 font-normal tracking-[0.1em] uppercase text-base md:text-2xl font-sans"
        aria-label={`Current date: ${dateString}`}
      >
        {dateString}
      </time>

      {/* Main Clock - Centered */}
      <div className="relative flex justify-center items-baseline">
        <div
          className="flex items-baseline gap-4 md:gap-8 font-mono"
          role="timer"
          aria-label={`Current time: ${hours} hours, ${minutes} minutes, ${seconds} seconds`}
        >
          <time
            dateTime={`${hours}:${minutes}:${seconds}`}
            className="text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[12rem] font-light text-white leading-none tracking-[-0.02em] [text-shadow:0_0_40px_rgba(99,102,241,0.5),0_0_80px_rgba(139,92,246,0.3)]"
            aria-label={`${hours} hours`}
          >
            {hours}
          </time>
          <span
            className="text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[12rem] font-light text-white/30 leading-none"
            aria-hidden="true"
          >
            :
          </span>
          <time
            dateTime={`${hours}:${minutes}:${seconds}`}
            className="text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[12rem] font-light text-white leading-none tracking-[-0.02em] [text-shadow:0_0_40px_rgba(99,102,241,0.5),0_0_80px_rgba(139,92,246,0.3)]"
            aria-label={`${minutes} minutes`}
          >
            {minutes}
          </time>
        </div>

        {/* Seconds/AMPM - Positioned to the right */}
        {(showSeconds || (timeFormat === '12h' && ampm)) && (
          <div className="absolute left-full ml-4 md:ml-8 flex flex-col items-start justify-center h-full">
            {showSeconds && (
              <time
                dateTime={`${hours}:${minutes}:${seconds}`}
                className="text-[1.75rem] sm:text-[2.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-light text-white/50 leading-none font-mono"
                aria-label={`${seconds} seconds`}
              >
                {seconds}
              </time>
            )}
            {timeFormat === '12h' && ampm && (
              <span className="text-[1.75rem] sm:text-[2.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-light text-white/50 leading-none">
                {ampm}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );

  const renderMinimal = () => (
    <>
      {/* Date */}
      <time
        dateTime={time.toISOString()}
        className="text-white/60 font-light tracking-wide text-sm md:text-base font-sans mb-6"
        aria-label={`Current date: ${dateString}`}
      >
        {dateString}
      </time>

      {/* Minimal Clock - Centered */}
      <div className="relative flex justify-center items-center">
        <div
          className="flex items-center gap-2 font-light"
          role="timer"
          aria-label={`Current time: ${hours} hours, ${minutes} minutes, ${seconds} seconds`}
        >
          <time
            dateTime={`${hours}:${minutes}:${seconds}`}
            className="text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] text-white/90 leading-none"
            aria-label={`${hours} hours`}
          >
            {hours}
          </time>
          <span
            className="text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] text-white/40 leading-none"
            aria-hidden="true"
          >
            :
          </span>
          <time
            dateTime={`${hours}:${minutes}:${seconds}`}
            className="text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] text-white/90 leading-none"
            aria-label={`${minutes} minutes`}
          >
            {minutes}
          </time>
        </div>

        {/* Seconds/AMPM - Positioned to the right */}
        {(showSeconds || (timeFormat === '12h' && ampm)) && (
          <div className="absolute left-full ml-4 md:ml-6 flex flex-col items-start justify-center h-full">
            {showSeconds && (
              <time
                dateTime={`${hours}:${minutes}:${seconds}`}
                className="text-[1.5rem] sm:text-[2rem] md:text-[3rem] lg:text-[4rem] text-white/60 leading-none"
                aria-label={`${seconds} seconds`}
              >
                {seconds}
              </time>
            )}
            {timeFormat === '12h' && ampm && (
              <span className="text-[1rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] text-white/50 leading-none">
                {ampm}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );

  const renderModern = () => (
    <>
      {/* Date */}
      <time
        dateTime={time.toISOString()}
        className="text-white/80 font-medium tracking-wider uppercase text-sm md:text-lg font-sans mb-8"
        aria-label={`Current date: ${dateString}`}
      >
        {dateString}
      </time>

      {/* Modern Clock - Centered */}
      <div className="relative flex justify-center items-center">
        <div
          className="flex items-center gap-3 font-mono"
          role="timer"
          aria-label={`Current time: ${hours} hours, ${minutes} minutes, ${seconds} seconds`}
        >
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 md:px-8 md:py-6">
            <time
              dateTime={`${hours}:${minutes}:${seconds}`}
              className="text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[7rem] text-white font-light leading-none block"
              aria-label={`${hours} hours`}
            >
              {hours}
            </time>
          </div>
          <span
            className="text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[7rem] text-white/50 leading-none"
            aria-hidden="true"
          >
            :
          </span>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 md:px-8 md:py-6">
            <time
              dateTime={`${hours}:${minutes}:${seconds}`}
              className="text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[7rem] text-white font-light leading-none block"
              aria-label={`${minutes} minutes`}
            >
              {minutes}
            </time>
          </div>
        </div>

        {/* Seconds/AMPM - Positioned to the right */}
        {(showSeconds || (timeFormat === '12h' && ampm)) && (
          <div className="absolute left-full ml-4 md:ml-6 flex flex-col items-start justify-center gap-2 h-full">
            {showSeconds && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 md:px-6 md:py-4">
                <time
                  dateTime={`${hours}:${minutes}:${seconds}`}
                  className="text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] text-white/70 font-light leading-none block font-mono"
                  aria-label={`${seconds} seconds`}
                >
                  {seconds}
                </time>
              </div>
            )}
            {timeFormat === '12h' && ampm && (
              <span className="text-white/60 text-sm md:text-base font-medium tracking-wider">
                {ampm}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );

  switch (clockType) {
    case 'minimal':
      return renderMinimal();
    case 'modern':
      return renderModern();
    case 'digital':
    default:
      return renderDigital();
  }
};

export default Clock;
