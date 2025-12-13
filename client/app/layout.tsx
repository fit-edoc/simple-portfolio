import { ThemeProvider } from "./Components/common/ThemeProvider";
import { Navbar } from "./Components/Nav";
import SmoothScroll from "./Components/common/SmoothScroll";
import "./globals.css";


export const metadata = {
  title: "Himanshudocs",
  icons: {
    icon: "/favicon.jpg",          // default favicon
  
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body>
        <ThemeProvider>
          <SmoothScroll />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

