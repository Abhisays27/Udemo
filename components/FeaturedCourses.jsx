"use client"
import styles from "@/styles/featuredCourses.module.css";
import { CoursesDetails } from "@/courseData";
import Card from "./Card";
import { useGlobalContext } from "@/utils/useContext";
import { useState } from 'react';

export default function FeaturedCourses() {
  const { userDetails } = useGlobalContext();
  const user = userDetails;

  // Separate free and premium courses
  const freeCourses = CoursesDetails.filter((course) => course.course_type === "Free");
  const premiumCourses = CoursesDetails.filter((course) => course.course_type === "Premium");

  // State to keep track of the selected category and text colors of buttons
  const [selectedCategory, setSelectedCategory] = useState('free');
  const [textColor, setTextColor] = useState('#FFD700');
  const [textColor1, setTextColor1] = useState('white');

  // Handle click on the button
  const handleClick = (category) => {
    setSelectedCategory(category);

    // Update the text colors of buttons based on the selected category
    if (category === 'free') {
      setTextColor('#FFD700');
      setTextColor1('white');
    } else if (category === 'premium') {
      setTextColor('white');
      setTextColor1('#FFD700');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__wrapper}>
        <h1 className="orange_gradient">Courses We Offer</h1>
        {/* Buttons for free and premium courses */}
        <div className={styles.buttons}>
          <button
            className={selectedCategory === 'free' ? styles.activeButton : ''}
            onClick={() => handleClick('free')} // Call the handleClick function with the category
            style={{ color: textColor }} // Set the text color dynamically
          >
            Free Courses
          </button>
          <button
            className={selectedCategory === 'premium' ? styles.activeButton : ''}
            onClick={() => handleClick('premium')} // Call the handleClick function with the category
            style={{ color: textColor1 }} // Set the text color dynamically
          >
            Premium Courses
          </button>
        </div>
        <div className={styles.courses}>
          {/* Display course cards based on the selected category */}
          {selectedCategory === 'free' ? (
            freeCourses.map((course) => (
              <Card
                key={course.id}
                name={course.course_name}
                desc={course.description}
                image={course.image_link}
                type={course.course_type}
                user={user}
              />
            ))
          ) : (
            premiumCourses.map((course) => (
              <Card
                key={course.id}
                name={course.course_name}
                desc={course.description}
                image={course.image_link}
                type={course.course_type}
                user={user}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
