import { useEffect } from "react";
import Location from "../components/Location/Location";
import { FaUsers, FaAward, FaHandshake } from "react-icons/fa";
import { MdCleaningServices, MdSecurity, MdEco, MdGroups } from "react-icons/md";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  const stats = [
    { icon: <FaUsers className="text-4xl" />, number: "500+", label: "Clients Satisfaits" },
    { icon: <MdCleaningServices className="text-4xl" />, number: "6", label: "Années d'Expérience" },
    { icon: <FaAward className="text-4xl" />, number: "100%", label: "Qualité Garantie" },
    { icon: <MdGroups className="text-4xl" />, number: "25+", label: "Employés Qualifiés" }
  ];

  const values = [
    {
      icon: <MdCleaningServices className="text-3xl text-blue-600" />,
      title: "Excellence",
      description: "Nous nous engageons à fournir des services de la plus haute qualité, en dépassant constamment les attentes de nos clients."
    },
    {
      icon: <MdSecurity className="text-3xl text-green-600" />,
      title: "Fiabilité",
      description: "Notre équipe professionnelle garantit un service ponctuel et fiable, respectant tous nos engagements contractuels."
    },
    {
      icon: <MdEco className="text-3xl text-purple-600" />,
      title: "Écologie",
      description: "Nous utilisons des produits respectueux de l'environnement et appliquons les normes ISO 14000 pour la gestion des déchets."
    },
    {
      icon: <FaHandshake className="text-3xl text-orange-600" />,
      title: "Intégrité",
      description: "Nous bâtissons des relations durables basées sur la confiance, la transparence et le respect mutuel."
    }
  ];

  const timeline = [
    {
      year: "2018",
      title: "Création de KAZI SAFI",
      description: "Fondation de l'entreprise à Lubumbashi avec une vision claire de servir la communauté."
    },
    {
      year: "2019",
      title: "Expansion des Services",
      description: "Ajout des services de fumigation et d'entretien de piscines à notre offre."
    },
    {
      year: "2020",
      title: "Certification Qualité",
      description: "Obtention des certifications nécessaires et mise en place des normes ISO."
    },
    {
      year: "2021",
      title: "Croissance de l'Équipe",
      description: "Recrutement d'agents spécialisés et formation continue de notre personnel."
    },
    {
      year: "2024",
      title: "Innovation Numérique",
      description: "Lancement de notre plateforme en ligne pour faciliter l'accès à nos services."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 transform -skew-y-1"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              À Propos de KAZISAFI
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
              Votre partenaire de confiance pour des services de nettoyage professionnel depuis 2018
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium">
                🏢 Services Professionnels
              </span>
              <span className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium">
                🌿 Éco-responsable
              </span>
              <span className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium">
                ⭐ Qualité Garantie
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex justify-center mb-4 text-blue-600 group-hover:text-purple-600 transition-colors duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-bold text-gray-800 mb-8">
                Notre Histoire
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  L&apos;entreprise <span className="font-semibold text-blue-600">KAZI SAFI SARL</span> a le réel plaisir de porter à votre 
                  connaissance les services mis à votre disposition. En effet, l&apos;entreprise KAZI SAFI SARL est une 
                  structure privée très bien organisée dans le processus de nettoyage professionnel.
                </p>
                <p>
                  Depuis 2018, nous sommes opérationnels de manière permanente dans la ville de Lubumbashi 
                  au service de la population. Notre entreprise regorge en son sein des agents spécialisés 
                  et qualifiés dans les différents services que nous proposons.
                </p>
                <p>
                  Nous travaillons selon les clauses contractuelles strictes et respectons les normes 
                  internationales de qualité et de gestion environnementale (ISO 14000).
                </p>
              </div>
            </div>
            
            <div className="relative" data-aos="fade-left">
              <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
                <div className="h-full flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-4">Notre Mission</h3>
                  <p className="text-blue-100 mb-6">
                    Fournir des services de nettoyage et d&apos;entretien de qualité supérieure, 
                    en contribuant à un environnement sain et propre pour tous.
                  </p>
                  <h3 className="text-2xl font-bold mb-4">Notre Vision</h3>
                  <p className="text-blue-100">
                    Atteindre la plus grande couche de la population congolaise, katangaise 
                    et lushoise en particulier dans nos différents services.
                  </p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident notre action quotidienne et façonnent notre culture d&apos;entreprise
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <div className="flex justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Notre Parcours
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les étapes clés de notre évolution depuis notre création
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full hidden lg:block"></div>
              
              {timeline.map((item, index) => (
                <div 
                  key={index} 
                  className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
                  data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
                  data-aos-delay={index * 200}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white shadow-lg hidden lg:block z-10"></div>
                  
                  {/* Content */}
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à Découvrir Nos Services ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd&apos;hui pour un devis personnalisé et découvrez pourquoi 
            des centaines de clients nous font confiance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/services"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
            >
              <span>Nos Services</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link 
              to="/#devis"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 inline-block text-center"
            >
              Devis Gratuit
            </Link>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Notre Équipe d&apos;Experts
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des professionnels qualifiés et expérimentés au service de votre satisfaction
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Expert 1 */}
            <div 
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <MdCleaningServices className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Équipe Nettoyage
              </h3>
              <p className="text-blue-600 font-semibold mb-4">
                Spécialistes en Propreté
              </p>
              <p className="text-gray-600 leading-relaxed">
                Nos experts en nettoyage maîtrisent les techniques les plus avancées pour 
                garantir un environnement impeccable dans tous types d&apos;espaces.
              </p>
            </div>

            {/* Expert 2 */}
            <div 
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <MdSecurity className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Équipe Fumigation
              </h3>
              <p className="text-green-600 font-semibold mb-4">
                Experts en Désinsectisation
              </p>
              <p className="text-gray-600 leading-relaxed">
                Spécialisés dans la fumigation et la désinsectisation, nos techniciens 
                utilisent des méthodes sécurisées et efficaces.
              </p>
            </div>

            {/* Expert 3 */}
            <div 
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
              data-aos="fade-up"
              data-aos-delay={300}
            >
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <MdEco className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Équipe Jardinage
              </h3>
              <p className="text-purple-600 font-semibold mb-4">
                Spécialistes Espaces Verts
              </p>
              <p className="text-gray-600 leading-relaxed">
                Nos jardiniers professionnels créent et entretiennent vos espaces verts 
                avec passion et expertise technique.
              </p>
            </div>
          </div>

          {/* Team Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8" data-aos="fade-up">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600">Employés Qualifiés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">6</div>
              <div className="text-gray-600">Années d&apos;Expérience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Formation Continue</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-gray-600">Projets Réalisés</div>
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-16 text-center" data-aos="fade-up" data-aos-delay={200}>
            <h3 className="text-2xl font-bold text-gray-800 mb-8">
              Nos Certifications & Formations
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-6 py-3 bg-blue-100 text-blue-800 rounded-full font-medium">
                🏆 ISO 14000 - Gestion Environnementale
              </span>
              <span className="px-6 py-3 bg-green-100 text-green-800 rounded-full font-medium">
                🧪 Certifié Produits Chimiques
              </span>
              <span className="px-6 py-3 bg-purple-100 text-purple-800 rounded-full font-medium">
                🌿 Formation Éco-responsable
              </span>
              <span className="px-6 py-3 bg-orange-100 text-orange-800 rounded-full font-medium">
                🔧 Équipements Professionnels
              </span>
            </div>
          </div>
        </div>
      </div>

      <Location />
    </>
  );
};

export default About;
