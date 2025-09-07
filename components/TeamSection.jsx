"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { teamData } from "@/lib/teamData";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const glassCardStyle = {
  background: "rgba(255, 255, 255, 0.25)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.05,
    backdropFilter: "blur(12px)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const iconHover = {
  scale: 1.2,
  transition: { duration: 0.2 },
};

export default function TeamSection() {
  // const copyWhatsappNumber = (number, name) => {
  //   navigator.clipboard.writeText(number);
  //   toast.success(`${name}'s WhatsApp number copied to clipboard!`, {
  //     style: {
  //       fontSize: "16px",
  //       background: "#22bb33",
  //       color: "#fff",
  //     },
  //   });
  // };

  return (
    <section className="py-10 px-4 md:px-10">
      {/* Faculty Coordinators */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        <h2 className="text-center text-4xl font-bold mb-8 text-[#003566]">
          Faculty <span className="text-orange-600">Council</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
          {teamData.faculty.map((member, index) => (
            <div key={index} className="flex items-center gap-4">
              {/* Animated Card */}

              {member.department ? (
                <Link href={`/team/${member.department}`} passHref>
                  <motion.div variants={item} whileHover="hover">
                    <Card className="w-64 text-center shadow-lg overflow-hidden animated-border" style={glassCardStyle}>
                      <CardContent className="flex flex-col items-center p-4">
                        <div className="relative h-44 w-44 rounded-full border-4 border-[#003566]/10 overflow-hidden">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                            priority={index < 2}
                          />
                        </div>
                        <h4 className="mt-4 font-semibold text-xl">
                          {member.role}
                        </h4>
                        <p className="text-md">{member.name}</p>
                        <p className="text-md text-blue-800 flex items-center gap-1 hover:underline">
                          View Department Team{" "}
                          <ChevronRight className="w-4 h-4" />
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              ) : (
                <motion.div variants={item} whileHover="hover">
                  <Card className="w-64 text-center shadow-lg overflow-hidden" style={glassCardStyle}>
                    <CardContent className="flex flex-col items-center p-4">
                      <div className="relative h-44 w-44 rounded-full border-4 border-[#003566]/10 overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                          priority={index < 2}
                        />
                      </div>
                      <h4 className="mt-4 font-semibold text-xl">
                        {member.role}
                      </h4>
                      <p className="text-md">{member.name}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Static Social Icons */}
              {/* <div className="flex flex-col gap-4">
                <motion.a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={iconHover}
                >
                  <Linkedin className="w-6 h-6 text-[#0077b5]" />
                </motion.a>
                <motion.a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={iconHover}
                >
                  <Instagram className="w-6 h-6 text-[#E1306C]" />
                </motion.a>
                {/* <motion.button
                  onClick={() =>
                    copyWhatsappNumber(member.whatsapp, member.name)
                  }
                  whileHover={iconHover}
                  className="text-[#25D366] cursor-pointer"
                >
                  <FaWhatsapp className="w-6 h-6" />
                </motion.button>
              </div> */}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Student Coordinators */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        <h2 className="text-center text-4xl font-bold mt-16 mb-8 text-[#003566]">
          Student <span className="text-orange-600">Council</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {teamData.students.map((member, index) => (
            <div key={index} className="flex items-center gap-4">
              {/* Animated Card */}

              {member.department ? (
                <Link href={`/team/${member.department}`} passHref>
                  <motion.div variants={item} whileHover="hover">
                    <Card className="w-64 text-center shadow-lg overflow-hidden" style={glassCardStyle}>
                      <CardContent className="flex flex-col items-center p-4">
                        <div className="relative h-44 w-44 rounded-full border-4 border-[#003566]/10 overflow-hidden">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                        <h4 className="mt-4 font-semibold text-xl">
                          {member.role}
                        </h4>
                        <p className="text-md">{member.name}</p>
                        <p className="text-md text-blue-800 flex items-center gap-1 hover:underline">
                          View Department Team{" "}
                          <ChevronRight className="w-4 h-4" />
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              ) : (
                <motion.div variants={item} whileHover="hover">
                  <Card className="w-64 text-center shadow-lg overflow-hidden" style={glassCardStyle}>
                    <CardContent className="flex flex-col items-center p-4">
                      <div className="relative h-44 w-44 rounded-full border-4 border-[#003566]/10 overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                      <h4 className="mt-4 font-semibold text-xl">
                        {member.role}
                      </h4>
                      <p className="text-md">{member.name}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Static Social Icons */}
              <div className="flex flex-col gap-4">
                {member.linkedin && (
                <motion.a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={iconHover}
                >
                  <Linkedin className="w-6 h-6 text-[#0077b5]" />
                </motion.a>
                )}

                {member.instagram && (
                <motion.a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={iconHover}
                >
                  <Instagram className="w-6 h-6 text-[#E1306C]" />
                </motion.a>
                )}
                {/* <motion.button
                  onClick={() =>
                    copyWhatsappNumber(member.whatsapp, member.name)
                  }
                  whileHover={iconHover}
                  className="text-[#25D366] cursor-pointer"
                >
                  <FaWhatsapp className="w-6 h-6" />
                </motion.button> */}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
