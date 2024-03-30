import { FaCircleExclamation } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { motion } from "framer-motion";
interface Message {
  error: string | undefined;
  success: string | undefined;
}
export const PopUpMessage = ({ error, success }: Message) => {
  return (
    <motion.div
      className="bg-white w-80 fixed right-12 bottom-5 z-30 rounded-lg
   "
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1, delay: 0.25 }}
    >
      {error && (
        <motion.div className=" flex items-center gap-2 w-full  py-6 px-3 text-destructive bg-destructive/15 ">
          <FaCircleExclamation className="text-2xl" />
          {error}
        </motion.div>
      )}

      {success && (
        <motion.div className=" flex items-center gap-2 w-full  py-6 px-3 text-emerald-500 bg-emerald-500/15 ">
          <FaCircleCheck className="text-2xl" />
          {success}
        </motion.div>
      )}
    </motion.div>
  );
};
