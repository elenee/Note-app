import { motion } from "framer-motion";

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-[hsla(222,32%,8%,1)]">
      <motion.div
        className="
          w-14 h-14
          rounded-full
          border-4
          border-[hsla(228,100%,60%,0.2)]
          border-t-[hsla(228,100%,60%,1)]
        "
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
    </div>
  );
};
