import supabase from "../supabase";

import Navbar from "../components/Navbar";
import Domain from "../components/Domain";
import Heading from "../components/Heading";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="w-[95%] xs:w-[90%] h-[calc(100vh-68px)] ss:h-[calc(100vh-72px)] flex flex-col justify-center mx-auto pb-28">
        <Heading />
        <Domain />
      </div>
    </>
  );
};

export default Home;
