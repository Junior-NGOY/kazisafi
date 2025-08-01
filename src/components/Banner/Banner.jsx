import React from "react";
import Img from "../../assets/logo1.jpeg";
import { MdFlight, MdOutlineLocalHotel } from "react-icons/md";
import { IoIosWifi } from "react-icons/io";
import { IoFastFoodSharp } from "react-icons/io5";
import { GiVacuumCleaner } from "react-icons/gi";
import { GiGardeningShears } from "react-icons/gi";

const Banner = () => {
  return (
    <>
      <div className="min-h-[550px] bg-gray-100">
        <div className="min-h-[550px] flex justify-center items-center backdrop-blur-xl py-12 sm:py-0 ">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Image section */}
              <div data-aos="flip-up">
                <img
                  src={Img}
                  alt="biryani img"
                  className="max-w-[450px] h-[350px] w-full mx-auto drop-shadow-[5px_5px_12px_rgba(0,0,0,0.7)] object-cover"
                />
              </div>
              {/* text content section */}
              <div className="flex flex-col justify-center gap-6 sm:pt-0 lg:px-16">
                <h1
                  data-aos="fade-up"
                  className="text-3xl sm:text-4xl font-bold"
                >
                  Rendez votre environnement propre avec nous.
                </h1>
                <p
                  data-aos="fade-up"
                  className="text-sm text-gray-500 tracking-wide leading-8"
                >
                  Vous gagnez du temps et bénéficiez d’un service de nettoyage
                  professionnel de qualité. Vous garantissez des conditions de
                  travail optimales aux salariés de votre entreprise tout en
                  améliorant votre image lors de l'accueil de vos clients.
                  <br />
                </p>
                <div data-aos="zoom-in" className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <GiVacuumCleaner className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-violet-100 dark:bg-violet-400" />
                      <p>Nettoyage</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <GiGardeningShears className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-orange-100 dark:bg-orange-400" />
                      <p>Jardinage</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <IoIosWifi className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-green-100 dark:bg-green-400" />
                      <p>Fumigation</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <IoFastFoodSharp className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-yellow-100 dark:bg-yellow-400" />
                      <p>Evacuation d'immondices</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
