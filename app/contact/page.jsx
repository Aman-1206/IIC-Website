"use client";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";
import { useEffect, useState } from "react";

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
        setForm({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [submitted]);
  return (
    <section className="px-4 md:px-36 py-12 bg-white text-[#012356]">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Contact Us</h2>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          Reach out to the Institution’s Innovation Council for any queries,
          ideas, or collaboration opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Contact Info */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
            {/* Contact Info Box */}
            <div className="bg-[#d1edff] p-6 rounded-xl flex flex-col items-start justify-center space-y-4 w-full md:w-1/2">
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-700 w-5 h-5 mt-1" />
                <p className="text-black">
                  Shyam Lal College,
                  <br />
                  University of Delhi
                  <br />
                  Delhi, 110032
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-blue-700 w-5 h-5" />
                <p className="text-black">+91 8287666486</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-blue-700 w-5 h-5" />
                <p className="text-black">icouncil@shyamlal.du.ac.in</p>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4 pt-2">
                <a
                  href="https://www.linkedin.com/company/iicslc"
                  className="bg-black p-2 rounded-full hover:scale-110 transition"
                >
                  <Linkedin className="text-white w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/iic.slc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  className="bg-black p-2 rounded-full hover:scale-110 transition"
                >
                  <Instagram className="text-white w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-black p-2 rounded-full hover:scale-110 transition"
                >
                  <Youtube className="text-white w-5 h-5" />
                </a>
              </div>
            </div>

            {/* College Image */}
            <div className="w-full md:w-1/2">
              <img
                src="/assets/shyam_lal.webp" // replace with your actual path
                alt="Shyam Lal College"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
              />
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="rounded-xl overflow-hidden w-full h-64">
            <iframe
              title="Shyam Lal College"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.529832150369!2d77.27956477407722!3d28.673793382208306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfc80c7b24911%3A0xa0d3109e7de9ce89!2sShyam%20Lal%20College!5e0!3m2!1sen!2sin!4v1750745421794!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Right Section - Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow space-y-5"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder="Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Subject</option>
            <option value="collaboration">Collaboration</option>
            <option value="query">General Query</option>
            <option value="idea">Submit an Idea</option>
          </select>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Message"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
          <Button
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white w-full text-base"
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>

          {submitted && (
            <p className="text-green-600 text-sm text-center mt-2">
              Message sent successfully!
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
