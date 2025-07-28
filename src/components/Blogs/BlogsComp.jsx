import React from "react";
import BlogCard from "./BlogCard";
import Img1 from "../../assets/places/recente.jpeg";
import Img2 from "../../assets/places/recente2.jpeg";
import Img3 from "../../assets/places/recente3.jpeg";

const BlogsData = [
  {
    id: 1,
    image: Img1,
    title: "MAAMOA SARL",
    description:
      "Notre nettoyage se produit dans de nombreux contextes différents et utilise de nombreuses méthodes différentes. Voici quelques-unes des méthodes couramment utilisées pour le nettoyage ",
    author: "Agent",
    date: "April 22, 2024",
  },
  {
    id: 1,
    image: Img2,
    title: "MAAMOA SARL",
    description:
      "Nettoyage généralement réalisé avec de l’eau et souvent un savon ou un détergent par nos agents bien formés",
    author: "Agent",
    date: "April 22, 2024",
  },
  {
    id: 1,
    image: Img3,
    title: "MAAMOA SARL",
    description:
      "Le nettoyage est le processus d’élimination des substances indésirables, telles que la saleté, les agents infectieux et autres impuretés, d’un objet ou d’un environnement",
    author: "Agent",
    date: "April 22, 2024",
  },
];

const BlogsComp = () => {
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white py-10">
        <section data-aos="fade-up" className="container ">
          <h1 className=" my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
            Activités recentes
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {BlogsData.map((item) => (
              <BlogCard key={item.id} {...item} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogsComp;
