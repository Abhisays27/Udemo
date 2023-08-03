"use client";
import Footer from "@/components/Footer";
import { CoursesDetails } from "@/courseData";
import styles from "@/styles/coursePage.module.css";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "@/utils/useContext";
import { useRouter } from "next/navigation";
import "@/styles/global.css";

export default function CoursePage() {
  const pathName = usePathname().split("/")[2];
  const { userDetails } = useGlobalContext();
  const router = useRouter();

  const selectedCourse = CoursesDetails.find(
    (course) =>
      course.course_name.toLowerCase().replace(/\s+/g, "-") === pathName
  );

  if (!selectedCourse) {
    return <p>Course not found.</p>;
  }

  if (selectedCourse.course_type === "Premium" && userDetails == null) {
    router.push("/courses");
    return;
  } else {
    return (
      <div>
        
        <div className={styles.container}>
        <div className="gradient"></div>
          <h1 className="orange_gradient">{selectedCourse.course_name}</h1>
          <div className={styles.courses}>
            {selectedCourse.video_links.map((videoLink, index) => {
              return (
                <div className={styles.card} key={index}>
                  <iframe
                    height={"240"}
                    src={videoLink}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              );
            })}
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
