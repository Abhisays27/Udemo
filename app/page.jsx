import Hero from "@/components/Hero";
import styles from "@/styles/home.module.css";
import FeaturedCourses from "@/components/FeaturedCourses";
import Footer from "@/components/Footer";
import Link from "next/link";
import "@/styles/global.css";

export default async function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <FeaturedCourses />
     

      <Footer />
    </main>
  );
}
