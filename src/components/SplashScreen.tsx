import { motion } from "motion/react";
import { Leaf } from "lucide-react";

export const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
      onAnimationComplete={onFinish}
      className="fixed inset-0 z-[100] bg-emerald-600 flex flex-col items-center justify-center text-white"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
        className="mb-4"
      >
        <Leaf className="w-24 h-24" />
      </motion.div>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold tracking-wider"
      >
        Remèd Lakay
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-2 text-emerald-100 font-medium"
      >
        Medsin Natirèl nan Pòch ou
      </motion.p>
    </motion.div>
  );
};
