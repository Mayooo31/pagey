import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
import supabase from "../supabase";
import { StateType } from "../types";
import { getContrastYIQ } from "../utils/fontContrast";
import PulseLoader from "react-spinners/PulseLoader";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fontColor, setFontColor] = useState("white");
  const [pageData, setPageData] = useState<StateType | undefined>(null!);
  const { id } = useParams();

  useEffect(() => {
    if (pageData) {
      setFontColor(getContrastYIQ(pageData.themeColor));
    }
  }, [pageData]);

  useEffect(() => {
    const loadPageData = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("pages").select().eq("domain", id);
      setLoading(false);
      if (data) {
        setPageData(data[0]);
        return;
      } else {
        setPageData(undefined);
      }
    };

    loadPageData();
  }, []);

  if (pageData) {
    return (
      <div
        style={{ background: pageData && pageData.themeBackground, color: fontColor }}
        className="flex justify-center items-center h-screen"
      >
        <div
          style={{
            background: pageData && pageData.themeColor,
            borderRadius: pageData && pageData.type === "sharp" ? "5px" : "3rem",
          }}
          className="w-[90%] h-[90%] ss:max-w-[620px] flex flex-col gap-4 ss:gap-6 items-center p-4 pb-8 overflow-y-auto scrollbar"
        >
          <div className="w-32 h-32 ss:w-36 ss:h-36">
            <img
              style={{ borderColor: pageData && pageData.themeBackground }}
              className="h-full w-full object-cover rounded-full border-4 border-solid text-center"
              src={
                pageData && pageData.image
                  ? pageData && pageData.image
                  : "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
              }
              alt="Profile picture"
            />
          </div>
          <h1 className="text-4xl ss:text-5xl font-semibold text-center">
            {pageData && pageData.title ? pageData && pageData.title : "Your name"}
          </h1>
          <p className="text-xl ss:text-2xl text-center">
            {pageData && pageData.description
              ? pageData && pageData.description
              : "Some description"}
          </p>
          <span
            style={{ borderColor: pageData && pageData.themeBackground }}
            className="border-2 border-solid w-full"
          ></span>
          {pageData &&
            pageData.links.map(link => (
              <a
                key={link.id}
                className="text-xl ss:text-2xl hover:underline"
                href={link.url}
                target="_blank"
              >
                {link.name ? link.name : "Link"}
              </a>
            ))}
        </div>
      </div>
    );
  } else if (loading) {
    return (
      <div className="z-50 flex items-center justify-center h-screen w-full">
        <PulseLoader color={"#38618c"} loading={loading} size={20} />
      </div>
    );
  } else if (pageData === undefined) {
    return <NotFound />;
  } else {
    return <></>;
  }
};

export default Page;
