import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCtx } from "../context/context";
import { StateType } from "../types";
import { v4 as uuidv4 } from "uuid";
import supabase from "../supabase";

import Navbar from "../components/Navbar";
import Settings from "../components/Settings";
import Result from "../components/Result";
import SwitchButton from "../components/SwitchButton";

const initialState = {
  user_id: "",
  image: "",
  title: "",
  description: "",
  type: "rounded",
  themeColor: "#E6CCBE",
  themeBackground: "#A07178",
  links: [{ name: "", url: "", id: uuidv4() }],
  domain: "",
};

type actionType = {
  type:
    | "GET_USER_ID"
    | "CHANGE"
    | "ADD_LINK"
    | "REMOVE_LINK"
    | "CHANGE_LINK"
    | "DRAG_LINK"
    | "NEW_STATE";
  payload: any;
};

const reducer = (state: StateType, action: actionType) => {
  switch (action.type) {
    case "GET_USER_ID":
      return { ...state, user_id: action.payload.user_id };
    case "CHANGE":
      return { ...state, [action.payload.name]: action.payload.value };
    case "ADD_LINK":
      return {
        ...state,
        links: [...state.links, { name: "", url: "", id: uuidv4() }],
      };
    case "REMOVE_LINK":
      return {
        ...state,
        links: state.links.filter(link => link.id !== action.payload.id),
      };
    case "CHANGE_LINK":
      return {
        ...state,
        links: state.links.map(link => {
          if (link.id === action.payload.id) {
            return { ...link, [action.payload.name]: action.payload.value };
          } else return link;
        }),
      };
    case "DRAG_LINK":
      return {
        ...state,
        links: action.payload,
      };
    case "NEW_STATE":
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

const CreatePage = () => {
  const [switchButton, setSwitchButton] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loggedUser } = useCtx();
  const { id } = useParams();
  const navigate = useNavigate();

  const isUpdating = window.location.pathname.includes("edit");

  useEffect(() => {
    if (!loggedUser) {
      return navigate("/");
    }
    if (isUpdating) {
      const loadData = async () => {
        const { data, error } = await supabase.from("pages").select().eq("domain", id);
        if (data) {
          if (data[0].user_id === loggedUser.id) {
            dispatch({
              type: "NEW_STATE",
              payload: data[0],
            });
          } else {
            navigate("/");
          }
        } else {
          navigate("/");
        }
      };
      loadData();
    }
  }, []);

  return (
    <>
      <Navbar />
      <section className="relative">
        <Settings
          isUpdating={isUpdating}
          switchButton={switchButton}
          state={state}
          dispatch={dispatch}
        />
        <Result state={state} />
        <SwitchButton switchButton={switchButton} setSwitchButton={setSwitchButton} />
      </section>
    </>
  );
};

export default CreatePage;
