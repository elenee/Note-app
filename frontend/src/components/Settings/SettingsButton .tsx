import { type ReactNode } from "react";

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
        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0)">
            <path
              d="M1 1L5 5L1 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="6" height="10" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
    </button>
  );
};

export default SettingsButton;
