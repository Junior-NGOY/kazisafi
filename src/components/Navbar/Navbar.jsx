import { useState } from "react";
import Logo1 from "../../assets/logo2.jpeg";
import PropTypes from 'prop-types';
import { NavLink, Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import ResponsiveMenu from "./ResponsiveMenu";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";

const DropdownLinks = [
  {
    name: "Nettoyage",
    link: "/services?category=nettoyage",
  },
  {
    name: "Fumigation",
    link: "/services?category=fumigation",
  },
  {
    name: "Buanderie",
    link: "/services?category=buanderie",
  },
  {
    name: "Evacuation d'immondices",
    link: "/services?category=evacuation",
  },
  {
    name: "Entretien piscine",
    link: "/services?category=entretien-piscine",
  },
  {
    name: "Jardinage",
    link: "/services?category=jardinage",
  },
  {
    name: "Désinsectisation à eau",
    link: "/services?category=desinsectisation",
  },
  {
    name: "Débouchage fosse sceptique",
    link: "/services?category=debouchage",
  },
];

const Navbar = ({ handleOrderPopup, handleContactClick, handleQuoteClick }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleQuoteClickInternal = () => {
    if (handleQuoteClick) {
      handleQuoteClick();
    } else {
      handleOrderPopup();
    }
  };

  const handleContactClickInternal = () => {
    if (handleContactClick) {
      handleContactClick();
    }
  };

  const navLinks = [
    { name: "Accueil", link: "/" },
    { name: "Services", link: "/services" },
    { name: "Galerie", link: "/gallery" },
    { name: "Projets", link: "/projects" },
    { name: "Blog", link: "/blogs" },
    { name: "À propos", link: "/about" },
  ];
  return (
    <>
      <nav className="fixed top-0 right-0 w-full z-50 bg-white/95 backdrop-blur-md text-black shadow-lg transition-all duration-300">
        {/* Top bar */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container py-2 sm:block hidden">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                🌟 Services professionnels de qualité supérieure
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-sm">📞 +243 811 632 595</span>
                <span className="text-sm">✉️ davidshakala@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="container py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-4 font-bold text-2xl">
              <Link 
                to="/" 
                onClick={() => window.scrollTo(0, 0)}
                className="flex items-center gap-3 hover:scale-105 transition-transform duration-300"
              >
                <img src={Logo1} alt="Kazisafi" className="h-12 w-12 rounded-full shadow-lg" />
                <span className="hidden sm:block text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  KAZISAFI
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {navLinks.map((link, index) => (
                  <li key={index} className="relative group">
                    <NavLink 
                      to={link.link}
                      className={({ isActive }) =>
                        `py-2 px-1 font-medium transition-all duration-300 hover:text-blue-600 relative ${
                          isActive ? 'text-blue-600' : 'text-gray-700'
                        }`
                      }
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  </li>
                ))}
                
                {/* Services Dropdown */}
                <li className="group relative cursor-pointer">
                  <div className="flex items-center gap-1 py-2 px-1 font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300">
                    Spécialités
                    <FaCaretDown className="transition-all duration-300 group-hover:rotate-180" />
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="w-64 bg-white rounded-xl shadow-2xl border border-gray-100 p-4">
                      <div className="grid grid-cols-1 gap-2">
                        {DropdownLinks.map((data, index) => (
                          <Link
                            key={index}
                            to={data.link}
                            className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group/item"
                          >
                            <span className="text-2xl mr-3">🧹</span>
                            <span className="font-medium">{data.name}</span>
                            <svg className="w-4 h-4 ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              {/* Contact Button */}
              <button
                onClick={handleContactClickInternal}
                className="hidden md:block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
              >
                Contact
              </button>
              
              {/* Main CTA Button */}
              <button
                onClick={handleQuoteClickInternal}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="hidden sm:inline">Devis Gratuit</span>
                <span className="sm:hidden">Devis</span>
              </button>

              {/* Mobile Hamburger */}
              <div className="lg:hidden">
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  {showMenu ? (
                    <HiMenuAlt1 className="text-2xl text-gray-700" />
                  ) : (
                    <HiMenuAlt3 className="text-2xl text-gray-700" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <ResponsiveMenu 
          setShowMenu={setShowMenu} 
          showMenu={showMenu} 
          navLinks={navLinks}
          onQuoteClick={handleQuoteClickInternal}
          onContactClick={handleContactClickInternal}
        />
      </nav>
    </>
  );
};

Navbar.propTypes = {
  handleOrderPopup: PropTypes.func.isRequired,
  handleContactClick: PropTypes.func,
  handleQuoteClick: PropTypes.func
};

export default Navbar;
