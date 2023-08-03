import Image from "next/image";
import styles from "@/styles/hero.module.css";
import Link from "next/link";
import "@/styles/global.css";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className="gradient"></div>
      <div className={styles.hero__text}>
      <h1>
  <span class="green_gradient">Unlock Your Abilities</span> 🚀
</h1>

        <h2 >Discover Vast Knowledge on Our Video Course Platform!</h2>
        <p>
          "Set Sail on a Lifelong Learning Adventure! Uncover a Vast Array of
          Premium and Free Courses, and Unleash Your Innate Potential with
          Expert-Led Instruction and Interactive Coursework"
        </p>
        <Link href="/courses">
          <button className="button-29"  role="button">Explore Course&apos;s </button>
        </Link>
      </div>
      <div className={styles.hero__image}>
        <Image src="/about.png" alt="svg image" width={300} height={320} />
      </div>
    </div>
  );
}
