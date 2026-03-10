"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { startupPolicy } from "@/lib/startupPolicy";


const StartupPolicy = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white dark:from-[#07111f] dark:to-[#0b1220]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-[#003566] dark:text-slate-100 sm:text-4xl">
            Startup & <span className="text-orange-600">Innovation Policy</span>
          </h1>
          <p className="text-xl text-blue-600 dark:text-blue-300 font-medium mt-2">
            {startupPolicy.subtitle}
          </p>
          <p className="text-lg text-gray-600 dark:text-slate-400 mt-1">
            {startupPolicy.institution}
          </p>
          <div className="mt-6 p-4 bg-blue-100 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 rounded-lg max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">Vision</h3>
            <p className="text-gray-700 dark:text-slate-300">{startupPolicy.vision}</p>
          </div>
        </div>

        {/* Policy Accordion */}
        <div className="bg-white dark:bg-[#0f172a] shadow-xl rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
          <Accordion type="multiple" className="w-full divide-y divide-gray-200 dark:divide-slate-800">
            {startupPolicy.sections.map((section, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="px-6 py-4">
                <AccordionTrigger className="text-xl font-semibold text-blue-600 dark:text-blue-300 hover:text-orange-600 dark:hover:text-orange-400">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="mt-4 text-gray-700 dark:text-slate-300">
                  {section.content ? (
                    <ul className="space-y-2 pl-5  text-[16px]">
                      {section.content.map((point, i) => (
                        point.startsWith("-") ? (
                          <li key={i} className="list-disc">{point.substring(1)}</li>
                        ) : point ? (
                          <li key={i}>{point}</li>
                        ) : <br key={i} />
                      ))}
                    </ul>
                  ) : null}

                  {section.subsections && (
                    <div className="space-y-6 mt-4">
                      {section.subsections.map((subsection, subIndex) => (
                        <div key={subIndex} className="pl-4 border-l-2 border-blue-200 dark:border-slate-700">
                          <h4 className="text-lg font-medium text-orange-600 dark:text-orange-400 mb-2">
                            {subsection.title}
                          </h4>
                          <ul className="space-y-2 pl-5 text-[16px]">
                            {subsection.points.map((point, i) => (
                              <li key={i} className="list-disc ">{point}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <Link href="/assets/startup.pdf" target="_blank">
            <button className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105 transform">
              Download Full Policy PDF
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </Link>
          
          <Link href="/register-startup">
            <button className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 hover:scale-105 transform">
              Register Your Startup
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StartupPolicy;
