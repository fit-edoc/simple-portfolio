import { ThemeProvider } from "./Components/common/ThemeProvider";
import { Navbar } from "./Components/Nav";
import SmoothScroll from "./Components/common/SmoothScroll";
import "./globals.css";

import localFont from "next/font/local";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { Metadata } from 'next';

const youngSerif = localFont({
  src: '../public/ok.ttf',
  variable: '--font-heading',
  weight: '400',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Himanshu Docs | Full Stack & ReactJS Developer in Delhi",
  description: "Portfolio of Himanshu. I am a Full Stack Developer and ReactJS Developer based in Delhi, specializing in creating modern web applications.",
  keywords: [
    "himanshu docs",
    "himanshudocs",
    "full stack developer in delhi",
    "reactjs developer in delhi",
    "web developer in delhi",
    "MERN stack developer delhi",
    "software engineer delhi",
    "himanshudocs.online"
  ],
  authors: [{ name: "Himanshu" }],
  creator: "Himanshu",
  metadataBase: new URL("https://himanshudocs.online"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Himanshu Docs | Full Stack Developer in Delhi",
    description: "Portfolio of Himanshu. I am a Full Stack Developer and ReactJS Developer based in Delhi, specializing in creating modern web applications.",
    url: "https://himanshudocs.online",
    siteName: "Himanshu Docs",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Himanshu Docs | Full Stack & ReactJS Developer in Delhi",
    description: "Portfolio of Himanshu. I am a Full Stack Developer and ReactJS Developer based in Delhi.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "./dp.jpg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Himanshu",
              url: "https://himanshudocs.online",
              jobTitle: "Full Stack Developer & ReactJS Developer",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Delhi",
                addressCountry: "IN"
              },
              description: "I am a Full Stack Developer and ReactJS Developer based in Delhi."
            })
          }}
        />
      </head>
      <body className={`${youngSerif.variable} ${plusJakartaSans.variable} font-sans antialiased min-h-screen bg-background text-foreground transition-colors duration-300 relative`}>
        {/* Grain overlay */}
        {/* <div className="grain-overlay pointer-events-none" /> */}
        
        {/* Ambient Gradient Background
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-pink-500/5 blur-[120px] dark:from-indigo-600/10 dark:via-purple-600/5 dark:to-transparent" />
          <div className="absolute bottom-[-10%] right-[-15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-blue-500/15 via-purple-500/10 to-indigo-500/5 blur-[120px] dark:from-blue-600/10 dark:via-purple-600/5 dark:to-transparent" />
        </div> */}

        <ThemeProvider>
         
          <SmoothScroll/>
          <Navbar/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

