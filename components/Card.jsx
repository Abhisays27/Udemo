"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/card.module.css";

const Card = ({ name, desc, image, type, user }) => {
  const router = useRouter();

  const handleOnClick = () => {
    if (!user?.email && type === "Premium") {
      router.push("/auth");
      return;
    }
    router.push("/courses/" + name.toLowerCase().replace(/\s+/g, "-"));
  };

  return (
    <div className={styles.card} onClick={handleOnClick}>
      <Image
        src={image}
        alt={name}
        width={400}
        height={300}
        className={styles.card__image}
      />
      <div className={styles.card__content}>
        <div className="">
          <div className={styles.title__tag}>
            <h3>{name}</h3>
            <span>{type}</span>
          </div>
          <p>{desc}</p>
        </div>
        <button>Start Exploring</button>
      </div>
    </div>
  );
};

export default Card;
