import { useEffect, useState } from "react";
import { StateType } from "../types";
import { getContrastYIQ } from "../utils/fontContrast";

import "../index.css";

type Props = {
  state: StateType;
};

const Result = ({ state }: Props) => {
  const [fontColor, setFontColor] = useState("white");

  useEffect(() => {
    setFontColor(getContrastYIQ(state.themeColor));
  }, [state.themeColor]);

  return (
    <div
      style={{ background: state.themeBackground, color: fontColor }}
      className="flex justify-center items-center h-[calc(100vh-68px)] ss:h-[calc(100vh-72px)]"
    >
      <div
        style={{
          background: state.themeColor,
          borderRadius: state.type === "sharp" ? "5px" : "3rem",
        }}
        className="w-[90%] h-[90%] md:ml-[400px] ss:max-w-[620px] flex flex-col gap-4 ss:gap-6 items-center p-4 pb-8 overflow-y-auto scrollbar"
      >
        <div className="w-32 h-32 ss:w-36 ss:h-36">
          <img
            style={{ borderColor: state.themeBackground }}
            className="h-full w-full object-cover rounded-full border-4 border-solid text-center"
            src={
              state.image
                ? state.image
                : "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
            }
            alt="Profile picture"
          />
        </div>
        <h1 className="text-4xl ss:text-5xl font-semibold text-center">
          {state.title ? state.title : "Your name"}
        </h1>
        <p className="text-xl ss:text-2xl text-center">
          {state.description ? state.description : "Some description"}
        </p>
        <span
          style={{ borderColor: state.themeBackground }}
          className="border-2 border-solid w-full"
        ></span>
        {state.links.map(link => (
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
};

export default Result;
