"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";

const Hero = ({ title, subtitle, sec_title, sec_sub, btn1, btn2, image }) => {
  const router = useRouter();
  const controls = useAnimation();

  // Continuous animation loop
  useEffect(() => {
    const sequence = async () => {
      while (true) {
        await controls.start({
          y: [-5, 5, -5],
          rotate: [-2, 2, -2],
          transition: {
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
          },
        });
      }
    };
    sequence();
  }, [controls]);

  const handleBtn = (label) => {
    if (label === "View Past Events") {
      router.push("/past-events");
    } else if (label === "Explore Events") {
      router.push("/events");
    } else if (label === "Upcoming Events") {
      window.scrollBy({
        top: 500,
        left: 0,
        behavior: "smooth",
      });
    } else if (label === "Startup Policy") {
      const isMobile = window.innerWidth <= 640; 
      window.scrollBy({
        top: isMobile ? 3800 : 2400,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-[#08246A] text-white py-12 md:py-16 px-6 lg:px-12 xl:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
        {/* Text Content */}
        <div className="space-y-4 md:space-y-6 flex-1">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {title}
            <br />
            {sec_title}
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl font-medium text-orange-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subtitle}
            <br />
            <span className="text-white">{sec_sub}</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {btn1 && btn2 && btn1 !== "" && btn2 !== "" && (
              <>
                <Button
                  onClick={() => handleBtn(btn1)}
                  className="bg-orange-500 hover:bg-orange-700 text-white px-8 py-6 text-lg cursor-pointer"
                  whilehover={{ scale: 1.05 }}
                  whiletap={{ scale: 0.95 }}
                >
                  {btn1}
                </Button>
                <Button
                  onClick={() => handleBtn(btn2)}
                  variant="outline"
                  className="bg-blue-500 hover:bg-blue-700 text-white px-8 py-6 text-lg cursor-pointer"
                  whilehover={{ scale: 1.05 }}
                  whiletap={{ scale: 0.95 }}
                >
                  {btn2}
                </Button>
              </>
            )}
          </motion.div>
        </div>

        {/* Animated Image */}
        <motion.div
          className="flex-1 flex justify-center md:justify-end"
          animate={controls}
        >
          <motion.div
            className="relative w-full max-w-[300px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[450px]"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={image}
              alt="Innovation"
              width={500}
              height={500}
              quality={100}
              className="rounded-lg shadow-2xl"
              style={{
                boxShadow: "0 25px 50px -12px rgba(255, 165, 0, 0.3)",
              }}
              priority
            />
            {/* Floating elements animation */}
            <motion.div
              className="absolute -top-5 -left-5 w-20 h-20 bg-orange-400 rounded-full mix-blend-multiply opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
                transition: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
            <motion.div
              className="absolute -bottom-5 -right-5 w-24 h-24 bg-blue-300 rounded-full mix-blend-multiply opacity-20"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
                transition: {
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                },
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
