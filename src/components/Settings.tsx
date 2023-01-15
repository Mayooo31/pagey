import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCtx } from "../context/context";
import supabase from "../supabase";
import { LinkType, StateType } from "../types";
import { Bars3Icon } from "@heroicons/react/24/solid";
import PulseLoader from "react-spinners/PulseLoader";

import "../index.css";

type Props = {
  switchButton: boolean;
  state: StateType;
  dispatch: React.Dispatch<any>;
  isUpdating: boolean;
};

const Settings = ({ switchButton, state, dispatch, isUpdating }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const { loggedUser, domainLink } = useCtx();
  const [settingsErrors, setSettingsErrors] = useState<any>({});
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);
  const navigate = useNavigate();

  const imagehandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files;

    if (file) {
      setLoadingImage(true);
      const { data: data1, error: error1 } = await supabase.storage
        .from("images")
        .upload(`${loggedUser?.id}/${file[0].name}`, file[0] as File, {
          cacheControl: "3600",
          upsert: false,
        });

      const { data: data2 } = await supabase.storage
        .from("images")
        .getPublicUrl(`${loggedUser?.id}/${file[0].name}`);
      setLoadingImage(false);

      dispatch({
        type: "CHANGE",
        payload: { name: e.target.name, value: data2.publicUrl },
      });
    }
  };

  const linkHandler = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    dispatch({
      type: "CHANGE_LINK",
      payload: { name: e.target.name, value: e.target.value.trim(), id },
    });
  };

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: "CHANGE",
      payload: { name: e.target.name, value: e.target.value.trim() },
    });
  };

  const handlerSort = () => {
    let allLinks = [...state.links];

    const draggedItemContent = allLinks.splice(dragItem.current, 1)[0];

    allLinks.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;

    dispatch({
      type: "DRAG_LINK",
      payload: allLinks,
    });
  };

  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let errors: any = {};
    let message: string = "is missing";
    const wrongDomains = ["create-page", "page", "pages"];

    // if errors add error to errors {}
    if (!state.domain) errors.domain = message;
    if (!state.title) errors.title = message;
    if (wrongDomains.includes(state.domain)) errors.domain = "cant be named like this";

    state.links.map(link => {
      if (link.name === "" && link.url === "") {
        errors[link.id] = { name: message, url: message };
      } else if (link.name === "") {
        errors[link.id] = { name: message };
      } else if (link.url === "") {
        errors[link.id] = { url: message };
      }
    });

    const isEmpty = Object.keys(errors).length === 0;

    if (!isEmpty) {
      setSettingsErrors(errors);
      return;
    }

    if (isUpdating) {
      setLoading(true);
      const { error } = await supabase
        .from("pages")
        .update({
          user_id: loggedUser?.id,
          image: state.image,
          title: state.title,
          description: state.description,
          type: state.type,
          themeColor: state.themeColor,
          themeBackground: state.themeBackground,
          links: state.links,
          domain: state.domain,
        })
        .eq("domain", state.domain);
      setLoading(false);

      if (!error) {
        navigate(`/${state.domain}`);
      }
    } else {
      setLoading(true);
      const { error } = await supabase.from("pages").insert({
        user_id: loggedUser?.id,
        image: state.image,
        title: state.title,
        description: state.description,
        type: state.type,
        themeColor: state.themeColor,
        themeBackground: state.themeBackground,
        links: state.links,
        domain: state.domain,
      });
      setLoading(false);

      if (error?.code === "23505") {
        errors.domain = "is not available";
        setSettingsErrors(errors);
      }

      if (!error) {
        navigate(`/${state.domain}`);
      }
    }
  };

  useEffect(() => {
    dispatch({
      type: "GET_USER_ID",
      payload: { user_id: loggedUser?.id },
    });
    dispatch({
      type: "CHANGE",
      payload: { name: "domain", value: domainLink },
    });
  }, []);

  return (
    <form
      className={`absolute left-[50%] my-scroll h-[calc(100vh-68px)] ss:h-[calc(100vh-75px)] overflow-y-auto top-0 bg-[#ffd2cf] rounded-xl translate-x-[-50%] flex flex-col py-2 px-3 w-[100%] mx-auto ease-linear duration-100 xs:max-w-[400px] xs:left-0 xs:translate-x-[0%] ${
        switchButton && "translate-x-[-160%] xs:translate-x-[-100%]"
      }`}
    >
      <label className="text-lg" htmlFor="domain">
        Domain <span className="text-red-600">{settingsErrors?.domain}</span>
      </label>
      <input
        disabled={isUpdating ? true : false}
        defaultValue={isUpdating ? state.domain : domainLink}
        placeholder="pagey.io/horacio"
        className="mb-[2px] text-xl font-semibold px-2 py-1 outline-none rounded-lg"
        onChange={e => {
          settingsErrors.domain = "";
          changeHandler(e);
        }}
        type="text"
        name="domain"
        id="domain"
      />
      <p className="text-end text-sm">pagey.io/{state.domain}</p>
      <p className="text-lg">Image</p>
      <label
        className="text-xl cursor-pointer mb-2 font-semibold bg-[#f5f5f5] text-center p-2 border-2 border-secondary border-dashed rounded-lg"
        htmlFor="image"
      >
        {loadingImage ? (
          <PulseLoader color={"#38618c"} size={12} />
        ) : state.image ? (
          "Image uploaded"
        ) : (
          "Click or drop to upload"
        )}
      </label>
      <input
        className="mb-2 text-xl font-semibold px-2 py-1 outline-none rounded-lg hidden"
        onChange={e => imagehandler(e)}
        type="file"
        name="image"
        id="image"
      />
      <label className="text-lg" htmlFor="title">
        Title <span className="text-red-600">{settingsErrors?.title}</span>
      </label>
      <input
        defaultValue={isUpdating ? state.title : ""}
        placeholder="Tony Montana"
        className="mb-2 text-xl font-semibold px-2 py-1 outline-none rounded-lg"
        onChange={e => {
          settingsErrors.title = "";
          changeHandler(e);
        }}
        type="text"
        name="title"
        id="title"
      />
      <label className="text-lg" htmlFor="description">
        Description
      </label>
      <textarea
        defaultValue={isUpdating ? state.description : ""}
        placeholder="optional"
        className="mb-2 text-xl font-semibold px-2 py-1 min-h-[100px] outline-none rounded-lg"
        onChange={e => changeHandler(e)}
        name="description"
        id="description"
      />
      <label className="text-lg" htmlFor="type">
        Type
      </label>
      <select
        defaultValue={isUpdating ? state.type : ""}
        className="mb-2 text-xl font-semibold px-2 py-1 outline-none rounded-lg"
        onChange={e => changeHandler(e)}
        name="type"
        id="type"
      >
        <option value="rounded">Rounded</option>
        <option value="sharp">Sharp</option>
      </select>
      <label className="text-lg" htmlFor="themeBackground">
        Theme background
      </label>
      <input
        value={state.themeBackground}
        className="min-h-[35px] mb-2 text-xl font-semibold outline-none w-16 h-8 border-2 border-secondary border-solid rounded-md"
        onChange={e => changeHandler(e)}
        type="color"
        name="themeBackground"
        id="themeBackground"
      />
      <label className="text-lg" htmlFor="themeColor">
        Theme color
      </label>
      <input
        value={state.themeColor}
        className="min-h-[35px] mb-2 text-xl font-semibold outline-none w-16 h-8 border-2 border-secondary border-solid rounded-md"
        onChange={e => changeHandler(e)}
        type="color"
        name="themeColor"
        id="themeColor"
      />
      <label className="text-lg font-semibold mt-2">-Links-</label>
      {state.links.map((link: LinkType, index: number) => (
        <div
          draggable
          key={link.id}
          className="relative flex flex-col"
          onDragStart={() => (dragItem.current = index)}
          onDragEnter={() => (dragOverItem.current = index)}
          onDragEnd={handlerSort}
          onDragOver={e => e.preventDefault()}
        >
          <button type="button" className="absolute top-[-2px] right-0 cursor-grab">
            <Bars3Icon className="w-7, h-7" />
          </button>
          {state.links.length !== 1 && (
            <button
              type="button"
              onClick={() =>
                dispatch({
                  type: "REMOVE_LINK",
                  payload: { id: link.id },
                })
              }
              className="absolute top-0 right-10"
            >
              remove
            </button>
          )}
          <label className="text-lg" htmlFor="name">
            Name <span className="text-red-600">{settingsErrors[link.id]?.name}</span>
          </label>
          <input
            placeholder="Twitter"
            defaultValue={link.name}
            className="text-xl font-semibold px-2 py-1 outline-none rounded-lg"
            onChange={e => {
              if (settingsErrors[link.id]) {
                settingsErrors[link.id].name = "";
              }
              linkHandler(e, link.id);
            }}
            type="text"
            name="name"
            id="name"
          />
          <label className="text-lg" htmlFor="url">
            Url <span className="text-red-600">{settingsErrors[link.id]?.url}</span>
          </label>
          <input
            placeholder="https://twitter.com/elonmusk"
            defaultValue={link.url}
            className="mb-4 text-xl font-semibold px-2 py-1 outline-none rounded-lg"
            onChange={e => {
              if (settingsErrors[link.id]) {
                settingsErrors[link.id].url = "";
              }
              linkHandler(e, link.id);
            }}
            type="text"
            name="url"
            id="url"
          />
        </div>
      ))}
      {state.links.length < 10 && (
        <button
          className="text-xl font-semibold mb-2"
          type="button"
          onClick={() =>
            dispatch({
              type: "ADD_LINK",
            })
          }
        >
          add link
        </button>
      )}
      {state.links.length === 10 && (
        <p className="text-center">
          For more links get{" "}
          <a target="_blank" className="underline cursor-pointer hover:no-underline">
            PREMIUM
          </a>
        </p>
      )}
      <button
        onClick={e => submitHandler(e)}
        type="submit"
        className="bg-secondary text-primary py-3 rounded-lg text-3xl mb-3"
      >
        {loading ? (
          <PulseLoader color={"#f7b2ad"} size={16} />
        ) : isUpdating ? (
          "Update"
        ) : (
          "Create"
        )}
      </button>
    </form>
  );
};

export default Settings;
