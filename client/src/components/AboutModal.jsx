import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';

const AboutModal = ({ isOpen, onClose }) => {
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="about-modal-title"
    >
      <div
        className="bg-[#1f2937] rounded-2xl p-8 w-full max-w-2xl mx-4 border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
        onClick={(e) => e.stopPropagation()}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2
            id="about-modal-title"
            className="text-2xl font-semibold text-white"
          >
            About
          </h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            aria-label="Close about modal"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="space-y-8">
          {/* About the Product Section */}
          <section>
            <h3 className="text-xl font-semibold text-white mb-4">Product</h3>
            <div className="space-y-3 text-white/80 leading-relaxed">
              <p>
                "My Extra Screen" transforms your extra monitor into a
                beautiful, ambient workspace companion.
              </p>
              <p>
                Designed for productivity and focus, it provides a
                distraction-free environment with a stunning clock display,
                motivational quotes, and real-time insights.
              </p>
              <p>
                Built with simplicity and elegance in mind, helping you stay
                focused while making your workspace more beautiful.
              </p>
            </div>
          </section>

          {/* About the Developer Section */}
          <section>
            <h3 className="text-xl font-semibold text-white mb-4">Developer</h3>
            <div className="space-y-4">
              <div className="flex flex-row justify-between">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="/profile-circle.webp"
                    alt="Kyyas Ilmyradov"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                  />
                  <p className="text-white/90 font-medium text-lg">
                    {' '}
                    Kyyas Ilmyradov
                  </p>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <a
                    href="https://github.com/kyyasdev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <GitHubIcon />
                    <span className="text-sm">GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kyyasdev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <LinkedInIcon />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                  <a
                    href="https://kyyas.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <LanguageIcon />
                    <span className="text-sm">Portfolio</span>
                  </a>
                </div>
              </div>
              <div className="space-y-2 text-white/80 leading-relaxed">
                <p>
                  A Senior Full-Stack Engineer who decided to build something
                  beautiful instead of just another complex app.
                </p>
                <p>
                  When I'm not wrestling with APIs or debugging at 2 AM, I'm
                  probably thinking about how to make your extra screen less
                  boring.
                </p>
                <p>
                  This project is my way of saying: "Hey, your extra monitor
                  deserves better than just being a Slack notification
                  graveyard."
                </p>
              </div>
            </div>
          </section>

          {/* Funding Section */}
          <section>
            <h3 className="text-xl font-semibold text-white mb-4">Funding</h3>
            <div className="space-y-3 text-white/80 leading-relaxed">
              <p>
                This project is built with passion and zero funding. I'm doing
                this solely to help people make their workspaces more beautiful
                and productive.
              </p>
              {/* <p>
                If you find this useful and want to support the project, you can{' '}
                <span className="text-white font-medium">buy me a coffee</span>{' '}
                to keep me caffeinated while I add more features.
              </p>
              <div className="flex items-center gap-2 mt-4 text-indigo-400">
                <LocalCafeIcon />
                <span className="text-sm italic">
                  (Coffee link coming soon - I'm still deciding between espresso
                  and cold brew)
                </span>
              </div> */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
