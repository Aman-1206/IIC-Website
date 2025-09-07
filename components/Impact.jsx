"use client";
import AnimatedCounter from '@/utils/AnimatedCounter';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LottieIcon = ({ src }) => (
  <div className="mb-4 w-[160px] h-[160px]">
    <DotLottieReact
      src={src}
      loop
      autoplay
      style={{ width: "150px", height: "150px" }}
    />
  </div>
);
const Impact = () => {
  return (
    <section className="py-12 md:py-12 lg:py-16 px-6 sm:px-8 md:px-12 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 md:mb-6 lg:mb-6 text-[#012356]">
          Our <span className="text-orange-600">Impact</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {/* Students Engaged */}
          <div className="bg-gray-100 p-4 md:p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col items-center">
              <LottieIcon src="https://lottie.host/cc9e2358-de2b-46c1-89c0-2449d5607d93/uCQcJocaMi.lottie"/>
              {/* <p className="text-2xl md:text-3xl font-bold text-[#08246A]">1200+</p> */}
              <AnimatedCounter target={1200} />
              <p className="text-lg md:text-xl text-gray-600 mt-2">Students Engaged</p>
            </div>
          </div>

          {/* Innovative Projects */}
          <div className="bg-gray-100 p-4 md:p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col items-center">
              {/* <img 
                src="/assets/home/innovative.png" 
                alt="Innovative Projects" 
                className="h-20 md:h-24 lg:h-28 mb-4 transition-transform duration-300 hover:scale-110" 
              /> */}
              <LottieIcon src="https://lottie.host/fec18af1-ba80-4fb8-8638-36c73cfe0b58/bPURNbR4Q8.lottie"/>
              {/* <p className="text-3xl md:text-4xl font-bold text-[#08246A]">10+</p> */}
              <AnimatedCounter target={100} />
              <p className="text-lg md:text-xl text-gray-600 mt-2">Innovative Projects</p>
            </div>
          </div>

          {/* Events Conducted */}
          <div className="bg-gray-100 p-4 md:p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col items-center">
              {/* <img 
                src="/assets/home/event.png" 
                alt="Events Conducted" 
                className="h-20 md:h-24 lg:h-28 mb-4 transition-transform duration-300 hover:scale-110" 
              /> */}
              <LottieIcon src="https://lottie.host/b550cee4-6c6f-4e46-a527-c92dbb6b5952/kY2g65tLNU.lottie" />
              {/* <p className="text-3xl md:text-4xl font-bold text-[#08246A]">50+</p> */}
              <AnimatedCounter target={50} />
              <p className="text-lg md:text-xl text-gray-600 mt-2">Events Conducted</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;