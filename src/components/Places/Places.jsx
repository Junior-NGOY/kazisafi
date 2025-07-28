import React from "react";
import PlaceCard from "./PlaceCard";
import Img1 from "../../assets/places/cleaning.jpeg";
import Img2 from "../../assets/places/cleaning2.jpeg";
import Img3 from "../../assets/places/cleaning3.jpeg";
import Img4 from "../../assets/places/Outside.jpeg";
import Img5 from "../../assets/places/outside2.jpeg";
import Img6 from "../../assets/places/outside3.jpeg";
import Img7 from "../../assets/places/piscine.jpeg";
import Img8 from "../../assets/places/cuisine.jpeg";
import Img9 from "../../assets/places/fumigation.jpeg";

const PlacesData = [
  {
    img: Img1,
    title: "MAAMOA SARL",
    location: "Lubumbashi",
    description: "Service de qualité rendu à la société MAAMOA SARL.",
    price: "",
    type: "Nettoyage",
  },
  {
    img: Img2,
    title: "MAAMOA SARL",
    location: "Lubumbashi",
    description:
      "Service de nettoyage et entretien de qualité rendu à la société MAAMOA.",
    price: "",
    type: "Nettoyage et entretien",
  },
  {
    img: Img3,
    title: "MAAMOA SARL",
    location: "Lubumbashi",
    description: "Service de nettoyage rendu à la société MAAMOA.",
    price: "",
    type: "Nettoyage avec savon et détergent.",
  },
  {
    img: Img4,
    title: "Steak House",
    location: "Lubumbashi",
    description:
      "Service de nettoyage exterieur rendu à la société Steak House.",
    price: "",
    type: "Nettoyage",
  },
  {
    img: Img5,
    title: "Steak House",
    location: "Lubumbashi",
    description: "En pleine activité de nettoyage.",
    price: "",
    type: "Nettoyage",
  },
  {
    img: Img6,
    title: "Steak House",
    location: "Lubumbashi",
    description: "Nettoyage.",
    price: "",
    type: "Nettoyage",
  },
  {
    img: Img7,
    title: "Steak House",
    location: "Lubumbashi",
    description: "Service de nettoyage de piscine.",
    price: "",
    type: "Nettoyage Piscine",
  },
  {
    img: Img8,
    title: "Steak House",
    location: "Lubumbashi",
    description: "En pleine activité de nettoyage de cuisine.",
    price: "",
    type: "Nettoyage",
  },
  {
    img: Img9,
    title: "Steak House",
    location: "Lubumbashi",
    description: "Fumigation désinsectisation avec la fumée.",
    price: "",
    type: "Fumigation",
  },
];

const Places = ({ handleOrderPopup }) => {
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
        <section data-aos="fade-up" className="container ">
          <h1 className=" my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
            Nos réalisations
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PlacesData.map((item, index) => (
              <PlaceCard
                handleOrderPopup={handleOrderPopup}
                key={index}
                {...item}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Places;
