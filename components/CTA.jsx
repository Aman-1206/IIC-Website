// components/CTA.jsx
"use client";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useRouter } from 'next/navigation';

const LottieIcon = ({ src }) => (
  <div>
    <DotLottieReact src={src} loop autoplay style={{ width: "150px", height: "150px" }} />
  </div>
);

const CTA = ({ heading_1, heading_2, btn_1, btn_2, img_1, img_2 }) => {
  const router = useRouter();

  const handleBtn = (label) => {
    // Map button labels to pages
    const map = {
      "Submit Your Idea": "/submit-idea",
      "Submit": "/submit-idea",
      "Submit Event Proposal": "/submit-proposal",
      "Partner with us": "/collaboration-request",
      "Get Involved": "/submit-idea",
      "Explore": "/", // adjust if needed
      "Submit": "/submit-idea",
      "Register Startup": "/submit-idea",
    };

    const target = map[label] || null;
    if (target) {
      router.push(target);
    } else {
      // fallback: go to home
      router.push('/');
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-20 py-8 sm:py-12">
      <div className="bg-[#07B1E0] p-4 sm:p-6 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{heading_1}</h3>
          <Button onClick={() => handleBtn(btn_1)} variant="link" className="mt-2 sm:mt-4 bg-white py-2 px-4">
            {btn_1}
          </Button>
        </div>
        <LottieIcon src={img_1} />
      </div>

      <div className="bg-[#FD5B20] p-4 sm:p-8 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{heading_2}</h3>
          <Button onClick={() => handleBtn(btn_2)} variant="link" className="mt-2 sm:mt-4 bg-white py-2 px-4">
            {btn_2}
          </Button>
        </div>
        <LottieIcon src={img_2} />
      </div>
    </section>
  );
};

export default CTA;
