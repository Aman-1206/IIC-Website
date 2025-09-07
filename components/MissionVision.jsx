"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
const MissionVision = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-32 py-8 sm:py-12 bg-white text-[#012356]">
      {/* Mission and Vision */}
      <div className="flex flex-col lg:flex-row gap-8 md:gap-10 mb-8 md:mb-12">
        {/* Mission */}
        <div className="flex flex-col sm:flex-row items-start gap-4 lg:w-1/2">
          <img
            src="/assets/icons/mission.png"
            alt="Mission Icon"
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mt-1"
          />
          <div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              Mission
            </h3>
            <p className="text-gray-800 text-base sm:text-lg md:text-xl lg:text-2xl">
              IIC aims to nurture creative young minds by providing platforms
              and guidance to help them transform their innovative ideas into
              prototypes, and eventually contribute to the startup ecosystem of
              India.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="flex flex-col sm:flex-row items-start gap-4 lg:w-1/2">
          <img
            src="/assets/icons/vision.png"
            alt="Vision Icon"
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mt-1"
          />
          <div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              Vision
            </h3>
            <p className="text-gray-800 text-base sm:text-lg md:text-xl lg:text-2xl">
              IIC aims to nurture creative young minds by providing platforms
              and guidance to help them transform their innovative ideas into
              prototypes, and eventually contribute to the startup ecosystem of
              India.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8">
          Our <span className="text-orange-600">Objective</span>
        </h3>
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Objective Cards */}
          {[
            {
              lottie:
                "https://lottie.host/a06a4e9c-84dc-4ce3-a132-b109f89e3348/QPcOY32Fv3.lottie",
              title: "Promote",
              desc: "Design Thinking",
            },
            {
              lottie:
                "https://lottie.host/42ba1489-cd22-4900-9cc9-963f6448a61c/QS83iWkbZy.lottie",
              title: "Encourage",
              desc: "Collaboration",
            },
            {
              lottie:
                "https://lottie.host/87b7562b-1eee-4db4-8737-6ac3519c83d9/wD09sCJsRP.lottie",
              title: "Inspire",
              desc: "Problem Solving",
            },
            {
              lottie:
                "https://lottie.host/4af1376f-0f3a-4b9d-9bbf-157377df4d62/G3THWMel1U.lottie",
              title: "Support",
              desc: "early-stage startups",
            },
            {
              lottie:
                "https://lottie.host/b0185650-e880-4c2f-8dc8-05ac3b45fe50/cuuEea3Xh1.lottie",
              title: "Host",
              desc: "Ideathons",
            },
            {
              lottie:
                "https://lottie.host/f85693b9-4436-4780-a649-55b3fe2135a5/apjszVxLWb.lottie",
              title: "Foster",
              desc: "entrepreneurship",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`
      flex flex-col items-center justify-center text-center
      ${idx === 4 ? "lg:col-start-2" : ""}
    `}
            >
              <LottieIcon src={item.lottie} />
              <h4 className="font-semibold text-lg sm:text-xl md:text-2xl">
                {item.title}
              </h4>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
