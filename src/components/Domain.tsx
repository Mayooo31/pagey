import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCtx } from "../context/context";

const Domain = () => {
  const { loggedUser, setDomainLink } = useCtx();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const changeDomainHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomainLink(e.target.value.trim());
    setError("");
  };

  useEffect(() => {
    loggedUser && setError("");
  }, [loggedUser]);

  const claimLinkHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (loggedUser) {
      setError("");
      navigate("/create-page");
    } else {
      setError("You are not logged in! 😁");
    }
  };

  return (
    <form className="relative flex w-full mt-5 max-w-[600px] mx-auto">
      <input
        onChange={changeDomainHandler}
        className="text-xl sm:text-2xl pl-[85px] sm:pl-[95px] py-2 rounded-tl-md rounded-bl-md font-semibold outline-none w-[calc(100%-100px)] sm:w-[calc(100%-150px)]"
      />
      <button
        type="submit"
        onClick={claimLinkHandler}
        className="border-2 border-secondary rounded-tr-md rounded-br-md bg-secondary text-base sm:text-2xl text-primary border-solid w-[100px] sm:w-[150px] hover:bg-[#466c93] duration-200 ease-linear"
      >
        claim link
      </button>
      <p className="absolute sm:text-lg top-[50%] left-2 translate-y-[-50%]">pagey.io/</p>
      {error && (
        <p className="absolute bottom-[-100%] left-[50%] translate-y-[-50%] translate-x-[-50%] self-center mt-1 sm:text-xl text-red-700 w-full text-center">
          {error}
        </p>
      )}
    </form>
  );
};

export default Domain;
