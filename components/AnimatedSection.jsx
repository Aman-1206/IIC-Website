'use client'; // Required for Framer Motion in Next.js

import { motion } from 'framer-motion';

const AnimatedSection = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;