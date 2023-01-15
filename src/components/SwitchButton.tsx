import React from "react";
import { Cog6ToothIcon, ComputerDesktopIcon } from "@heroicons/react/24/solid";

type Props = {
  switchButton: boolean;
  setSwitchButton: React.Dispatch<React.SetStateAction<boolean>>;
};

const SwitchButton = ({ switchButton, setSwitchButton }: Props) => {
  return (
    <button
      onClick={() => setSwitchButton(!switchButton)}
      className="fixed right-5 bottom-5 bg-[#26d88b] px-2 py-2 rounded-full z-10 md:hidden"
    >
      {switchButton ? (
        <Cog6ToothIcon className="w-7 h-7 text-secondary" />
      ) : (
        <ComputerDesktopIcon className="w-7 h-7 text-secondary" />
      )}
    </button>
  );
};

export default SwitchButton;
