import React from "react";
import Slider from "react-slick";
import client from "../../assets/temoignages/the farmas market.png";
import client2 from "../../assets/temoignages/Sparkle laudry matt.png";
import client3 from "../../assets/temoignages/Sans titre-1.png";
import client4 from "../../assets/temoignages/maamoa png.png";
import client5 from "../../assets/temoignages/Beplia Salon.png";

const testimonialData = [
  {
    id: 1,
    name: "Samuel",
    text: "J’ai fait appel aux services de nettoyage de l’entreprise KAZISAFI et je suis extrêmement satisfaite. Leur équipe est professionnelle, ponctuelle et efficace. Mon bureau n’a jamais été aussi propre ! Je recommande vivement leurs services à tous ceux qui cherchent une entreprise de nettoyage fiable et de qualité.",
    img: client,
  },
  {
    id: 2,
    name: "John Doe",
    text: "“Je suis extrêmement satisfait du service d’évacuation d’immondices fourni par l’entreprise KAZISAFI. Leur équipe est ponctuelle, professionnelle et efficace. Ils ont résolu nos problèmes de déchets de manière rapide et respectueuse de l’environnement. Je recommande vivement leurs services à tous ceux qui cherchent une solution fiable pour la gestion des déchets.”",
    img: client2,
  },
  /*  {
    id: 3,
    name: "Smith",
    text: "“ Notre collaboration avec KAZISAFI  a été exceptionnelle. Leur équipe est professionnelle, réactive et efficace. Ils ont su maintenir nos locaux impeccables, que ce soit pour le nettoyage quotidien, le lavage des vitres ou le traitement des sols. Nous recommandons vivement leurs services à toute entreprise cherchant une solution de nettoyage fiable et de haute qualité.”",
    img: client3,
  }, */
  /*  {
    id: 4,
    name: "Smith",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: client5,
  }, */
  {
    id: 5,
    name: "Smith",
    text: "“ Notre collaboration avec KAZISAFI  a été exceptionnelle. Leur équipe est professionnelle, réactive et efficace. Ils ont su maintenir nos locaux impeccables, que ce soit pour le nettoyage quotidien, le lavage des vitres ou le traitement des sols. Nous recommandons vivement leurs services à toute entreprise cherchant une solution de nettoyage fiable et de haute qualité.”",
    img: client5,
  },
];

const Testimonial = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div data-aos="fade-up" data-aos-duration="300" className="py-10">
        <div className="container">
          {/* Header section */}
          <div className="text-center mb-20 max-w-[400px] mx-auto">
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Témoignages
            </p>
            <h1 className="text-3xl font-bold">Témoignages</h1>
            <p className="text-xs text-gray-400">
              {" "}
              Voici quelques Témoignages recueillis auprès de nos clients
              satisfaits.
            </p>
          </div>
          {/* testimonial section */}
          <div
            data-aos="zoom-in"
            data-aos-duration="300"
            className="grid grid-cols-1 max-w-[800px] mx-auto gap-6"
          >
            <Slider {...settings}>
              {testimonialData.map(({ id, name, text, img }) => {
                return (
                  <div key={id} className="my-6">
                    <div className="flex flex-col justify-center items-center gap-4 text-center shadow-lg p-4 mx-4 rounded-xl dark:bg-gray-800 bg-primary/10 relative">
                      <img
                        src={img}
                        alt=""
                        className="rounded-full block mx-auto"
                      />
                      <h1 className="text-xl font-bold">{name}</h1>
                      <p className="text-gray-500 text-sm">
                        {text.slice(0, 90)} ...
                      </p>
                      <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">
                        ,,
                      </p>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
