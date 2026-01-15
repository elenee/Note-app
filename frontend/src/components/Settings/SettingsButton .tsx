import { type ReactNode } from "react";
import { ArrowIcon } from "../../Icons/Icons";

interface SettingsButtonProps {
  label: string;
  icon: ReactNode;
  active?: boolean;
  onClick: () => void;
  showArrow?: boolean;
}

const SettingsButton = ({ label, icon, active, onClick, showArrow }: SettingsButtonProps) => {
  return (
    <button
      className={`flex items-center justify-between gap-2 rounded-lg cursor-pointer p-2 ${
        active ? "bg-[hsla(216,26%,96%,1)] dark:bg-[hsla(231,16%,16%,1)]" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex gap-2 items-center">
        {icon}
        {label}
      </div>
      {showArrow && active && (
        <ArrowIcon/>
      )}
    </button>
  );
};

export default SettingsButton;
