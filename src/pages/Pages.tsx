import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCtx } from "../context/context";
import { UserPageType } from "../types";
import supabase from "../supabase";
import PulseLoader from "react-spinners/PulseLoader";

import Navbar from "../components/Navbar";
import OnePage from "../components/OnePage";

const Pages = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { loggedUser } = useCtx();
  const navigate = useNavigate();
  const [userPagesData, setUserPagesData] = useState<UserPageType[] | undefined>([]);

  const loadUserPages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("pages")
      .select()
      .eq("user_id", loggedUser?.id);
    setLoading(false);

    if (data && data?.length > 0) {
      setUserPagesData(data);
    } else {
      setUserPagesData(undefined);
    }
  };

  useEffect(() => {
    if (!loggedUser) {
      navigate("/");
    } else {
      loadUserPages();
    }
  }, []);

  return (
    <>
      <Navbar />
      {loading && (
        <div className="z-50 flex items-center justify-center mt-32">
          <PulseLoader color={"#38618c"} loading={loading} size={20} />
        </div>
      )}
      <div className="w-[90%] max-w-[1200px] mx-auto grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 xs:gap-8 py-10">
        {userPagesData &&
          userPagesData.map(page => (
            <OnePage loadUserPages={loadUserPages} data={page} key={page.created_at} />
          ))}
      </div>
      {userPagesData === undefined && (
        <h1 className="text-2xl px-2 text-center font-semibold sm:text-4xl">
          No pages. Create one! 😎
        </h1>
      )}
    </>
  );
};

export default Pages;
