"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useGlobalContext } from "@/utils/useContext";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import styles from "@/styles/navbar.module.css";
import "@/styles/global.css";

const Navbar = ({ user }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { userDetails, login, search, setSearch } = useGlobalContext();

  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavToggle = () => {
    setIsNavOpen((prevState) => !prevState);
  };

  const creatingAvatar = (email) => {
    if (!email) return;
    return email[0].toUpperCase();
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  useEffect(() => {
    login(user);
  }, [user]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <Link href={"/"}>
          <h2 className="orange_gradient">Udemo</h2>
        </Link>
      </div>

      {/* Hamburger Icon */}
      <div className={styles.navbar__hamburger} onClick={handleNavToggle}>
        <div className={`${styles.hamburgerBar} ${isNavOpen ? styles.open : ""}`}></div>
        <div className={`${styles.hamburgerBar} ${isNavOpen ? styles.open : ""}`}></div>
        <div className={`${styles.hamburgerBar} ${isNavOpen ? styles.open : ""}`}></div>
      </div>

      {/* Navigation Links */}
      <ul className={`${styles.navitems} ${isNavOpen ? styles.open : ""}`}>
        <li><a href="/courses">Courses</a></li>
        <li><a href="#">Solutions</a></li>
        <li><a href="#">Pricing</a></li>
        <li><a href="#">360° Support</a></li>
      </ul>

      {/* Avatar and Dropdown */}
      <div className={styles.navbar__links}>
        <ul>
          <li>
            <Link href="/courses">
              <input
                className="search_input"
                type="text"
                placeholder="Search Courses.."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Link>
          </li>

          {!userDetails ? (
            <li>
              <Link href={"/auth"} className=" outline_btn">Go Premium</Link>
            </li>
          ) : (
            <div className={styles.avatar__dropdown}>
              <div className={styles.avatar}>
                {/* Show the user's avatar if available */}
                {userDetails.avatar_url ? (
                  <img src={userDetails.avatar_url} alt="Profile Avatar" />
                ) : (
                  creatingAvatar(userDetails?.email)
                )}
              </div>
              <div className={styles.dropdown}>
                <li>{userDetails?.email}</li>
                <li onClick={signOut}>Logout</li>
              </div>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
