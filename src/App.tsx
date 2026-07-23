import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BrandStory from "./components/BrandStory";
import CoffeeCollection from "./components/CoffeeCollection";
import WhyChooseUs from "./components/WhyChooseUs";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Stats from "./components/Stats";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#120703] font-body text-white antialiased selection:bg-[#C49A6C] selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <BrandStory />
        <CoffeeCollection />
        <WhyChooseUs />
        <Experience />
        <Testimonials />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
