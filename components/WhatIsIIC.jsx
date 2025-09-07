const WhatIsIIC = () => {
  return (
    <section className="py-10 md:py-14 lg:py-16 px-6 sm:px-8 md:px-12 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8 md:gap-10 lg:gap-12">
          {/* Left Text Section */}
          <div className="lg:w-[60%]">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#012356] mb-5 md:mb-6 lg:mb-6">
              What is <span className="text-orange-600">IIC</span>?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              IIC aims to nurture creative young minds by providing platforms and guidance to help them
              transform their innovative ideas into prototypes, and eventually contribute to the startup
              ecosystem of India.
            </p>
          </div>

          {/* Right Icon Section */}
          <div className="w-full lg:w-[60%] grid grid-cols-3 gap-4 md:gap-6">
            {/* Foster Innovation */}
            <div className="bg-gray-50 p-4 md:p-7 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col items-center">
                <img
                  src="/assets/home/innovation.png"
                  alt="Foster Innovation"
                  className="h-16 md:h-20 lg:h-22 mb-3 transition-transform duration-300 hover:scale-110"
                />
                <span className="text-sm md:text-base font-medium text-[#00B2E1]">Foster Innovation</span>
              </div>
            </div>

            {/* Startup Support */}
            <div className="bg-gray-50 p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col items-center">
                <img
                  src="/assets/home/support.png"
                  alt="Startup Support"
                  className="h-16 md:h-20 lg:h-22 mb-3 transition-transform duration-300 hover:scale-110"
                />
                <span className="text-sm md:text-base font-medium text-[#FD5B20]">Startup Support</span>
              </div>
            </div>

            {/* Research Driven */}
            <div className="bg-gray-50 p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col items-center">
                <img
                  src="/assets/home/research.png"
                  alt="Research Driven"
                  className="h-16 md:h-20 lg:h-22 mb-3 transition-transform duration-300 hover:scale-110"
                />
                <span className="text-sm md:text-base font-medium text-[#012356]">Research Driven</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsIIC;