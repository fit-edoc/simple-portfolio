import Hero from "./Components/hero/Hero";
import ShippedProducts from "./Components/products/ShippedProducts";
import TechStack from "./Components/stack/TechStack";
import Footer from "./Components/footer/Footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ShippedProducts />
      <TechStack />
      <Footer />
    </div>
  );
}
