"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LottieIcon = ({ src }) => (
  <div>
    <DotLottieReact
      src={src}
      loop
      autoplay
      style={{ width: "150px", height: "150px" }}
    />
  </div>
);

const CTA = ({ heading_1, heading_2, btn_1, btn_2, img_1, img_2 }) => {
  const handleBtn = (label) => {
    if (
      btn_1 === "Explore" ||
      btn_1 === "Get Involved" ||
      btn_2 === "Submit" ||
      btn_2 === "Submit Your Idea"
    ) {
      toast.success("Feature Coming Soon!", {
        style: {
          fontSize: "16px",
          background: "#22bb33",
          color: "#fff",
        },
      });
    }
  };
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-20 py-8 sm:py-12">
      {/* Student Innovations */}
      <div className="bg-[#07B1E0] p-4 sm:p-6 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            {heading_1}
          </h3>
          <Button
          onClick={() => handleBtn(btn_1)}
            variant="link"
            className="text-blue-600 hover:border hover:border-white hover:bg-blue-700 hover:text-white text-xs sm:text-sm md:text-base mt-2 sm:mt-4 bg-white py-2 px-4 sm:py-3 sm:px-6 hover:no-underline cursor-pointer"
          >
            {btn_1}
          </Button>
        </div>
        {/* <img
          src={img_1}
          alt="Student Innovation"
          className="w-16 sm:w-20 md:w-24 lg:w-32 object-contain transition-transform duration-300 hover:scale-105"
        /> */}
        <LottieIcon src={img_1} />
      </div>

      {/* Submit Your Idea */}
      <div className="bg-[#FD5B20] p-4 sm:p-8 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            {heading_2}
          </h3>
          <Button
            onClick={() => handleBtn(btn_2)}
            variant="link"
            className="text-orange-600 hover:bg-orange-800 hover:text-white hover:border hover:border-white text-xs sm:text-sm md:text-base mt-2 sm:mt-4 bg-white py-2 px-4 sm:py-3 sm:px-6 hover:no-underline cursor-pointer"
          >
            {btn_2}
          </Button>
        </div>
        {/* <img
          src={img_2}
          alt="Submit Idea"
          className="w-16 sm:w-20 md:w-24 lg:w-32 object-contain transition-transform duration-300 hover:scale-105"
        /> */}
        <LottieIcon src={img_2} />
      </div>
    </section>
  );
};

export default CTA;
