import React from "react";

import Img1 from "../../assets/places/Buanderie.jpg";
import Img2 from "../../assets/places/Buanderie2.jpg";
import Img3 from "../../assets/places/Buanderie3.jpg";
import { BuanderieCard } from "./BuanderieCard";

const BlogsData = [
  {
    id: 1,
    image: Img1,
    title: "Lubumbashi",
    description:
      "Votre linge mérite le meilleur : choisissez notre buanderie ! ",
    author: "Agent",
    date: "June 22, 2024",
  },
  {
    id: 1,
    image: Img2,
    title: "Lubumbashi",
    description:
      "Laissez notre buanderie prendre soin de vos vêtements ! Avec des machines modernes, un espace bien organisé et une propreté impeccable, nous rendons le lavage du linge plus facile que jamais. Venez découvrir la fraîcheur et la commodité dans notre buanderie !",
    author: "Agent",
    date: "June 22, 2024",
  },
  {
    id: 1,
    image: Img3,
    title: "Lubumbashi",
    description: "Buanderie impeccable, vêtements impeccables !",
    author: "Agent",
    date: "June 22, 2024",
  },
];
export const Buanderie = () => {
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white py-10">
        <section data-aos="fade-up" className="container ">
          <h1 className=" my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
            Activités recentes
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {BlogsData.map((item) => (
              <BuanderieCard key={item.id} {...item} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
