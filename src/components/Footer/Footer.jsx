import { useEffect } from "react";
import FooterLogo from "../../assets/logo2.jpeg";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
  FaEnvelope,
  FaClock,
  FaPhone,
  FaMapMarkerAlt,
  FaChevronRight,
  FaShieldAlt,
  FaLeaf,
  FaUsers
} from "react-icons/fa";
import { MdCleaningServices } from "react-icons/md";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const FooterLinks = [
  {
    title: "Accueil",
    link: "/",
  },
  {
    title: "À propos",
    link: "/about",
  },
  {
    title: "Services",
    link: "/services",
  },
  {
    title: "Projets",
    link: "/projects",
  },
  {
    title: "Blog",
    link: "/blogs",
  },
];

const ServiceLinks = [
  {
    title: "Nettoyage Professionnel",
    link: "/services?category=nettoyage",
  },
  {
    title: "Fumigation & Désinsectisation",
    link: "/services?category=fumigation",
  },
  {
    title: "Services de Buanderie",
    link: "/services?category=buanderie",
  },
  {
    title: "Entretien Piscine",
    link: "/services?category=entretien-piscine",
  },
  {
    title: "Jardinage & Espaces Verts",
    link: "/services?category=jardinage",
  },
];

const ContactInfo = [
  {
    icon: <FaMapMarkerAlt className="text-blue-400" />,
    title: "Adresse",
    content: "57, Av. Mwepu, Q/Makutano, C/Lubumbashi",
  },
  {
    icon: <FaPhone className="text-green-400" />,
    title: "Téléphone",
    content: "+243 811 632 595",
  },
  {
    icon: <FaEnvelope className="text-purple-400" />,
    title: "Email",
    content: "davidshakala@gmail.com",
  },
];

const WorkingHours = [
  {
    day: "Lundi - Vendredi",
    hours: "07:30 - 16:30",
  },
  {
    day: "Samedi & Dimanche",
    hours: "07:30 - 12:30",
  },
  {
    day: "Jours fériés",
    hours: "07:30 - 12:30",
  },
];

const Footer = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50
    });
  }, []);

  return (
    <>
      <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="relative container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            
            {/* Company Info */}
            <div className="lg:col-span-1" data-aos="fade-up" data-aos-delay={100}>
              <div className="mb-8">
                <Link to="/" className="flex items-center gap-3 mb-6">
                  <img 
                    src={FooterLogo} 
                    alt="Kazisafi Logo" 
                    className="h-12 w-12 rounded-full shadow-lg"
                  />
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      KAZISAFI
                    </h2>
                    <p className="text-gray-300 text-sm">Services Professionnels</p>
                  </div>
                </Link>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  Votre partenaire de confiance pour des services de nettoyage professionnel 
                  depuis 2018. Excellence, fiabilité et respect de l&apos;environnement.
                </p>

                {/* Key Features */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="text-blue-400 text-sm" />
                    <span className="text-xs text-gray-300">Qualité Garantie</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaLeaf className="text-green-400 text-sm" />
                    <span className="text-xs text-gray-300">Éco-responsable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-purple-400 text-sm" />
                    <span className="text-xs text-gray-300">Équipe Expert</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdCleaningServices className="text-orange-400 text-sm" />
                    <span className="text-xs text-gray-300">Service 24/7</span>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
                  <div className="flex gap-3">
                    <a 
                      href="https://web.facebook.com/profile.php?id=61559849801771" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    >
                      <FaFacebook className="text-white" />
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    >
                      <FaInstagram className="text-white" />
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-blue-800 hover:bg-blue-900 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    >
                      <FaLinkedin className="text-white" />
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    >
                      <FaTwitter className="text-white" />
                    </a>
                    <a 
                      href="https://wa.me/243811632595" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    >
                      <FaWhatsapp className="text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div data-aos="fade-up" data-aos-delay={200}>
              <h3 className="text-xl font-bold mb-6 text-blue-400">Navigation</h3>
              <ul className="space-y-3">
                {FooterLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.link}
                      onClick={() => window.scrollTo(0, 0)}
                      className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-all duration-300 group"
                    >
                      <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="hover:underline">{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <div className="mt-8">
                <Link
                  to="/services"
                  className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Découvrir nos services
                </Link>
              </div>
            </div>

            {/* Services */}
            <div data-aos="fade-up" data-aos-delay={300}>
              <h3 className="text-xl font-bold mb-6 text-purple-400">Nos Services</h3>
              <ul className="space-y-3">
                {ServiceLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.link}
                      className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-all duration-300 group"
                    >
                      <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="hover:underline text-sm">{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Working Hours */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaClock className="text-orange-400" />
                  Horaires de Service
                </h4>
                <div className="space-y-2">
                  {WorkingHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">{schedule.day}</span>
                      <span className="text-orange-400 font-medium">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div data-aos="fade-up" data-aos-delay={400}>
              <h3 className="text-xl font-bold mb-6 text-green-400">Contact</h3>
              <div className="space-y-4">
                {ContactInfo.map((contact, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                      {contact.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-200">{contact.title}</h4>
                      <p className="text-gray-300 text-sm">{contact.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Emergency Contact */}
              <div className="mt-8 p-4 bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg border border-red-800/50">
                <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                  <FaPhone className="animate-pulse" />
                  Service d&apos;Urgence
                </h4>
                <p className="text-gray-300 text-sm mb-2">
                  Disponible 24h/24 pour vos urgences de nettoyage
                </p>
                <a 
                  href="tel:+243811632595"
                  className="text-orange-400 font-bold hover:text-orange-300 transition-colors duration-300"
                >
                  +243 811 632 595
                </a>
              </div>

              {/* Newsletter */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Recevez nos dernières actualités et offres spéciales
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                  />
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300">
                    <FaEnvelope />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-gray-300 text-sm">
                  © 2024 <span className="font-semibold text-blue-400">KAZISAFI SARL</span>. 
                  Tous droits réservés.
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Conçu avec ❤️ par{" "}
                  <a 
                    href="https://www.kazisafi.net/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300"
                  >
                    PowerSoft
                  </a>
                </p>
              </div>
              
              <div className="flex gap-6 text-sm">
                <Link 
                  to="/privacy" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Politique de confidentialité
                </Link>
                <Link 
                  to="/terms" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Conditions d&apos;utilisation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
