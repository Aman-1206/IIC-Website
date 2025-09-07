"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
          <img 
            src="/assets/logo.png" 
            alt="IIC SLC Logo" 
            className="h-12 w-auto hover:scale-105 transition-transform duration-200"
          />
          <span className="font-bold text-xl text-[#003566]">IIC | SLC</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 font-medium">
          {[
            { path: "/", label: "Home" },
            { path: "/about", label: "About" },
            { path: "/events", label: "Events" },
            { path: "/webinar", label: "Webinars" },
            { path: "/gallery", label: "Gallery" },
            { path: "/team", label: "Team Council" },
          ].map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`relative text-lg py-2 px-1 text-gray-700 hover:text-orange-500 transition-colors duration-200 ${
                  pathname === item.path ? "text-orange-500" : ""
                }`}
                onClick={handleLinkClick}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${
                  pathname === item.path ? "w-full" : "w-0"
                }`}></span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Button onClick={() => router.push("/admin")} className="cursor-pointer text-lg sm:flex bg-orange-500 hover:bg-orange-700 text-white px-6 py-2 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md">
            Admin
          </Button>
          <button 
            className="md:hidden text-gray-700 focus:outline-none p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 z-40 bg-white mt-16 transition-all duration-300 ease-in-out ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex flex-col px-6 py-4 space-y-6">
          {[
            { path: "/", label: "Home" },
            { path: "/about", label: "About IIC" },
            { path: "/events", label: "Events & Workshops" },
            { path: "/webinar", label: "Webinars" },
            { path: "/gallery", label: "Gallery" },
            { path: "/team", label: "Team Council" },
          ].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-lg py-2 px-3 rounded-md transition-colors duration-200 ${
                pathname === item.path
                  ? "bg-orange-100 text-orange-500 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={handleLinkClick}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;