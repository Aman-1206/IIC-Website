import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { EdgeStoreProvider } from '../lib/edgestore';
import { Toaster } from "@/components/ui/sonner";
import ChatBot from "@/components/ChatBot";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next"

const outfit = Outfit({ subsets: ["latin"] });


export const metadata = {
  title: "IIC | Shyam Lal College",
  description: "Explore innovation and entrepreneurship initiatives at IIC Shyam Lal College. Stay updated with events, workshops, and opportunities driving student innovation and startup culture."
,
  verification: {
    google: "hDyufdy53Hjc-Ykqt6YQVbSujn-Fdm0i89D3Q-tMAZo",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/favicon.ico" />
      <body className={`${outfit.className} bg-white text-slate-900 transition-colors duration-300 dark:bg-[#07111f] dark:text-slate-100`}>
        <Providers>
          <EdgeStoreProvider>
          <Navbar />
          {children}
          <ChatBot />
          <Toaster/>
          </EdgeStoreProvider>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
