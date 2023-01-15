import React, { useContext, useState, createContext } from "react";

type LoggedUserType = {
  token: string;
  id: string;
};

type ContextType = {
  showModal: string;
  setShowModal: React.Dispatch<React.SetStateAction<string>>;
  loggedUser: LoggedUserType | null;
  setLoggedUser: React.Dispatch<React.SetStateAction<LoggedUserType | null>>;
  domainLink: string;
  setDomainLink: React.Dispatch<React.SetStateAction<string>>;
};

type PropsType = {
  children: React.ReactNode;
};

const Context = createContext<ContextType>(null!);

export const useCtx = () => useContext(Context);

export const ContextProvider = ({ children }: PropsType) => {
  const [showModal, setShowModal] = useState<string>("");
  const [loggedUser, setLoggedUser] = useState<LoggedUserType | null>(null);
  const [domainLink, setDomainLink] = useState<string>("");

  return (
    <Context.Provider
      value={{
        showModal,
        setShowModal,
        loggedUser,
        setLoggedUser,
        domainLink,
        setDomainLink,
      }}
    >
      {children}
    </Context.Provider>
  );
};
