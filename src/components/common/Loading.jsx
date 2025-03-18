import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-32 space-x-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-4 h-4 bg-blue-500 rounded-full"
          animate={{
            y: [0, -10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2, // Creates a wave effect
          }}
        />
      ))}
    </div>
  );
};

export default Loading;
