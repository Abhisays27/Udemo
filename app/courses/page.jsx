// Import dependencies
"use client";
import React from "react";
import Footer from "@/components/Footer";
import styles from "@/styles/featuredCourses.module.css";
import { CoursesDetails } from "@/courseData";
import Card from "@/components/Card";
import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";
import { useGlobalContext } from "@/utils/useContext";
import "@/styles/global.css";

export default function Courses() {
  const { userDetails, search } = useGlobalContext();
  let user = userDetails;

  // Filter the courses based on the search keyword
  const filteredCourses = CoursesDetails.filter((c) =>
    c.course_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Check if there are any filtered courses */}
        {filteredCourses.length > 0 ? (
          <>
            <h1 className="orange_gradient">Courses We Offer</h1>
            <div className={styles.courses}>
              {filteredCourses.map((course) => (
                <Card
                  key={course.id}
                  name={course.course_name}
                  desc={course.description}
                  image={course.image_link}
                  type={course.course_type}
                  user={user}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <h1 className="orange_gradient">OOPS! Courses Not Found</h1>
            {/* Additional elements or message for Courses Not Found */}
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
