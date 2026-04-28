import { ThemeProvider } from "./Components/common/ThemeProvider";
import { Navbar } from "./Components/Nav";
import SmoothScroll from "./Components/common/SmoothScroll";
import "./globals.css";
import Loader from "./Loader/Loader";



import type { Metadata } from 'next';

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
      <body>
        <ThemeProvider>
        
          <Loader />
          <SmoothScroll/>

            <Navbar/>
          {children}

        </ThemeProvider>
      </body>
    </html>
  );
}

