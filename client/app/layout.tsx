import { ThemeProvider } from "./Components/common/ThemeProvider";
import { Navbar } from "./Components/Nav";
import SmoothScroll from "./Components/common/SmoothScroll";
import "./globals.css";
import Loader from "./Loader/Loader";
import CustomCursor from "./Components/cursor/CustomCursor";


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
          <CustomCursor/>
          <Loader/>
          <SmoothScroll />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

