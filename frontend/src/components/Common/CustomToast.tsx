import { toast } from "react-toastify";
import type { ToastOptions } from "react-toastify";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface CustomToastProps {
  message: string;
  type?: "success" | "error";
  icon?: ReactNode;
}

const CustomToast = ({ message, type = "success", icon }: CustomToastProps) => {
  const defaultIcon =
    type === "success" ? (
      <div className="inline-flex items-center justify-center p-px shrink-0 w-4 h-4 text-white bg-green-500 rounded-[50%] dark:bg-green-900">
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    ) : (
      <div className="inline-flex items-center justify-center p-px shrink-0 w-4 h-4 text-white bg-red-500 rounded-[50%] dark:bg-red-900">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    );

  return (
    <div className="flex items-center w-full max-w-97.5 h-8 p-2 space-x-4 bg-white border border-[hsla(216,19%,90%,1)] dark:border-[hsla(221,16%,20%,1)] rounded-lg shadow-lg dark:bg-gray-800">
      {icon || defaultIcon}
      <div className="text-[12px] font-normal text-gray-900 dark:text-white">
        {message}
      </div>
    </div>
  );
};

const toastConfig: ToastOptions = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  closeButton: true,
};

export const showToast = (message: string, type?: CustomToastProps["type"]) => {
  toast(<CustomToast message={message} type={type} />, toastConfig);
};

export const showSuccessToast = (message: string) => {
  showToast(message, "success");
};

export const showErrorToast = (message: string) => {
  showToast(message, "error");
};

export const showNoteSavedToast = () => {
  showSuccessToast("Note saved successfully!");
};

export const showNoteUpdatedToast = () => {
  showSuccessToast("Note updated successfully!");
};

export const showNoteDeletedToast = () => {
  showSuccessToast("Note permanently deleted.");
};

export const showSettingsUpdatedToast = () => {
  showSuccessToast("Settings updated successfully!");
};

export const showPasswordUpdatedToast = () => {
  showSuccessToast("Password changed successfully!");
};

export const showInvalidCredentialsToast = () => {
  showErrorToast("Invalid credentials");
};

export const showUserCreatedToast = () => {
  showSuccessToast("User created successfully");
};

export const showNoteArchivedToast = () => {
  toast(
    <div className="flex items-center justify-between w-full max-w-97.5 h-8 p-2 bg-white border border-[hsla(216,19%,90%,1)] rounded-lg shadow-lg dark:bg-gray-800">
      <div className="flex items-center space-x-2">
        <div className="inline-flex items-center justify-center p-px shrink-0 w-4 h-4 text-white bg-green-500 rounded-[50%] dark:bg-green-900">
          <svg
            className="w-3 h-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span className="text-[12px] font-normal text-gray-900 dark:text-white">
          Note Archived
        </span>
      </div>

      <Link
        to="/archived"
        className="text-[12px] underline text-gray-900 dark:text-white mr-6"
      >
        Archived Notes
      </Link>
    </div>,
    toastConfig
  );
};

export const showNoteRestoredToast = () => {
  toast(
    <div className="flex items-center justify-between w-full max-w-97.5 h-8 p-2 bg-white border border-[hsla(216,19%,90%,1)] rounded-lg shadow-lg dark:bg-gray-800">
      <div className="flex items-center space-x-2">
        <div className="inline-flex items-center justify-center p-px shrink-0 w-4 h-4 text-white bg-green-500 rounded-[50%] dark:bg-green-900">
          <svg
            className="w-3 h-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span className="text-[12px] font-normal text-gray-900 dark:text-white">
          Note restored to active notes.
        </span>
      </div>

      <Link
        to="/notes"
        className="text-[12px] underline text-gray-900 dark:text-white mr-6"
      >
        All Notes
      </Link>
    </div>,
    toastConfig
  );
};

export default CustomToast;
