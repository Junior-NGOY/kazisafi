//import React from "react";

const Location = () => {
  return (
    <>
      <span id="location"></span>
      <section data-aos="fade-up" className="">
        <div className="container my-4">
          <h1 className="inline-block border-l-8 border-primary/50 py-2 pl-2 mb-4 text-xl font-bold sm:text-3xl">
            Localisation
          </h1>

          <div className="rounded-xl ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d31261.16174580479!2d27.458742854896265!3d-11.648610535556784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e2!4m3!3m2!1d-11.63264!2d27.4726912!4m5!1s0x19723ec141bb210f%3A0x9602c2c107ff5cda!2s57%20Av.%20Mwepu%2C%20Lubumbashi!3m2!1d-11.6646666!2d27.4834669!5e0!3m2!1sfr!2scd!4v1717693337357!5m2!1sfr!2scd"
              width="100%"
              height="360"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              style={{ borderRadius: "20px" }}
            ></iframe>

            {/*   <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7116.040113933064!2d83.97168138953894!3d26.90285855661167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39938d631905f7c1%3A0x189dbadf0b42da46!2sNew%20Mobile%20World!5e0!3m2!1sen!2sin!4v1700902186385!5m2!1sen!2sin"
              width="100%"
              height="360"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              style={{ borderRadius: "20px" }}
            ></iframe> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Location;
