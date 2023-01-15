import React from "react";

const Heading = () => {
  return (
    <section className="flex gap-2 sm:gap-5 flex-col justify-center text-center items-center w-[100%] mx-auto">
      <h1 className="text-4xl xs:text-5xl sm:text-7xl font-semibold">
        Create beautiful landing <br className="hidden ss:block" />
        pages in minutes.
      </h1>
      <p className="text-lg xs:text-xl sm:text-3xl max-w-[300px] xs:max-w-[100%]">
        Connect with your audience, capture leads, and export them.
      </p>
    </section>
  );
};

export default Heading;
