import { PencilSquareIcon, GlobeAltIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import supabase from "../supabase";
import { UserPageType } from "../types";

type PropsType = {
  data: UserPageType;
  userPagesData: UserPageType[];
  setUserPagesData: React.Dispatch<React.SetStateAction<UserPageType[] | undefined>>;
};

const OnePage = ({ data, userPagesData, setUserPagesData }: PropsType) => {
  const deletePageHandler = async () => {
    setUserPagesData(userPagesData.filter(page => page.domain !== data.domain));

    const { error } = await supabase.from("pages").delete().eq("domain", data.domain);
  };

  return (
    <div className="relative p-2 flex justify-center items-center w-full bg-secondary text-primary h-36 rounded-xl">
      <h1 className="text-xl text-center">{data.title}</h1>
      <p className="absolute bottom-1 left-1 text-ellipsis whitespace-nowrap overflow-x-hidden max-w-[90%]">
        pagey.io/{data.domain}
      </p>

      <TrashIcon
        onClick={deletePageHandler}
        className="absolute top-[5px] right-1 w-7 h-7 cursor-pointer"
      />
      <Link to={`/${data.domain}/edit`}>
        <PencilSquareIcon className="absolute top-1 right-10 w-[30px] h-[30px] cursor-pointer" />
      </Link>

      <Link to={`/${data.domain}`} target="_blank">
        <GlobeAltIcon className="absolute top-1 right-20 w-[30px] h-[30px] cursor-pointer" />
      </Link>
    </div>
  );
};

export default OnePage;
