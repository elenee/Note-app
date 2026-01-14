import type React from "react";
import { motion } from "motion/react";

type ConfirmModalProps = {
  isOpen: boolean;
  isDelete: boolean;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({
  isDelete,
  title,
  description,
  icon,
  confirmText,
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
      className="flex flex-col absolute bg-white dark:bg-[hsla(221,16%,20%,1)] w-110 rounded-lg top-[50%] left-[50%] translate-x-[-50%] -translate-y-[50%]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex p-5 gap-4">
        <div className="bg-[hsla(216,26%,96%,1)] dark:bg-[hsla(222,11%,36%,1)] rounded-lg flex justify-center items-center w-8 h-8 p-2">
          {icon}
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-[16px]">{title}</p>
          <p className="text-[14px] text-[hsla(221,16%,20%,1)] dark:text-[hsla(216,19%,90%,1)]">
            {description}
          </p>
        </div>
      </div>
      <div className="w-full h-px bg-[hsla(216,26%,96%,1)]"></div>
      <div className="flex gap-4 px-5 py-4 justify-end">
        <button
          className="bg-[hsla(216,26%,96%,1)] text-[hsla(222,11%,36%,1)] px-4 py-3 rounded-lg cursor-pointer"
          onClick={onCancel}
        >
          {cancelText}
        </button>
        <button
          className={`px-4 py-3 text-white rounded-lg cursor-pointer ${
            isDelete ? "bg-[hsla(355,96%,60%,1)]" : "bg-[hsla(228,100%,60%,1)]"
          }`}
          onClick={onConfirm}
        >
          {confirmText}
        </button>
      </div>
    </motion.div>
  );
};

export default ConfirmModal;
