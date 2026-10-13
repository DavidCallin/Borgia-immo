import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Biens from "../../components/Biens";
import Galerie from "../../components/Galerie";
import Stats from "../../components/Stats";
import Services from "../../components/Services";
import Profiles from "../../components/Profiles";
import Avis from "../../components/Avis";
import FAQ from "../../components/FAQ";
import Localisation from "../../components/Localisation";
import CTA from "../../components/CTA";
import Footer from "../../components/Footer";
import { getProperties } from "@/lib/get-properties";

export default async function Home() {
  const items = await getProperties();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Biens items={items} />
        <Galerie items={items} />
        <Stats />
        <Services />
        <Profiles />
        <Avis />
        <FAQ />
        <Localisation />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
