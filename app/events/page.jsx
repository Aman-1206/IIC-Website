import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PastEvents from "@/components/PastEvents";
import UpcomingEvents from "@/components/UpcomingEvents";
import React from "react";

const page = () => {
  return (
    <main>
      <Hero
        title="Events &"
        subtitle="Explore our innovation-driven"
        sec_title="Workshops"
        sec_sub="activities,bootcamps, and sessions"
        btn1="View Past Events"
        btn2="Upcoming Events"
        image="/assets/events.png"
      />
      <UpcomingEvents />
      <PastEvents />
      <CTA
          heading_1="Idea for an Event"
          heading_2="Want to Collaborate"
          btn_1="Submit Event Proposal"
          btn_2="Partner with us"
          img_1="https://lottie.host/14776df0-4dfa-421f-9626-a9a6ad1f7db7/8dMQfoxXbR.lottie"
          img_2="https://lottie.host/42ba1489-cd22-4900-9cc9-963f6448a61c/QS83iWkbZy.lottie"
        />

        <Footer/>
    </main>
  );
};

export default page;
