import { useState } from "react";
import { showSettingsUpdatedToast } from "../Common/CustomToast";

export type ThemeOptionItem<T> = {
  label: string;
  value: T;
  text?: string;
  icon?: React.ReactNode;
};

type ThemeOptionProps<T> = {
  title: string;
  options: ThemeOptionItem<T>[];
  selected: T;
  onChange: (value: T) => void;
};

const ThemeOption = <T extends string>({
  title,
  options,
  selected,
  onChange,
}: ThemeOptionProps<T>) => {
  const [pendingSelected, setPendingSelected] = useState<T>(selected);

  const hasChanges = pendingSelected !== selected;

  return (
    <div className="flex flex-col gap-6 items-start w-132">
      <div>
        <h2 className="text-[16px] font-semibold text-[hsla(222,32%,8%,1)] dark:text-white">
          {title}
        </h2>
        <p className="text-[14px] text-[hsla(221,16%,20%,1)] dark:text-[hsla(219,15%,82%,1)]">
          Choose your {title}:
        </p>
      </div>

      <div className="flex flex-col w-full gap-4">
        {options.map((option) => {
          const isSelected = pendingSelected === option.value;

          return (
            <label
              key={option.value}
              className={`p-4 border rounded-xl w-full flex items-center justify-between cursor-pointer border-[hsla(216,19%,90%,1)] dark:border-[hsla(221,16%,20%,1)] 
                ${
                  isSelected
                    ? "bg-[hsla(216,26%,96%,1)] dark:bg-[hsla(231,16%,16%,1)]"
                    : ""
                }`}
            >
              <div className="flex items-center gap-4">
                <div className="bg-white dark:bg-[hsla(222,32%,8%,1)] rounded-xl border p-2">
                  {option.icon}
                </div>
                <div>
                  <p className="text-[14px] font-medium dark:text-white">
                    {option.label}
                  </p>
                  {option.text && (
                    <p className="text-[12px] text-[hsla(221,16%,20%,1)] dark:text-[hsla(219,15%,82%,1)]">
                      {option.text}
                    </p>
                  )}
                </div>
              </div>

              <input
                type="radio"
                checked={isSelected}
                onChange={() => setPendingSelected(option.value)}
              />
            </label>
          );
        })}
      </div>

      <div className="flex justify-end w-full">
        <button
          disabled={!hasChanges}
          onClick={() => {
            onChange(pendingSelected);
            showSettingsUpdatedToast()
          }}
          className={`px-4 py-3 rounded-lg text-white transition
            ${
              hasChanges
                ? "bg-[hsla(228,100%,60%,1)]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Apply changes
        </button>
      </div>
    </div>
  );
};

export default ThemeOption;
