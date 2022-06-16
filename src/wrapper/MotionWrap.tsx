import React from "react";
import { motion } from "framer-motion";

const MotionWrap = (Component: any) =>
  function HOC() {
    return (
      <motion.div
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Component />
      </motion.div>
    );
  };

export default MotionWrap;
