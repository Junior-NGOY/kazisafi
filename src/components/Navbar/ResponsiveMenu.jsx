import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import PropTypes from 'prop-types';

const ResponsiveMenu = ({ showMenu, setShowMenu, navLinks, onQuoteClick, onContactClick }) => {
  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-[9999] flex h-screen w-[85%] max-w-sm flex-col bg-white/95 backdrop-blur-md px-8 pb-6 pt-16 text-black transition-all duration-300 md:hidden shadow-2xl`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <div>
            <h1 className="font-bold text-lg">KAZISAFI</h1>
            <p className="text-sm text-gray-600">Services Professionnels</p>
          </div>
        </div>
        <button
          onClick={() => setShowMenu(false)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <FaTimes className="text-xl text-gray-600" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.link}
                onClick={() => setShowMenu(false)}
                className="flex items-center p-4 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium"
              >
                <span className="text-lg">{link.name}</span>
                <svg className="w-5 h-5 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>

        {/* Services spécialisés */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Services Spécialisés
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Nettoyage', category: 'nettoyage' },
              { name: 'Fumigation', category: 'fumigation' },
              { name: 'Buanderie', category: 'buanderie' },
              { name: 'Piscine', category: 'entretien-piscine' }
            ].map((service, index) => (
              <Link
                key={index}
                to={`/services?category=${service.category}`}
                onClick={() => setShowMenu(false)}
                className="p-3 bg-gray-50 rounded-lg text-center text-sm font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
              >
                {service.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          {/* Contact Button */}
          <button
            onClick={() => {
              onContactClick && onContactClick();
              setShowMenu(false);
            }}
            className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Nous Contacter
          </button>
          
          {/* Quote Button */}
          <button
            onClick={() => {
              onQuoteClick();
              setShowMenu(false);
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Devis Gratuit
          </button>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-6">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            📞 +243 811 632 595
          </p>
          <p className="text-sm text-gray-600 mt-1">
            ✉️ contact@kazisafi.com
          </p>
          <p className="text-xs text-gray-500 mt-4">
            Développé avec ❤️ par{" "}
            <a href="https://www.kazisafi.net/" className="text-blue-600 font-medium">
              PowerSoft
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

ResponsiveMenu.propTypes = {
  showMenu: PropTypes.bool.isRequired,
  setShowMenu: PropTypes.func.isRequired,
  navLinks: PropTypes.array.isRequired,
  onQuoteClick: PropTypes.func.isRequired,
  onContactClick: PropTypes.func
};

export default ResponsiveMenu;
