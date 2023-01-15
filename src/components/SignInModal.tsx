import React, { useRef, useState } from "react";
import { useCtx } from "../context/context";
import supabase from "../supabase";

import PulseLoader from "react-spinners/PulseLoader";
import { XMarkIcon } from "@heroicons/react/24/solid";

const SignInModal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setShowModal, setLoggedUser } = useCtx();
  const [signInError, setSignInError] = useState<string>("");

  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);

  const signInHandler = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setLoading(true);
    let { data, error } = await supabase.auth.signUp({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    setLoading(false);

    if (data.session?.access_token && data.user?.id) {
      setLoggedUser({ token: data.session?.access_token, id: data.user.id });
      setShowModal("");
    }

    if (error) {
      setSignInError(error.message);
    }
  };

  return (
    <div className="absolute flex flex-col top-[50%] left-[50%] bg-white translate-x-[-50%] translate-y-[-50%] z-10 w-[90%] xs:w-[350px] rounded-xl px-4 py-10">
      <XMarkIcon
        onClick={() => setShowModal("")}
        className="absolute right-2 top-2 h-8 w-8 text-secondary cursor-pointer"
      />
      <h1 className="text-center text-3xl font-semibold mb-1">Sign up</h1>
      <form className="flex flex-col gap-1 mb-2">
        <label className="text-secondary text-lg" htmlFor="email">
          E-mail
        </label>
        <input
          onChange={() => setSignInError("")}
          ref={emailRef}
          type="email"
          id="email"
          className="text-xl mb-2 outline-none border-secondary border-solid border-2 rounded-md px-2 py-1"
        />
        <label className="text-secondary text-lg" htmlFor="password">
          Password
        </label>
        <input
          onChange={() => setSignInError("")}
          ref={passwordRef}
          type="password"
          id="password"
          className="text-xl mb-5 outline-none border-secondary border-solid border-2 rounded-md px-2 py-1"
        />
        {signInError && <p className="text-red-600">{signInError}</p>}
        <button
          onClick={signInHandler}
          className="bg-secondary hover:bg-[#5c84ae] duration-200 ease-linear hover:border-[#5c84ae] outline-none text-primary rounded-md text-xl py-1 border-secondary border-solid border-2"
          type="submit"
        >
          {loading ? <PulseLoader color={"#f7b2ad"} size={10} /> : "Sign In"}
        </button>
      </form>
      <button
        className="flex place-self-end underline hover:no-underline"
        onClick={() => setShowModal("login")}
      >
        I Have an Account
      </button>
    </div>
  );
};

export default SignInModal;
