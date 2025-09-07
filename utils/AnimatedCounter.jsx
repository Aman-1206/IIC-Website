import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedCounter({ 
  target, 
  duration = 2000, 
  className = "text-2xl md:text-3xl font-bold text-[#08246A]" 
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    
    const increment = target / (duration / 16);
    
    let start = 0;
    const animate = () => {
      start += increment;
      const nextCount = Math.min(Math.floor(start), target);
      setCount(nextCount);
      
      if (nextCount < target) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [target, duration]);

  return (
    <motion.p 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {count}+
    </motion.p>
  );
}