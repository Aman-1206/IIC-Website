import AnimatedSection from "@/components/AnimatedSection";
import CTA from "@/components/CTA";
import FeaturedEvents from "@/components/FeaturedEvent";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Impact from "@/components/Impact";
import LatestWebinars from "@/components/LatestWebinars";
import WhatIsIIC from "@/components/WhatIsIIC";
import React from "react";
import StartupPolicy from "@/components/StartupPolicy";
import CollaborationList from "@/components/CollaborationList";
import SponsorList from "@/components/SponsorList";

const page = () => {
  return (
    <main>
      <Hero
        title="Igniting Innovation,"
        subtitle="Institution's Innovation Council"
        sec_title="Empowering Minds"
        sec_sub="Shyam Lal College : University of Delhi"
        btn1="Startup Policy"
        btn2="Explore Events"
        image="/assets/hero.png"
      />

      <AnimatedSection>
        <WhatIsIIC />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <Impact />
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <FeaturedEvents />
      </AnimatedSection>

      <AnimatedSection delay={0.35}>
        <LatestWebinars title="Webinars By" sub_title="Ministry of Education"/>
      </AnimatedSection>
      <AnimatedSection delay={0.45}>
        <StartupPolicy/>
      </AnimatedSection>

      <CollaborationList/>
      <SponsorList/>

      <AnimatedSection delay={0.4}>
        <CTA
          heading_1="Student Innovations"
          heading_2="Have an Idea? Let's Turn it Into a Startup!"
          btn_1="Explore"
          btn_2="Submit Your Idea"
          img_1="https://lottie.host/9d6cf24a-f6fd-4161-8e00-5fe38c976b9b/Px9Fb3j4l0.lottie"
          img_2="https://lottie.host/3bb1c7f4-9bab-4d16-84f8-343de72d9e4a/BSeDubxkFw.lottie"
        />
      </AnimatedSection>

      

      <Footer />
    </main>
  );
};

export default page;
