"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Linkedin, Instagram, ChevronRight } from "lucide-react";
import Link from "next/link";

// Animation variants remain the same
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const iconHover = { scale: 1.2, transition: { duration: 0.2 } };

function formatBirthday(dateValue) {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
  }).format(date);
}

const BirthdaySpotlight = ({ celebrants }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
    className="relative overflow-hidden rounded-[2rem] border border-orange-200 bg-gradient-to-r from-[#fff4e8] via-white to-[#fff0f6] p-6 md:p-8 shadow-xl mb-14"
  >
    <div className="pointer-events-none absolute -left-6 top-10 text-4xl md:text-5xl">🎈</div>
    <div className="pointer-events-none absolute left-16 top-4 text-2xl md:text-3xl">✨</div>
    <div className="pointer-events-none absolute right-8 top-8 text-4xl md:text-5xl">🎂</div>
    <div className="pointer-events-none absolute right-16 bottom-6 text-3xl md:text-4xl">🎉</div>
    <div className="pointer-events-none absolute left-1/2 bottom-4 text-2xl md:text-3xl -translate-x-1/2">🕯️🕯️🕯️</div>

    <div className="relative z-10 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
        Birthday Spotlight
      </p>
      <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#003566]">
        Celebrating Our Team
      </h2>
      <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
        Wishing a very happy birthday to our council member{celebrants.length > 1 ? "s" : ""}.
      </p>
      <div className="mt-5 space-y-1 text-sm md:text-base text-[#003566]/80">
        <p>May this year bring bold ideas, warm moments, and well-earned success.</p>
        <p>Thank you for the energy, leadership, and care you bring to the council.</p>
        <p>Here is to a joyful year ahead filled with growth, laughter, and celebration.</p>
      </div>
    </div>

    <div className="relative z-10 mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
      {celebrants.map((member) => (
        <div
          key={member._id}
          className="px-2 py-3 flex items-center gap-4 border-b border-dashed border-orange-200/80 last:border-b-0"
        >
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-4 border-orange-200 shadow-md">
            <Image src={member.image} alt={member.name} fill sizes="80px" className="object-cover" />
          </div>
          <div className="min-w-0 text-left">
            <p className="text-xl font-bold text-[#003566]">{member.name}</p>
            <p className="text-sm text-gray-600">{member.role}</p>
            {member.birthdayDate && (
              <p className="mt-1 text-sm font-medium text-orange-600">
                Birthday: {formatBirthday(member.birthdayDate)}
              </p>
            )}
            <p className="mt-1 text-sm text-[#003566]/75">
              Wishing you a bright day and an even brighter year ahead.
            </p>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

// A new, reusable card component to keep the code clean
const TeamMemberCard = ({ member, isStudent = false }) => (
  <motion.div variants={item} className="w-full max-w-sm">
    <Card className={`text-center shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full ${
      member.birthdayActive ? "ring-2 ring-orange-300 bg-gradient-to-b from-orange-50 to-white" : ""
    }`}>
      <CardContent className="p-6 flex flex-col items-center">
        {member.birthdayActive && (
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
            <span>🎉</span>
            Birthday Spotlight
            <span>✨</span>
          </div>
        )}
        <div className="relative h-44 w-44 rounded-full border-4 border-gray-100 overflow-hidden mb-4">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="176px"
            className="object-cover"
          />
        </div>
        <h4 className="font-semibold text-xl text-gray-800">{member.name}</h4>
        <p className="text-md text-gray-600">{member.role}</p>

        {/* Link to department page if it exists */}
        {member.departmentSlug && (
          <Link href={`/team/${member.departmentSlug}`} className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-2">
            View Department <ChevronRight className="w-4 h-4" />
          </Link>
        )}
        
        {/* Social Links for students */}
        {isStudent && (
          <div className="flex gap-4 mt-4">
            {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="w-6 h-6 text-gray-500 hover:text-[#0077b5]" /></a>}
            {member.instagram && <a href={member.instagram} target="_blank" rel="noopener noreferrer"><Instagram className="w-6 h-6 text-gray-500 hover:text-[#E1306C]" /></a>}
          </div>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

// The main component now receives teamData as a prop
export default function TeamSection({ teamData }) {
  const { faculty = [], students = [] } = teamData || {};
  const facultyCouncil = faculty.filter((member) => member?.isDepartmentHead);
  const studentCouncil = students.filter((member) => member?.isDepartmentHead);
  const birthdayCelebrants = [...faculty, ...students].filter((member) => member?.birthdayActive);

  return (
    <section className="py-16 px-4 md:px-10 bg-gray-50">
      {birthdayCelebrants.length > 0 && (
        <BirthdaySpotlight celebrants={birthdayCelebrants} />
      )}

      {/* Faculty Coordinators */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
      >
        <h2 className="text-center text-4xl font-bold mb-12 text-[#003566]">
          Faculty <span className="text-orange-600">Council</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-5xl mx-auto">
          {facultyCouncil.map((member) => (
            <TeamMemberCard key={member._id} member={member} />
          ))}
        </div>
      </motion.div>

      {/* Student Coordinators */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="mt-20"
      >
        <h2 className="text-center text-4xl font-bold mb-12 text-[#003566]">
          Student <span className="text-orange-600">Council</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {studentCouncil.map((member) => (
            <TeamMemberCard key={member._id} member={member} isStudent={true} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
