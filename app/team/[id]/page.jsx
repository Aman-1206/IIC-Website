"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { teamData } from "@/lib/teamData";
import { ChevronLeft, Linkedin, Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { toast } from "sonner";
import { use } from "react";

export default function TeamMembersPage(props) {
  const {id} = use(props.params);
  
  // Find department head and members
  const departmentHead = [...teamData.faculty, ...teamData.students].find(
    member => member?.department?.toLowerCase() === id.toLowerCase()
  );

  const departmentMembers = departmentHead?.members || [];

  if (!departmentHead) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
        Department not found
      </div>
    );
  }

  // const copyWhatsappNumber = (number, name) => {
  //   navigator.clipboard.writeText(number);
  //   toast.success(`${name}'s WhatsApp number copied!`, {
  //     style: {
  //       background: '#22bb33',
  //       color: '#fff',
  //     }
  //   });
  // };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const iconHover = {
    scale: 1.2,
    transition: { duration: 0.2 }
  };

  return (
    <motion.section 
      initial="hidden"
      animate="show"
      variants={container}
      className="min-h-screen bg-gradient-to-b from-[#003566]/5 to-white py-12 px-4 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link href="/team" className="inline-flex items-center gap-2 mb-8 text-[#003566] hover:text-[#003566]/80 transition-colors">
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Team</span>
        </Link>

        {/* Department Head */}
        <motion.div 
          variants={item}
          className="flex flex-col items-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative w-48 h-48 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-[#003566]/20 shadow-xl mb-6"
          >
            <Image
              src={departmentHead.image}
              alt={departmentHead.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          
          <motion.h1 
            variants={item}
            className="text-3xl md:text-4xl font-bold text-center text-[#003566] mb-2"
          >
            {departmentHead.role}
          </motion.h1>
          
          <motion.p 
            variants={item}
            className="text-xl md:text-2xl text-gray-700 font-medium mb-4"
          >
            {departmentHead.name}
          </motion.p>

          {/* Horizontal Social Icons for Department Head */}
          <motion.div className="flex gap-4">
            {departmentHead.linkedin && (
              <motion.a 
                href={departmentHead.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={iconHover}
              >
                <Linkedin className="w-7 h-7 text-[#0077b5]" />
              </motion.a>
            )}
            {departmentHead.instagram && (
              <motion.a 
                href={departmentHead.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={iconHover}
              >
                <Instagram className="w-7 h-7 text-[#E1306C]" />
              </motion.a>
            )}
            {/* {departmentHead.whatsapp && (
              <motion.button 
                onClick={() => copyWhatsappNumber(departmentHead.whatsapp, departmentHead.name)}
                whileHover={iconHover}
                className="text-[#25D366]"
              >
                <FaWhatsapp className="w-7 h-7" />
              </motion.button>
            )} */}
          </motion.div>
        </motion.div>

        {/* Team Members */}
        <motion.div variants={item}>
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#003566] mb-12">
            Meet the Team
          </h2>
          
          <motion.div 
            variants={container}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
          >
            {departmentMembers.map((member, index) => (
              <motion.div 
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className="w-full max-w-xs flex gap-4"
              >
                <Card className="shadow-md hover:shadow-xl transition-shadow h-full w-64">
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-[#003566]/20 mb-4">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-center text-[#003566]">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 text-center mt-1">
                      {member.role}
                    </p>
                  </CardContent>
                </Card>

                {/* Vertical Social Icons for Team Members */}
                {/* <div className="flex flex-col gap-3 justify-center">
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
                  )} */}
                  {/* {member.whatsapp && (
                    <motion.button 
                      onClick={() => copyWhatsappNumber(member.whatsapp, member.name)}
                      whileHover={iconHover}
                      className="text-[#25D366]"
                    >
                      <FaWhatsapp className="w-6 h-6" />
                    </motion.button>
                  )} */}
                {/* </div> */}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}